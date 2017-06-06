"use strict";

global.$ = require('jquery');

export default (ngModule, Angular) => {
    ngModule.constant('APP_CONFIG', {
        URL: process.env.APP_URL,
        API: process.env.API_URL,
        APP_ID: process.env.WXAPP_ID
    });

    ngModule.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });

        $urlRouterProvider.otherwise('/status');
    });

    // ngModule.config(function ($urlRouterProvider) {
    //     var universalResolves = {
    //         "spells": function() {
    //             return [
    //                 { word: "xyzzy", response: "Nothing happens." },
    //                 { word: "open sesame", response: "The door opens!" }
    //             ];
    //         }
    //     };

    //     var customRouteProvider = Angular.extend({}, $urlRouterProvider, {
    //         when: function(path, route) {
    //             route.resolve = (route.resolve) ? route.resolve : {};

    //             Angular.extend(route.resolve, universalResolves);

    //             $routeProvider.when(path, route);

    //             return this;
    //         }
    //     });
    // });

    ngModule.config(function ($httpProvider, $compileProvider) {
        $httpProvider.interceptors.push(function($q) {
            return {
                'request': function(config) {
                    return $q.when(config);
                },
                'response': function(response) {
                    return $q.when(response);
                },
                'responseError': function(rejection) {
                    return $q.reject(rejection);
                }
            };
        });
    });

    ngModule.config(function(RestangularProvider, $locationProvider, $stateProvider, APP_CONFIG) {
        RestangularProvider.setBaseUrl(APP_CONFIG.API);
    });

    ngModule.run(function(Restangular, $rootScope, $stateParams, $location) {
        // console.info( $location.search()['id'] );
        // console.info( $location.port() );
        // console.info( $location.absUrl() );

        // Restangular.setDefaultRequestParams('post', {url: encodeURIComponent($location.absUrl())});
    });

    ngModule.run(function($rootScope, $urlRouter, $timeout, $q, Restangular, $location, $stateParams, $sessionStorage, localStorageService, APP_CONFIG) {
        let deregisterFunction = $rootScope.$on('$stateChangeStart', function(event){
            event.preventDefault();
        });

        let deferred = $q.defer();

        deferred.promise.then(function(){
            deregisterFunction();

            $urlRouter.sync();
        });

        let params = $location.search();

        let signurl = encodeURIComponent( $location.absUrl() );

        let code = localStorageService.get('code') || params['code'];

        if ( !localStorageService.get('code') && !!code ) {
            localStorageService.set('code', code);
        }

        Restangular.one('authen/user/info').get({code: code, signurl: signurl}).then(function(response) {
            let statusCode = response.status || false;

            if( statusCode == 'success' ) {
                let data = response.data || {};

                if ( !!data['customer'] ) {
                    localStorageService.set( 'users', JSON.stringify( data['customer'] ) );
                }

                if ( !!data['config'] ) {
                    localStorageService.set( 'jsconfig', JSON.stringify( data['config'] ) );
                }

                if ( !!data['binded'] && !(parseInt(data['binded'], 10) ) ) {
                    let vid = $stateParams['id'] || 0;

                    let BIND_URL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APP_CONFIG.APP_ID + '&redirect_uri=' + APP_CONFIG.API + 'tokens/getWechatOpenId&response_type=code&scope=snsapi_base&state=visa_' + vid + '#wechat_redirect';

                    window.location.href = BIND_URL;
                }
            } else {
                alert( '您的请求有问题，请稍后再试！' );

                // let users = require('../app.json');

                // localStorageService.set( 'users', JSON.stringify( users.customer ) );

                // localStorageService.set( 'jsconfig', JSON.stringify( users.config ) );
            }

            $timeout(function(){
                deferred.resolve();
            }, 200);
        }, function() {
            deferred.resolve();

            alert( '网络出现问题，请稍后再试！' );
            console.log("There was an error join");
        });
    });

    // Set Restangular response interceptor
    // ngModule.run(function(Restangular, APP_CONFIG, $state) {
    //     Restangular
    //     .addResponseInterceptor(function(response, operation, what, url, data) {
    //         if ( response.status == 'success' && ( !!response.data && (typeof response.data.status != 'undefined') ) ) {

    //             if ( response.data.status == '0' ) {
    //                  // $state.go('signApp.join', null, {reload: true});
    //                  // $state.go('signApp.identity', null, {reload: true});
    //             } else {
    //                 let statusCode = {
    //                     '10': 1011,
    //                     '1' : 1012,
    //                     '-1': 1013,
    //                     '2' : 1014,
    //                     '3' : 1015,
    //                     '-3': 1016,
    //                     '-5': 1017,
    //                     '-4': 1018,
    //                     '-6': 1019
    //                 };

    //                 $state.go('signApp.message', {id: statusCode[response.data.status]}, {reload: true});
    //             }
    //         }

    //         return response;
    //     });
    // });

    // Set Restangular response interceptor
    // ngModule.run(function(Restangular, $state, $timeout) {
    //     Restangular
    //     .setErrorInterceptor(function(response, deferred, responseHandler) {
    //         if ( response.data.status == 'success' ) {
    //             $timeout( function() {
    //                 $state.go('signApp.message', {id: 1010}, {reload: true});
    //             }, 1200 );


    //             return false;
    //         }

    //         return response.data;
    //     });
    // });

    // let refreshStatus;

    // ngModule.run(function($q) {
    //     refreshStatus = function() {
    //         let deferred = $q.defer();

    //         return deferred.promise;
    //     };
    // });

    ngModule.config(function ($stateProvider) {
        $stateProvider
        .state('signApp', {
            abstract: true,
        });
    });

    ngModule.config(function ($titleProvider) {
        $titleProvider.documentTitle(function($title) {
            return $title + ' - 即有分期面签APP';
        });
    });

    ngModule.config(function(localStorageServiceProvider) {
        localStorageServiceProvider
        .setPrefix('Visa')
        .setStorageType('sessionStorage')
        .setStorageCookie(1, '/');
    });
};