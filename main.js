var feed = require('./lib/feed.js');
var options = require('./config/options.js');

// Either retrieve marker from persistence or filesystem
var base = require('./config/base.json');
if (base.db) {
  var Firebase = require("firebase");
  var ref = new Firebase(base.db);
  var markerRef = ref.child("marker");
  
  markerRef.once("value", function(snapshot) {
    var marker = snapshot.val();
    options.since = marker ? marker.since : 'now';
    feed.init(options);
  });

} else {
  feed.init(options);

}
