'use strict';

let Angular = require('angular');

let ngModule = Angular.module('signApp.home', []);

require('./controllers/home').default(ngModule, Angular);
require('./controllers/defaultxx').default(ngModule, Angular);
require('./controllers/addressPerson').default(ngModule, Angular);

require('../css/app.css');

require('../css/switchcss.css');

// require('../../sass/app.scss');

ngModule.config(function ($stateProvider) {

    $stateProvider
    .state('signApp.home', {
        url: '/home',
        views: {
            '@': {
                controller: 'HomeController as vm',
                template: require('./templates/home.html')
            }
        },
        resolve: {
            $title: function() {
                return "首页";
            }
        }
    })
    .state('signApp.dafaultxx', {
        url: '/dafaultxx',
        views: {
            '@': {
                controller: 'DefaultxxController as vm',
                template: require('./templates/defaultxx.html')
            }
        },
        resolve: {
            $title: function() {
                return "基本信息";
            }
        }
    })
    .state('signApp.AddressPerson', {
        url: '/AddressPerson',
        views: {
            '@': {
                controller: 'AddressPersonController as vm',
                template: require('./templates/addressPerson.html')
            }
        },
        resolve: {
            $title: function() {
                return "地址和联系人信息";
            }
        }
    });
});