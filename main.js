var follow = require('follow');
var Twit = require('twit');
var jsonfile = require('jsonfile');
var moment = require('moment');

var filters = require('./lib/filters.js');
var compose = require('./lib/compose.js');

var config = require('./config/twitter.json');
var filter = require('./config/filter.json');
var options = require('./config/options.js');
var markerFile = './config/marker.json';
var marker = require(markerFile);

var feed = new follow.Feed(options);
var last = null;

feed.filter = function(doc, req) {
  // req.query is the parameters from the _changes request and also feed.query_params.

  // Filtering from config/filter.json
  var name = filter.name;
  if (name && filters.name(doc, name)) {
    // doc.name
    return true;
  }

  var keyword = filter.keyword;
  if (keyword && filters.keyword(doc, keyword)) {
    // doc.keywords
    return true;
  }

  var dep = filter.dep;
  if (dep && filters.dep(doc, dep)) {
    // doc.dependencies['key']
    // doc.devDependencies['key']
    // doc.peerDependencies['key']
    return true;
  }

  var module = filter.module;
  if (module && filters.module(doc, module)) {
    // doc['key']
    return true;
  }

  return false;
};

var T = new Twit(config);

feed.on('change', function(change) {
  last = change;

  T.post('statuses/update', {
    status: compose.twit(change)
  }, function(err, data, response) {
    onStatusUpdate(err, data, response, change)

  });

});

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

feed.on('timeout', function(info) {
  // Follow did not receive a heartbeat from couch in time. The passed object has .elapsed_ms set to the elapsed time
  console.warn('timeout: ', info);

  // Going to skip the current seq (malformed?) if it is in the past (yesterday)
  if (last && moment(last.doc.time.modified).add(24, 'h').isBefore()) {
    feed.pause();
    feed.since = parseInt(feed.since) + 1;
    feed.resume();
  }

});

feed.on('retry', function(info) {
  console.warn('retry: ', info);
});

feed.on('error', function(er) {
  console.error('Since Follow always retries on errors, this must be serious');
  throw er;
});

feed.on('stop', function() {
  console.error('The feed is stopping, because of an error, or because you called feed.stop()');
});

feed.follow();
