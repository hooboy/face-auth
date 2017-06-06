
export default (ngModule, Angular) => {

    ngModule.controller('IdentityController', function (Restangular, localStorageService, APP_CONFIG, Wechatjs, $scope, $compile, $state, $location, $window, $document) {
        var vm = this;

        let signurl = encodeURIComponent( $location.absUrl() );

        // Wechatjs.signature( signurl );

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
                    jsApiList : ['checkJsApi', 'onMenuShareTimeline',
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
                    'addCard', 'chooseCard', 'openCard']
                });
            } else {
                alert( '网络出现问题，请稍后再试！' );
            }
        }, function() {
            alert( '网络出现问题，请稍后再试！' );
        });

        let Customer = JSON.parse( localStorageService.get('users') ) || {};

        vm.verified = false;

        vm.proves = [];

        vm.data = {
            'idPerson' : '',
            'identBack' : '',
            'identFront' : '',
            'interCode' : '',
            'latitude' : '',
            'longitude' : '',
            'prove': '',
            'qrcodeId': '',
            'saleId': '',
            'groupPhoto' : '',
            'groupPhotoFS': '',
            'socialCard': '',
            'socialCardFS': '',
            'workCardBack': '',
            'workCardBackFS': '',
        };

        vm.data.groupPhoto = '';

        vm.data.currentAddress = {
            'address' : '',
            'city' : '',
            'province' : '',
            'region' : '',
        };

        vm.data.weLiveAddres = {
            'address' : '',
            'city' : '',
            'province' : '',
            'region' : '',
        };

        vm.isEmptyObj = function( obj ) {
            for ( var p in obj ) {
                return false;
            }

            return true;
        };

        vm.initialize = function() {
            var $tipsOverlay = $('#tips-overlay');

            $tipsOverlay.on('touchstart', function() {
                $(this).hide();
            });
        };

        vm.openOverlay = function() {
            $('#tips-overlay').show();
        };

        vm.getData = function () {
            let cu, ba, pe, we, co;

            let customer = JSON.parse( localStorageService.get('customer') || {} );
            let basic = JSON.parse( localStorageService.get('basic') || {} );
            let person = JSON.parse( localStorageService.get('person') || {} );

            if ( !!customer['filePath'] ) {
                vm.data['groupPhoto'] = customer['filePath'];
            }

            if ( !!customer['id'] ) {
                vm.data['qrcodeId'] = customer['id'];
            }

            if ( !!customer['saleId'] ) {
                vm.data['saleId'] = customer['saleId'];
            }

            for ( ba in basic ) {
                vm.data[ba] = basic[ba];
            }

            for ( pe in person ) {
                if ( pe == 'weLive' ) {
                    for ( we in person[pe] ) {
                        vm.data.weLiveAddres[we] = person[pe][we];
                    }
                } else {
                    for ( co in person[pe] ) {
                        vm.data[co] = person[pe][co];
                    }
                }
            }
        }


        vm.mergeData = function() {
            vm.getData();

            if ( !!Customer['personid'] ) {
                vm.data.idPerson = Customer['personid'];
            }

            if ( !!Customer['coordinate'] ) {
                vm.data.latitude = Customer['coordinate']['latitude'] || '';
                vm.data.longitude = Customer['coordinate']['longitude'] || '';
            }

            if ( !!vm.prove ) {
                vm.data.socialCard = vm.prove;
            }

            if ( !vm.isEmptyObj( vm.proof ) ) {
                let proof = vm.proof;

                let list = [];

                for ( var p in proof ) {
                    list.push( proof[p] );
                }

                vm.data.workCardBack = list.join(';');
            }
        }

        vm.validateprove = function () {
            let provesInput = vm.proves || [];

            if ( (provesInput.length == 0 && !vm.prove) || ( (provesInput.length == 0) && !vm.prove ) ) {
                alert( '需要上传工作证明文件或第二证明文件图片！' );

                return false;
            }


            let proves = vm.proves;

            // let proveArr = [];

            // for ( var p in proves ) {
            //     if ( typeof proves[p] != undefined ) {
            //         proveArr.push(proves[p]);
            //     }
            // }

            vm.data.prove = proves.join(';');

            return true;
        }

        vm.validate = function () {
            if ( !vm.data.identFront ) {
                vm.verified = false;

                alert( '需要上传身份证正面图片！' );

                return false;
            }

            if ( !vm.data.identBack ) {
                vm.verified = false;

                alert( '需要上传身份证背面图片！' );

                return false;
            }

            if ( !vm.validateprove() ) {
                vm.verified = false;

                return false;
            }

            vm.verified = true;

            return true;
        }

        vm.uploadChange = function() {
            if ( !vm.validate() ) {
                return;
            }

            vm.mergeData();

            var jsonData = Angular.extend( vm.data, {
                'openId': Customer['openid'],
                'token': Customer['token']
            } );

            Restangular.all('wallet/faceVisa/saveData').post(jsonData).then(function(json) {
                var statusCode = json['result'];

                if ( statusCode == 'success' ) {
                    vm.verified = false;

                    localStorageService.clearAll();
                } else if ( statusCode == 'fail' ) {
                    localStorageService.set( 'message', encodeURIComponent(json['message']) );

                    $state.go('signApp.message_custom');
                } else {
                    alert('系统出现异常！response error');
                }
            }, function() {
                alert('系统出现异常！error');
            }).then(function() {

            });

            // console.info( jsonData );
        };

        vm.initialize();
    });
}
