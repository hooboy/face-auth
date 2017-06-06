'use strict';

var config = require('./config.json');

module.exports = function (ngModule) {
    ngModule.constant('APP_CONFIG', config);
};