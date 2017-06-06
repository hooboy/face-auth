'use strict';

let Angular = require('angular');

let ngModule = Angular.module('signApp.verify', []);

require('./controllers/basic').default(ngModule, Angular);
require('./controllers/person').default(ngModule, Angular);

require('../css/app.css');

// require('../../sass/app.scss');

ngModule.config(function ($stateProvider) {

    // let users = sessionStorage.getItem('Visa.users');

    $stateProvider
    .state('signApp.verify', {
        url: '/verify/basic/:id',
        cache: false,
        views: {
            '@': {
                controller: 'VerifyBasicController as vm',
                template: require('./templates/basic.html')
            }
        },
        resolve: {
            $title: function() {
                return "基本信息";
            },
            basic: function(Restangular, localStorageService, $stateParams) {
                let users = JSON.parse( localStorageService.get('users') ) || {};

                return Restangular.all('wallet/faceVisa/querysales').post({'id': $stateParams.id,'openId':users.openid,'token':users.token});
            }
        }
    })
    .state('signApp.verifyPerson', {
        url: '/verify/person',
        cache: false,
        views: {
            '@': {
                controller: 'VerifyPersonController as vm',
                template: require('./templates/person.html')
            }
        },
        resolve: {
            $title: function() {
                return "地址和联系人信息";
            }
        }
    });
});