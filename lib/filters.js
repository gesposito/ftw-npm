var _ = require('lodash');

exports.name = function(doc, name) {
  // doc.name
  if (_.includes(doc.name, name)) {
    return true;
  }
};

exports.keyword = function(doc, keyword) {
  // doc.keywords
  var keywords = doc.keywords;
  if (keywords && _.intersection(keywords, keyword).length) {
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
