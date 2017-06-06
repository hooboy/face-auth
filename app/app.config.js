function getSearch(url, key) {

    if( !url || url.indexOf("?") == -1 ) {
        return;
    }

    var query = url.substring(url.indexOf("?") + 1),
        params = {};

    if( !!query ) {
        var i = 0,
            urls = query.split("&"),
            len = urls.length;

        for(; i<len; i++ ) {
            var param = urls[i].split("=");

            params[param[0]] = decodeURIComponent( param[1] );
        }
    }

    if( !!key ) {
        if( !!params[key] ) {
            return params[key];
        }
    }

    return params;
}


let Angular = require('angular');

let ngModule = Angular.module('config', []);

let initInjector = Angular.injector(['ng']);

let $http = initInjector.get('$http');

let $timeout = initInjector.get('$timeout');

let code = getSearch(window.location.search, 'code');

let appConfig = {
    URL: process.env.APP_URL,
    API: process.env.API_URL,
    APP_ID: process.env.WXAPP_ID,
    CODE: code
};

ngModule.constant('APP_CONFIG', appConfig);

let config = {};

$http({
    url: appConfig.API + 'authen/user/info',
    method: 'GET',
    params: {
        "code": code,
        "signurl": encodeURIComponent(window.location.href)
    }
})
.then(
    // signed in {statusCode : 200} // OK
    function(res){
        if ( res.status == 200 ) {
            let data = res.data;

            ngModule.constant('USER_CONFIG', data.data);

            let isBind = !!parseInt(data['binded']);

            if ( !isBind && !!data['binded'] ) {
                let account_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appConfig.APP_ID + '&redirect_uri=' + appConfig.API + 'tokens/getWechatOpenId&response_type=code&scope=snsapi_base&state=visa_' + code + '#wechat_redirect';

                window.location.href = account_url;

                return;
            }
        } else {
            ngModule.constant('USER_CONFIG', config);

            Angular.element(document).ready(function() {
                Angular.bootstrap(document, ['signApp']);
            });
        }
    },
    // not signed in {statusCode : 403} // Forbidden
    function(){
        ngModule.constant('USER_CONFIG', config);

        Angular.element(document).ready(function() {
            Angular.bootstrap(document, ['signApp']);
        });
    }
)
.then(function() {
    setTimeout( function() {
        Angular.element(document).ready(function() {
            Angular.bootstrap(document, ['signApp']);
        });
    }, 100 );
});