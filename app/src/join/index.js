'use strict';

let Angular = require('angular');

let ngModule = Angular.module('signApp.join', []);

require('./controllers/join').default(ngModule, Angular);

require('../css/app.css');

require('../css/switchcss.css');

// require('../../sass/app.scss');

ngModule.config(function ($stateProvider) {

    $stateProvider
    .state('signApp.join', {
        url: '/join/:id',
        views: {
            '@': {
                controller: 'JoinController as vm',
                template: require('./templates/join.html')
            }
        },
        resolve: {
            $title: function() {
                return "我要提现";
            }
        }
    });
});