'use strict';

export default (ngModule) => {

    ngModule.controller('VerifyBasicController', function (Restangular,$state,$scope,$stateParams,$filter,localStorageService, basic) {
        var vm = this;

        vm.data = {};

        let users = JSON.parse(localStorageService.get('users')) || {};

        let cid = $stateParams.id || 0;

		$scope.defObj = {};

		$scope.customer = {};

		vm.getVisaSales = function() {
			if ( !!basic ) {
				let response = basic;

				if ( response.status == 'success' ) {
					let data = response.data;

					$scope.customer.userName=data.userName;
					$scope.customer.factoryName=data.factoryName;
					$scope.customer.mobile=data.mobile;
					$scope.customer.ident=users.ident;

					localStorageService.set( 'customer', JSON.stringify( data ) );
				} else {
					alert( '网络繁忙，请稍后再试！' );
				}
			}
		};

		vm.getVisaSales();

		// Restangular.all('wallet/faceVisa/querysales').post({'id': cid,'openId':c_config.openid,'token':c_config.token}).then(function (response){
		// 	if ( typeof response != 'undefined' ) {
		// 		if ( response.status == 'success' ) {
		// 			let data = response.data;

		// 			$scope.customer.userName=data.userName;
		// 			$scope.customer.factoryName=data.factoryName;
		// 			$scope.customer.mobile=data.mobile;
		// 			$scope.customer.ident=USER_CONFIG.customer.ident;

		// 			localStorageService.set( 'customer', JSON.stringify( data ) );
		// 		}
		// 	} else {
		// 		console.info( '系统异常！' );
		// 	}
		// });

		Restangular.all('wallet/faceVisa/getDictionary').post({'regType':'776','token':users.token}).then(function (response){
			if ( typeof response != 'undefined' ) {
				if ( response.status == 'success' ) {
					let data = response.data;

					if( data.list && data.list.length > 0 ){
						$scope.bankNamels = data.list;
					}
				}
			} else {
				alert( '网络繁忙，请稍后再试！' );
			}
		}, function() {
			alert( '网络繁忙，请稍后再试！' );
		});

		$scope.changeSty=function (){
			$scope.bankNafn();
			if(!$scope.defObj.bankName){
				$(".bankNamecls").addClass("baseclr");
				return;
			}
			$(".bankNamecls").removeClass("baseclr");
		}

		$scope.entryTimefn=function (){
			if(vm.data.entryTime){
				$scope.defObj.entryTime = $filter('date')(vm.data.entryTime, 'yyyy-MM-dd');

				$(".lineTL .center input::-webkit-datetime-edit-year-field").css("color","#000");
				$(".lineTL .center input::-webkit-datetime-edit-month-field").css("color","#000");
				$(".lineTL .center input::-webkit-datetime-edit-day-field").css("color","#000");
			}//沒用，但是先放在这。
		}

		$scope.defObj.credited=true;
		//验证表单
		$scope.deparfn=function (){
			if(!$scope.defObj.department){
				$scope.deparBool=true;
				return false;
			}else {
				$scope.deparBool=false;
				return true;
			}
		}
		$scope.entryfn=function (){
			if(!$scope.defObj.entryTime){
				$scope.entryBool=true;
				return false;
			}else {
				$scope.entryBool=false;
				return true;
			}
		}
		$scope.educafn=function (){
			if(!$scope.defObj.education){
				$scope.educaBool=true;
				return false;
			}else {
				$scope.educaBool=false;
				return true;
			}
		}
		$scope.bankNafn=function (){
			if(!$scope.defObj.bankName||$scope.defObj.bankName=='请选择'){
				$scope.bankNaBool=true;
				return false;
			}else {
				$scope.bankNaBool=false;
				return true;
			}
		}
		$scope.bankNofn=function (){
			if(!$scope.defObj.bankNo||!/\d{16,19}/.test($scope.defObj.bankNo)){
				$scope.bankNoBool=true;
				return false;
			}else {
				$scope.bankNoBool=false;
				return true;
			}
		}
		$scope.wkInfn=function (){
			if(!$scope.defObj.wkIncome||$scope.defObj.wkIncome<0){
				$scope.wkIncoBool=true;
				return false;
			}else{
				$scope.wkIncoBool=false;
				return true;
			}
		}
		$scope.qqfn=function (){
			if(!$scope.defObj.qq||!/^[1-9]\d{4,10}$/.test($scope.defObj.qq)){
				$scope.qqBool=true;
				return false;
			}else {
				$scope.qqBool=false;
				return true;
			}
		}

		//验证表单
		$scope.gonext=function (){
			// mock begin
			// localStorageService.set('basic', JSON.stringify({
			// 	'department': '移动互联网',
			// 	'entryTime': '2017-03-14 00:10:00',
			// 	'education': '本科',
			// 	'bankName': '中国工商银行',
			// 	'bankNo': '6228480402564890018',
			// 	'wkIncome': 1000,
			// 	'qq': '888888',
			// 	'credited': true
			// }));
			// $state.go("signApp.AddressPerson");
			// mock end

			$scope.deparfn();
			$scope.entryfn();
			$scope.educafn();
			$scope.bankNafn();
			$scope.bankNofn();
			$scope.wkInfn();
			$scope.qqfn();

			if($scope.deparfn()&&$scope.entryfn()&&$scope.educafn()&&$scope.bankNafn()&&$scope.bankNofn()&&$scope.wkInfn()&&$scope.qqfn()){
				localStorageService.set('basic', JSON.stringify($scope.defObj));

				$state.go("signApp.verifyPerson");
			}

//			console.log($scope.defObj);

		}
//		console.log(/^[^-+]\d{1,}/.test(99));
    });
}