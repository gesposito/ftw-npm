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
  baseChange.doc["dist-tags"] = replaceKeys(baseChange.doc["dist-tags"]);

  _.forEach(baseChange.doc.versions, function(object, key) {
    var deps = baseChange.doc.versions[key].dependencies;
    if (deps) {
      baseChange.doc.versions[key].dependencies = replaceKeys(deps);
    }
    var devdeps = baseChange.doc.versions[key].devDependencies;
    if (devdeps) {
      baseChange.doc.versions[key].devDependencies = replaceKeys(devdeps);
    }
    var peerdeps = baseChange.doc.versions[key].peerDependencies;
    if (peerdeps) {
      baseChange.doc.versions[key].peerDependencies = replaceKeys(peerdeps);
    }

    var bin = baseChange.doc.versions[key].bin;
    if (bin) {
      baseChange.doc.versions[key].bin = replaceKeys(bin);
    }
    var browser = baseChange.doc.versions[key].browser;
    if (browser) {
      baseChange.doc.versions[key].browser = replaceKeys(browser);
    }
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
