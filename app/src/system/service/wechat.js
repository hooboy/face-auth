'use strict';

export default (ngModule, Angular) => {
    Angular
    .module("signApp.wechatjs", [])
    .factory('Wechatjs', wechatAPI);

    function wechatAPI(Restangular, localStorageService, $location) {
        // let wxJsSdkConfig = USER_CONFIG.config || {};

        let Factory = {};

        let api = {};

        Factory.methods = ['checkJsApi', 'onMenuShareTimeline',
                    'onMenuShareAppMessage', 'onMenuShareQQ',
                    'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems',
                    'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem',
                    'translateVoice', 'startRecord', 'stopRecord',
                    'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice',
                    'uploadVoice', 'downloadVoice', 'chooseImage',
                    'previewImage', 'uploadImage', 'downloadImage',
                    'getNetworkType', 'openLocation', 'getLocation',
                    'hideOptionMenu', 'showOptionMenu', 'closeWindow',
                    'scanQRCode', 'chooseWXPay', 'openProductSpecificView',
                    'addCard', 'chooseCard', 'openCard'];

        api.signature = function(signurl) {
            Restangular.one('authen/user/jsconfig').get({signurl: signurl}).then(function(response) {
                let statusCode = response.status || false;

                if( statusCode == 'success' ) {
                    let config = response.data;

                    if ( !angular.isObject(config) ) {
                        config = JSON.parse( config );
                    }

                    wx.config({
                        debug: config.debug || false,
                        appId: config.appId,
                        timestamp: config.timestamp,
                        nonceStr: config.nonceStr,
                        signature: config.signature,
                        jsApiList : Factory.methods
                    });
                } else {
                    alert( '网络出现问题，请稍后再试！' );
                }
            }, function() {
                alert( '网络出现问题，请稍后再试！' );
            });
        };

        for (var m = 0; m < Factory.methods.length; m++) {
            let fn = Factory.methods[m];

            api[fn] = wx[fn];
        }

        return api;
    }
};