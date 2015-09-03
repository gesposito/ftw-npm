var config = require('../config/twitter.json');
var markerFile = '../config/marker.json';
var marker = require(markerFile);

var Twit = require('twit');
var jsonfile = require('jsonfile');
var compose = require('../lib/compose.js');

var base = require('../config/base.json');
if (base.db) {
  var Firebase = require("firebase");
  var ref = new Firebase(base.db);
  var docsRef = ref.child("docs");
  var markerRef = ref.child("marker");
  var _ = require('lodash');
}

var T = new Twit(config);

exports.post = function(change) {
  T.post('statuses/update', {
    status: compose.twit(change)
  }, function(err, data, response) {
    onStatusUpdate(err, data, response, change)

  });

  if (base.db) {
    var baseChange = _.clone(change, true);
    // Can't use . in keys
    baseChange.doc.versions = replaceKeys(baseChange.doc.versions);
    baseChange.doc.time = replaceKeys(baseChange.doc.time);

    docsRef.push().set(baseChange);
  }

}

function onStatusUpdate(err, data, response, change) {
  if (err) {
    console.error(change.id, ' error:', err);
  } else {
    onStatusUpdateSuccess(change);
  }

}

function onStatusUpdateSuccess(change) {
  if (base.db) {
    markerRef.set({
      'since': change.seq
    });
  } else {
    jsonfile.writeFile(markerFile, {
      "seq": change.seq
    }, function(err) {
      if (err) {
        console.error(change.id, ' error:', err);
      } else {
        console.log(change.id, ' ', change.seq);
      }

    });
  }

}

function replaceKeys(object) {
  var re = /\./g;
  return object = _.mapKeys(object, function(value, key) {
    return key.replace(re, '_');
  });

}
