var config = require('../config/twitter.json');
var markerFile = './config/marker.json';

var Twit = require('twit');
var jsonfile = require('jsonfile');
var compose = require('../lib/compose.js');

var T = new Twit(config);

exports.post = function(change) {
  T.post('statuses/update', {
    status: compose.twit(change)
  }, function(err, data, response) {
    onStatusUpdate(err, data, response, change)

  });

}

function onStatusUpdate(err, data, response, change) {
  if (err) {
    console.error(change.id, ' error:', err);
  } else {
    onStatusUpdateSuccess(change);
  }

}

function onStatusUpdateSuccess(change) {
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
