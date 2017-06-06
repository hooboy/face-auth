'use strict';

export default (ngModule) => {

    ngModule.controller('DefaultxxController', function (Restangular,$state,$scope,localStorageService, USER_CONFIG) {
        var vm = this;

		$scope.defObj={};
		console.log(USER_CONFIG);
		Restangular.all('wallet/faceVisa/querysales').post({'id':USER_CONFIG.gcid,'openId':USER_CONFIG.customer.openid,'token':USER_CONFIG.customer.token}).then(function (response){
			$scope.personxx={};
			$scope.personxx.userName=response.userName;
			$scope.personxx.factoryName=response.factoryName;
			$scope.personxx.mobile=response.mobile;
			$scope.personxx.ident=USER_CONFIG.customer.ident;
		});

		Restangular.all('wallet/faceVisa/getDictionary').post({'regType':'776','token':USER_CONFIG.customer.token}).then(function (response){
			if(response.list&&response.list.length>0){
				$scope.bankNamels=response.list;
			}
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
			if($scope.defObj.entryTime){
				$(".lineTL .center input::-webkit-datetime-edit-year-field").css("color","#000");
				$(".lineTL .center input::-webkit-datetime-edit-month-field").css("color","#000");
				$(".lineTL .center input::-webkit-datetime-edit-day-field").css("color","#000");
			}//沒用，但是先放在这。
		}

		$scope.defObj.zhima=true;
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

			$scope.deparfn();
			$scope.entryfn();
			$scope.educafn();
			$scope.bankNafn();
			$scope.bankNofn();
			$scope.wkInfn();
			$scope.qqfn();

			if($scope.deparfn()&&$scope.entryfn()&&$scope.educafn()&&$scope.bankNafn()&&$scope.bankNofn()&&$scope.wkInfn()&&$scope.qqfn()){
				localStorageService.set('basic', JSON.stringify($scope.defObj));

				$state.go("signApp.AddressPerson");
			}

//			console.log($scope.defObj);

		}
//		console.log(/^[^-+]\d{1,}/.test(99));
    });
}