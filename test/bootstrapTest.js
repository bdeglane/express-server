'use strict';

import 'babel-polyfill';

var path = require('path');
var fs = require('fs');

var testFolder = path.join(__dirname);

// recursive walker
var walkSync = function (dir, filelist) {
    var files = fs.readdirSync(dir);
    files.forEach(function (file) {
        if (file != 'bootstrapTest.js') {
            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                filelist = walkSync(path.join(dir, file), filelist);
            }
            else {
                // filelist.push('.' + path.sep + path.relative(testFolder, dir) + path.sep + file);
                filelist.push('.' + '/' + path.relative(testFolder, dir) + '/' + file);
            }
        }
    });
    return filelist;
};

// get file and execute
var getFile = function (path) {
    require(path).default();
};

var executeTest = function (files) {
    for (var ii = 0; ii < files.length; ii++) {
        getFile(files[ii]);
    }
};

/**
 * execute test recursively
 */
executeTest(walkSync(testFolder, []));
