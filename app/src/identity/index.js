'use strict';

let Angular = require('angular');

let ngModule = Angular.module('signApp.identity', []);

require('./controllers/identity').default(ngModule, Angular);

ngModule.config(function ($stateProvider) {

    $stateProvider
    .state('signApp.identity', {
        url: '/identity',
        cache: false,
        views: {
            '@': {
                controller: 'IdentityController as vm',
                template: require('./templates/identity.html')
            }
        },
        resolve: {
            $title: function() {
                return "身份认证";
            }
        }
    });
});