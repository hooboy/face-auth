'use strict';

export default (ngModule) => {

    ngModule.controller('VerifyPersonController', function (Restangular,$state,$scope,localStorageService) {

        let users = JSON.parse(localStorageService.get('users')) || {};

		$scope.homeContact={};
		$scope.urgentContact={};
		$scope.otherContact={};

		$scope.division = require('../../data/citys.json');

		$scope.changeClr=function (){
			$scope.provifn();
			if($scope.address.province){
				$(".provincesty").removeClass("baseclr");
			}else{
				$(".provincesty").addClass("baseclr");
			}
			$scope.address.city='';
			$scope.address.district='';
			$(".citysty").addClass("baseclr");
			$(".districtsty").addClass("baseclr");
		}

		$scope.changeClr2=function (){
			$scope.citfn();
			if($scope.address.city){
				$(".citysty").removeClass("baseclr");
			}else{
				$(".citysty").addClass("baseclr");
			}
			$scope.address.district='';
		}

		$scope.changeClr3=function (){
			$scope.distrfn();
			if($scope.address.district){
				$(".districtsty").removeClass("baseclr");
			}else{
				$(".districtsty").addClass("baseclr");
			}
		}

		//亲人关系
		Restangular.all('wallet/faceVisa/getDictionary').post({'regType':265,'token':users.token}).then(function (response){
            if ( typeof response != 'undefined' ) {
                if ( response.status == 'success' ) {
                    let data = response.data;

                    if( data.list && data.list.length > 0 ){
                        $scope.relativer = data.list;

                        // console.info( $scope.relativer );
                    }
                }
            } else {
                alert( '系统异常！' );
            }
		});
		//其他或者紧急联系人关系
		Restangular.all('wallet/faceVisa/getDictionary').post({'regType':396,'token':users.token}).then(function (response){
            if ( typeof response != 'undefined' ) {
                if ( response.status == 'success' ) {
                    let data = response.data;

                    if( data.list && data.list.length > 0 ){
                        $scope.others = data.list;
                    }
                }
            } else {
                alert( '系统异常！' );
            }
		});

		$scope.relastyfn=function (){
			$scope.homerelafn();
			if($scope.homeContact.relationship){
				$(".familysty").removeClass("baseclr");
			}else{
				$(".familysty").addClass("baseclr");
			}
		}

		$scope.relastyfn2=function (){
			$scope.urgerelafn();
			if($scope.urgentContact.relationship){
				$(".urgensty").removeClass("baseclr");
			}else{
				$(".urgensty").addClass("baseclr");
			}
		}

		$scope.relastyfn3=function (){
			if($scope.otherContact.relationship){
				$(".othersty").removeClass("baseclr");
			}else{
				$(".othersty").addClass("baseclr");
			}
		}

		var phonereg=/^[1]{1}\d{10}$/;
		$scope.address={};
		$scope.provifn=function (){
			if(!$scope.address.province){
				$scope.provinsty=true;
				return false;
			}else{
				$scope.provinsty=false;
				return true;
			}
		}
		$scope.citfn=function (){
			if(!$scope.address.city){
				$scope.ctsty=true;
				return false;
			}else{
				$scope.ctsty=false;
				return true
			}
		}
		$scope.distrfn=function (){
			if(!$scope.address.district){
				$scope.distrsty=true;
				return false;
			}else{
				$scope.distrsty=false;
				return true;
			}
		}
		$scope.detafn=function (){
			if(!$scope.address.detail){
				$scope.detailsty=true;
				return false;
			}else{
				$scope.detailsty=false;
				return true;
			}
		}
		$scope.homenamefn=function (){
			if(!$scope.homeContact.name){
				$scope.faminamesty=true;
				return false;
			}else{
				$scope.faminamesty=false;
				return true;
			}
		}
		$scope.homerelafn=function (){
			if(!$scope.homeContact.relationship){
				$scope.famirelasty=true;
				return false;
			}else{
				$scope.famirelasty=false;
				return true;
			}
		}
		$scope.homephonefn=function (){
			if(!$scope.homeContact.phone||!phonereg.test($scope.homeContact.phone)){
				$scope.famiphonesty=true;
				return false;
			}else{
				$scope.famiphonesty=false;
				return true;
			}
		}
		$scope.urgenamefn=function (){
			if(!$scope.urgentContact.name){
				$scope.urgenamesty=true;
				return false;
			}else{
				$scope.urgenamesty=false;
				return true;
			}
		}
		$scope.urgerelafn=function (){
			if(!$scope.urgentContact.relationship){
				$scope.urgerelasty=true;
				return false;
			}else{
				$scope.urgerelasty=false;
				return true;
			}
		}
		$scope.urgephonefn=function (){
			if(!$scope.urgentContact.phone||!phonereg.test($scope.urgentContact.phone)){
				$scope.urgephonesty=true;
				return false;
			}else{
				$scope.urgephonesty=false;
				return true;
			}
		}
		$scope.otherphonefn=function (){
			if($scope.otherContact.phone&&!phonereg.test($scope.otherContact.phone)){
				$scope.othephonesty=true;
				return false;
			}else{
				$scope.othephonesty=false;
				return true;
			}
		}
		var weLiveAddres={};
		$scope.nextgo=function (){

            // mock begin
            // let data = {
            //     'contacts': {
            //         'homeContact': {
            //             'name': '小小易',
            //             'phone': '18866661111',
            //             'relationship': '你猜'
            //         },
            //         'urgentContact': {
            //             'name': '小小飞上天',
            //             'phone': '18866661111',
            //             'relationship': '你再猜呀'
            //         },
            //         'otherContact': {
            //             'name': '小小鸟',
            //             'phone': '18866661111',
            //             'relationship': '你猜呀'
            //         }
            //     },
            //     'weLive': {
            //         'address': '天上人间',
            //         'city': '北京市',
            //         'province': '北京市',
            //         'region': '朝阳区'
            //     }
            // };
            // localStorageService.set('person', JSON.stringify(data));
            //mock end

			$scope.provifn();
			$scope.citfn();
			$scope.distrfn();
			$scope.detafn();
			$scope.homenamefn();
			$scope.homerelafn();
			$scope.homephonefn();
			$scope.urgenamefn();
			$scope.urgerelafn();
			$scope.urgephonefn();

			if($scope.provifn()&&$scope.citfn()&&$scope.distrfn()&&$scope.detafn()&&$scope.homenamefn()&&$scope.homerelafn()&&$scope.homephonefn()&&$scope.urgenamefn()&&$scope.urgerelafn()&&$scope.urgephonefn()){

				weLiveAddres.province=$scope.address.province;
				weLiveAddres.city=$scope.address.city;
				weLiveAddres.region=$scope.address.district;
				weLiveAddres.address=$scope.address.detail;

				let data = {
					'contacts': {
						'homeContact': $scope.homeContact,
						'urgentContact': $scope.urgentContact,
						'otherContact': $scope.otherContact
					},
					'weLive': weLiveAddres
				};

				localStorageService.set('person', JSON.stringify(data));

				$state.go("signApp.identity", null, {reload: true});
			}
		}

//		console.info( JSON.parse( localStorageService.get('basic') ) );
//		console.info(USER_CONFIG);
//		console.log($location.search());
    });
}