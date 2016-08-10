var _           = require('lodash');

var base        = require('../config/base.json');

if (base.db) {
  var Firebase  = require('firebase');
  var ref       = new Firebase(base.db);
  var docsRef   = ref.child('docs');
  var markerRef = ref.child('marker');
}

exports.hasDB = function() {
  return base.db;
}

exports.getDocs = function() {
  return docsRef;
}

exports.getMarker = function() {
  return markerRef;
}

exports.pushDoc = function(change) {
  if (!base.db) {
      console.info('Firebase config has no db set | debug `pushDoc`: ', change.seq, change.id, change.doc['dist-tags'] && change.doc['dist-tags'].latest);
      return;
  }

  var baseChange = _.clone(change, true);

  baseChange.doc.versions     = replaceKeys(baseChange.doc.versions);
  baseChange.doc.time         = replaceKeys(baseChange.doc.time);
  baseChange.doc.users        = replaceKeys(baseChange.doc.users);
  baseChange.doc["dist-tags"] = replaceKeys(baseChange.doc["dist-tags"]);

  _.forEach(baseChange.doc.versions, function(object, key) {
    baseChange.doc.versions[key] = JSON.stringify(object);
  });

  console.log(change.seq);
  docsRef.push().set(baseChange, function(error) {
    if (error) {
      console.error('Persistence error: ' + error);
    }
  });

  markerRef.set({
    'since': change.seq
  });
}

// TODO Check https://github.com/npm/normalize-registry-metadata
function replaceKeys(object) {
  // Can't contain ".", "#", "$", "/", "[", or "]"
  var dots    = /\./g;
  var slashes = /\//g;

  return object = _.mapKeys(object, function(value, key) {
    key = key.replace(dots, '_');
    key = key.replace(slashes, '|');
    return key;
  });

}

// TODO Check https://github.com/npm/normalize-registry-metadata
function ignoreKeys(object) {
  // Can't contain ".", "#", "$", "/", "[", or "]"
  var ignoredKeys = ['jest'];
  _.forEach(ignoredKeys, function(key) {
    if (object[key]) {
      object[key] = {};
    }
  });

  return object;
}
