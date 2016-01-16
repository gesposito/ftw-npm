var _ = require('lodash');

var base = require('../config/base.json');

if (base.db) {
  var Firebase = require("firebase");
  var ref = new Firebase(base.db);
  var docsRef = ref.child("docs");
  var markerRef = ref.child("marker");
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
  var baseChange = _.clone(change, true);

  baseChange.doc.versions = replaceKeys(baseChange.doc.versions);
  baseChange.doc.time = replaceKeys(baseChange.doc.time);
  baseChange.doc.users = replaceKeys(baseChange.doc.users);
  baseChange.doc["dist-tags"] = replaceKeys(baseChange.doc["dist-tags"]);

  _.forEach(baseChange.doc.versions, function(object, key) {
    baseChange.doc.versions[key] = JSON.stringify(object);
  });

  docsRef.push().set(baseChange, function(error) {
    if (error) {
      console.error("Persistence error: " + error);
    }
  });

  markerRef.set({
    'since': change.seq
  });
}

function replaceKeys(object) {
  // Can't contain ".", "#", "$", "/", "[", or "]"
  var dots = /\./g;
  var slashes = /\//g;

  return object = _.mapKeys(object, function(value, key) {
    key = key.replace(dots, '_');
    key = key.replace(slashes, '|');
    return key;
  });

}

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
