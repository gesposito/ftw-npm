var twitter = require('twitter-text');
var moment = require('moment');
var summarize = require('summarize-markdown');

exports.twit = function(change) {
  var name = change.id;
  var doc = change.doc;

  var dist = doc['dist-tags'];
  var versions = Object.keys(doc.versions).length;
  var latest = '';
  if (dist && (versions === 1)) {
    // First version
    latest = '(' + dist.latest + ')';
  } else if (dist && moment(doc.time.modified).isSame(moment(), 'day')) {
    // Updated today
    latest = '(' + dist.latest + ')';
  }

  var description = doc.description || '';

  var repository = doc.repository ? doc.repository.url || '' : '';
  var url = doc.homepage || '';

  var author = doc.author || '';
  //var react = '⚛';

  var tweet = name + (latest ? ' ' + latest : '') + ': ';
  if (description) {
    description = summarize(description);
    tweet = tweet + (description).trim() + ' ';
  }
  if (url || repository) {
    tweet = tweet + (url || repository) + ' ';
  } else {
    tweet = tweet + 'https://www.npmjs.com/package/' + name + ' ';
  }

  var remaining = 140 - twitter.getTweetLength(tweet);
  if (remaining < 0 && description) {
    var shortDescription = (description).slice(0, remaining - 2).trim() + '… ';
    tweet = tweet.replace(description, shortDescription);
  }

  return tweet;
};
