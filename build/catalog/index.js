#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var _ = require('lodash');

var packages = require('./packages');
var elements = require('./elements');
var tags = require('./tags');
var guides = require('./guides');
var objectFromStreams = require('./utils/object-from-streams');

var exports = module.exports = function (srcFilepath) {
  
  var srcCatalog = fs.createReadStream(srcFilepath);
  var guideFilepaths = [
    path.resolve(process.cwd(), 'guides', '**.md'),
    path.resolve(process.cwd(), 'bower_components', '**', 'guides', '**.md')
  ];
  
  return objectFromStreams({
    packages: srcCatalog.pipe(packages()),
    elements: srcCatalog.pipe(elements()),
    tags: {
      data: srcCatalog.pipe(tags()),
      onArray: _.first
    },
    guides: guides(guideFilepaths)
  });
};