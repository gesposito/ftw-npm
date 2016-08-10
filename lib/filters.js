var _       = require('lodash');
var filter  = require('../config/filter.json');

exports.name = function(doc, name) {
  // doc.name
  if (_.includes(doc.name, name)) {
    return true;
  }
};

exports.keyword = function(doc, keyword) {
  // doc.keywords
  var keywords = doc.keywords;
  if (keywords && _.includes(keywords, keyword)) {
    return true;
  }
};

exports.dep = function(doc, dep) {
  var deps = doc.dependencies;
  if (deps && _.has(deps, dep)) {
    // doc.dependencies['key']
    return true;
  }

  var devdeps = doc.devDependencies;
  if (devdeps && _.has(devdeps, dep)) {
    // doc.devDependencies['key']
    return true;
  }

  var peerdeps = doc.peerDependencies;
  if (peerdeps && _.has(peerdeps, dep)) {
      // doc.peerDependencies['key']
    return true;
  }
};

exports.module = function(doc, module) {
  if (_.has(doc, module)) {
      // doc['key']
    return true;
  }
};

exports.all = function(doc) {
  var dists = doc['dist-tags'];
  var latest = dists ? dists.latest : null;

  var latestDoc = null;
  if (latest) {
    latestDoc = doc.versions[latest];
  }

  // Starts filtering from config/filter.json
  var name = filter.name;
  if (name && this.name(doc, name)) {
    // doc.name
    return true;
  }

  var keywords = filter.keywords;
  if (keywords && this.keyword(latestDoc, keywords)) {
    // doc.keywords
    return true;
  }

  var dep = filter.dep;
  if (dep && this.dep(latestDoc, dep)) {
    // doc.dependencies['key']
    // doc.devDependencies['key']
    // doc.peerDependencies['key']
    return true;
  }

  var module = filter.module;
  if (module && this.module(latestDoc, module)) {
    // doc['key']
    return true;
  }

};
