'use strict';

export default (ngModule) => {

    ngModule.controller('JoinController', function (Restangular, APP_CONFIG, $state, $stateParams, Wechatjs) {
        var vm = this;

        vm.codeId = $stateParams.id || '';
    });
}