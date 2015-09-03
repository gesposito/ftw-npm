var follow = require('follow');
var moment = require('moment');

var filters = require('./lib/filters.js');
var tweet = require('./lib/tweet.js');

var options = require('./config/options.js');

var feed = new follow.Feed(options);
var catchup = null;

feed.filter = function(doc, req) {
  // req.query is the parameters from the _changes request and also feed.query_params.
  catchup = null;

  if (filters.all(doc)) {
    return true;
  }

  //console.info("Discarded: ", doc.name);
  return false;
};


feed.on('change', function(change) {

  tweet.post(change);

});

feed.on('timeout', function(info) {
  // Follow did not receive a heartbeat from couch in time. The passed object has .elapsed_ms set to the elapsed time
  console.warn('timeout: ', info);

  // Going to skip the current seq (malformed?) if it isn't catchup
  if (!catchup) {
    feed.pause();
    feed.since = parseInt(feed.since) + 1;
    feed.resume();
  }

});

feed.on('catchup', function(seq_id) {
  //The feed has caught up to the update_seq from the confirm step. Assuming no subsequent changes, you have seen all the data.
  catchup = seq_id;

  console.info('catchup: ', seq_id);

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
