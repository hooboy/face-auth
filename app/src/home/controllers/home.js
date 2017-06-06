'use strict';

export default (ngModule) => {

    ngModule.controller('HomeController', function (Restangular, APP_CONFIG, USER_CONFIG, $state) {
        var vm = this;

        vm.type = "oil";

        // Restangular.all('wallet/apply/getstatus').post({
        //     "openId": "oil7Ws3S-BuyIzvdPjVfBoX6QNQE",
        //     "token": "aed13f37687d35b32a5b92c23d5d383a"
        // });

        console.info( APP_CONFIG );

        console.info( USER_CONFIG );

        // Restangular.one('wallet/apply/getstatus', {}).get()

        // Restangular.all('wallet/apply/getstatus').post({
        //     "openId": "oil7Ws3S-BuyIzvdPjVfBoX6QNQE",
        //     "token": "aed13f37687d35b32a5b92c23d5d383a"
        // });
    });
}