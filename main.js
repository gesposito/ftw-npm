var feed        = require('./lib/feed.js');
var persistence = require('./lib/persistence.js');

var options     = require('./config/options.js');

// Either retrieve marker from persistence or filesystem
if (persistence.hasDB()) {
  persistence.getMarker().once('value', function(snapshot) {
    var marker = snapshot.val();
    options.since = marker ? marker.since : 'now';

    feed.init(options);
  });

} else {
  feed.init(options);

}
