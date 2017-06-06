'use strict';

export default (ngModule) => {

    ngModule.controller('MessageCustomController', function (Restangular, localStorageService, APP_CONFIG, $state, $window) {
        var vm = this;

        vm.data = {};

        vm.data.title = '待完善';

        vm.data.message = $window.decodeURIComponent( localStorageService.get( 'message') );
    });
}