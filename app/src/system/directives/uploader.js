'use strict';

export default (ngModule, Angular) => {
    ngModule.directive('uploader', function($q, Restangular, Wechatjs) {
        function chooseImage() {
            var deferred = $q.defer();

            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

                    // 上传本地图片到微信服务器
                    uploadImage( localIds[0]  || false, function(data) {
                        deferred.resolve(data);
                    } );
                },
                fail: function() {
                    alert("系统繁忙, 请稍后再试！chooseImage");
                    deferred.reject(false);
                },
                cancel: function() {
                    deferred.reject(false);
                }
            });

            return deferred.promise;
        }

        function uploadImage(id, callback) {
            if ( !id ) {
                alert('请选择照片');

                return;
            }

            wx.uploadImage({
                localId: id, // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 0, // 默认为1，显示进度提示
                success: function (res) {
                    var serverId = res.serverId; // 返回图片的服务器端ID

                    downloadImage( serverId, function(data) {
                        callback && callback.call(null, data);
                    } );
                },
                fail: function() {
                    alert("系统繁忙, 请稍后再试！uploadImage");
                }
            });
        }

        function downloadImage(id, callback) {
            if ( !id ) {
                alert('请选择照片');

                return;
            }

            let ids = [];

            ids.push( id );

            Restangular.all('file/download').post({
                serverIds: ids
            }).then(function(response) {
                var statusCode = response['status'];

                if ( statusCode == 'success' ) {
                    callback && callback.call(null, response.data);
                } else {
                    alert("系统繁忙, 请稍后再试！file/download: fail");
                }


            }, function() {
                alert("系统繁忙, 请稍后再试！file/download");
            });
        }

        return {
            restrict: "EA",
            require: '?ngModel',
            replace: true,
            template: require('./templates/uploader.html'),
            scope: {
                url: '@',
                path: '@'
            },
            bindToController: {
                url: '='
            },
            link: function(scope, element, attributes, ngModel) {

                scope.chooseImage = function() {
                    chooseImage().then(function(data) {

                        let apath = data[0]
                        let rpath = data[2];

                        scope.url = apath;

                        $(element).find('.show-image').css({
                            visibility: 'visible'
                        });

                        ngModel.$setViewValue(rpath);
                    });
                };

                ngModel.$render = function() {
                    if ( typeof ngModel.$viewValue != 'undefined' ) {
                        scope.path = ngModel.$viewValue;
                    }
                };
            },
            controller: function($scope, $element, $q) {
                // dosomething
            }
        };
    });
};