"use strict";

const Angular = require('angular');

require('angular-ui-router');

require('angular-local-storage');

require('oclazyload');

global._ = require('lodash');

require('restangular');

require('ngstorage');

require('./src/system');

require('./src/status');

require('./src/message');

require('./src/join');

require('./src/home');

require('./src/verify');

require('./src/identity');

const ngModule = Angular.module('signApp', [
    'ui.router',
    'LocalStorageModule',
    'oc.lazyLoad',
    'ngStorage',
    'restangular',
    'signApp.title',
    'signApp.system',
    'signApp.wechatjs',
    'signApp.status',
    'signApp.message',
    'signApp.join',
    'signApp.verify',
    'signApp.home',
    'signApp.identity'
]);

require('./app').default(ngModule, Angular);

document.addEventListener("DOMContentLoaded", function(event) {
    Angular.bootstrap(document, ['signApp']);
}, false);