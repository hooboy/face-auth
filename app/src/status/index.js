'use strict';

let Angular = require('angular');

let ngModule = Angular.module('signApp.status', []);

require('./controllers/status').default(ngModule, Angular);

ngModule.config(function ($stateProvider) {

    $stateProvider
    .state('signApp.status', {
        url: '/status',
        views: {
            '@': {
                controller: 'StatusController as vm',
                // template: require('./templates/status.html')
            }
        },
        resolve: {
            $title: function() {
                return "身份认证";
            }
        }
    })
    .state('signApp.statusCode', {
        url: '/status/:id',
        views: {
            '@': {
                controller: 'StatusController as vm',
                // template: require('./templates/status.html')
            }
        },
        resolve: {
            $title: function() {
                return "身份认证";
            }
        }
    });
});