'use strict';

export default (ngModule) => {

    ngModule.controller('StatusController', function (Restangular, APP_CONFIG, $state, $stateParams, $sessionStorage, $location, localStorageService) {
        var vm = this;

        let users = JSON.parse( localStorageService.get('users') ) || {};

        let cid = $stateParams.id || '';

        vm.getStatus = function() {
            Restangular.all('wallet/apply/getstatus').post({
                openId: users.openid,
                token: users.token
            }).then(function(response) {
                let statusCode = response['status'] || 'fail';

                if ( statusCode == 'success' && ( !!response.data && (typeof response.data.status != 'undefined') ) ) {

                    if ( response.data.status == '0' ) {
                         $state.go('signApp.join', {id: cid});
                    } else {
                        let messageCode = {
                            '10': 1011,
                            '1' : 1012,
                            '-1': 1013,
                            '2' : 1014,
                            '3' : 1015,
                            '-3': 1016,
                            '-5': 1017,
                            '-4': 1018,
                            '-6': 1019
                        };

                        let code = response.data['status'] || '10000';

                        $state.go('signApp.message', {id: messageCode[code]});
                    }
                } else {
                    $state.go('signApp.join', {id: cid});
                }
            }, function() {
                $state.go('signApp.join', {id: cid});
            });
        };

        vm.getStatus();
    });
}