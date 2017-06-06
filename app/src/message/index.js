'use strict';

let Angular = require('angular');

let ngModule = Angular.module('signApp.message', []);

require('./controllers/message').default(ngModule, Angular);
require('./controllers/custom').default(ngModule, Angular);

require('../css/app.css');

require('../css/switchcss.css');

// require('../../sass/app.scss');

ngModule.config(function ($stateProvider) {

    $stateProvider
    .state('signApp.message', {
        url: '/message/status/:id',
        views: {
            '@': {
                controller: 'MessagesController as vm',
                template: require('./templates/message.html')
            }
        },
        resolve: {
            $title: function($stateParams) {
                return "首页";
            }
        }
    })
    .state('signApp.message_custom', {
        url: '/message/custom/:messsage',
        views: {
            '@': {
                controller: 'MessageCustomController as vm',
                template: require('./templates/custom.html')
            }
        },
        resolve: {
            $title: function($stateParams) {
                return "基本信息";
            }
        }
    });
});