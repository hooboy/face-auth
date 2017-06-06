'use strict';

/**
 *
 *  Get Ajax Response->Data->Status
 *
 *  1010: 未申请0
 *  1011: 审核中10
 *  1012: 初审通过1
 *  1013: 初审拒绝-1
 *  1014: 面签完成2
 *  1015: 面签审核通过3
 *  1016: 面签审核拒绝-3
 *  1017: 初审取消-5
 *  1018: 面签取消-4
 *  1019: 添加银行卡-6
 *  1001: 已提交
 *  1002: 未通过
 *  1003: 待完善
 *  2000: 系统超时
 *
 *  '0' : 1010
 *  '10': 1011
 *  '1' : 1012
 *  '-1': 1013
 *  '2' : 1014
 *  '3' : 1015
 *  '-3': 1016
 *  '-5': 1017
 *  '-4': 1018
 *  '-6': 1019
 *
 */

export default (ngModule, Angular) => {
    let statuses = require('../data/status.json');

    ngModule.controller('MessagesController', function (Restangular, APP_CONFIG, $state, $stateParams) {
        let vm = this;

        let params = $stateParams;

        vm.data = {
            title: '',
            message: ''
        };

        Angular.forEach(statuses, function(value, key) {
            if ( value.id == parseInt(params.id, 10) ) {
                vm.data.title = value.title;
                vm.data.message = value.message;
            }
        });

        Wechatjs.getNetworkType({
            complete: function(res) {
                console.info( res );
            },
            success: function(res) {
                console.info( res );
            },
            fail: function(res) {
                console.info( res );
            }
        });
    });
}