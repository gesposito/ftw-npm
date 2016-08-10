var marker = require('./marker.json');

module.exports = {
  // Fully-qualified URL of a couch database. (Basic auth URLs are ok.)
  'db'            : 'https://replicate.npmjs.com',
  // You can use a seq number as '112532', '103045' or you can use 'now'
  // Marker is going to hold last value even through restarts
  // The sequence number to start from. Use "now" to start from the latest change in the DB.
  'since'         : marker.since || 'now',
  // Milliseconds within which CouchDB must respond (default: 30000 or 30 seconds)
  'heartbeat'     : 30 * 1000,
  // https://github.com/iriscouch/follow#simple-api-followoptions-callback
  'inactivity_ms' : 24 * 60 * 60 * 1000
};
