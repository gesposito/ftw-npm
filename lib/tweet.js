var config      = require('../config/twitter.json');
var markerFile  = './config/marker.json';

var Twit        = require('twit');
var jsonfile    = require('jsonfile');
var compose     = require('./compose.js');

if (config.consumer_key) {
  var T           = new Twit(config);
}

exports.post = function(change) {
  if (!config.consumer_key) {
    console.info('Twitter config has no keys | debug `post`: ', change.seq, change.id, change.doc['dist-tags'] && change.doc['dist-tags'].latest);
    return;
  }

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
    'seq': change.seq
  }, function(err) {
    if (err) {
      console.error(change.id, ' error:', err);
    } else {
      console.log(change.id, ' ', change.seq);
    }

  });

}
