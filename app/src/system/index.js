'use strict';

let Angular = require('angular');

let ngModule = Angular.module('signApp.system', []);

// require('./constant/config')(ngModule);

require('./modules/title')(ngModule, Angular);

require('./service/wechat').default(ngModule, Angular);



require('./directives/uploader').default(ngModule, Angular);