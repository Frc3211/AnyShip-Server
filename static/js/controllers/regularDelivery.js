app.controller('regularDeliveryCtrl', ['$scope', '$http', '$rootScope', '$state', function($scope, $http, $rootScope, $state){
	//init
	$scope.regularDelivery = {}
    $scope.regularDelivery.type = '0';

	if ($state.params.id){
		$http({
			method: 'GET',
			url: '/api/RegularDelivery/' + $state.params.id
		}).success(function(data){
			$scope.regularDelivery = data
			$scope.initObjects(data)
		})
	}

	$rootScope.currPage = 'main.newRegularDelivery';
	$rootScope.currMenu = 'main'
	$rootScope.currTable = 'סבבים קבועים'
	$rootScope.showLoader = true;

	$http.get('/api/Customers/').success(function(data){
		$scope.customers = data;
	})

	$http.get('/api/VehicleTypes').success(function(data){
		$scope.vehicles = data;
	})

	$http.get('/api/UrgencyList').success(function(data){
		$scope.urgs = data;
	})

	$http.get('/api/DoubleTypeList').success(function(data){
		$scope.doubles = data;
	})

	$http.get('/api/Employee').success(function(data){
		$scope.employees = data;
	})

	$http.get('/api/RegularDelivery/').success(function(data){
		$scope.regularDeliveries = data;
	})

	$rootScope.showLoader = false;
	//$scope.selectedRegularDelivery = undefined;

	//functions
	$scope.customerSelected = function(){
		$http({
			method: 'GET',
			url: '/api/RegularSitesForCustomer/' + $scope.regularDelivery.customer
		}).success(function(data){
			$scope.regularSites = data;
			$scope.typeCallback();
		})
	}

    $scope.typeCallback = function(){
        console.log("typeCallback")
		var cust = undefined;

		angular.forEach($scope.customers, function(obj){
			if(obj.id == parseInt($scope.regularDelivery.customer)){
				cust = obj;
			}
		})

		if(cust == undefined)
			return;

		$scope.regularDelivery.sourceStreet = undefined;
		//$scope.regularDelivery.sourcePhone = undefined;
		$scope.regularDelivery.sourceHomeNum = undefined;
		//$scope.regularDelivery.sourceHomeEnter = undefined;
		//$scope.regularDelivery.sourceFloor = undefined;
		//$scope.regularDelivery.sourceApart = undefined;
		$scope.regularDelivery.sourceCity = undefined;

		$scope.regularDelivery.destStreet = undefined;
		//$scope.regularDelivery.destPhone = undefined;
		$scope.regularDelivery.destHomeNum = undefined;
		//$scope.regularDelivery.destHomeEnter = undefined;
		//$scope.regularDelivery.destFloor = undefined;
		//$scope.regularDelivery.destApart = undefined;
		$scope.regularDelivery.destCity = undefined;

		switch($scope.regularDelivery.type){
			case '0':
				//var cust = {name: angular.element('#customer').find('option:selected').text()}
				var exist = false;

				angular.forEach($scope.regularSites, function(obj){
					if(obj.name == cust.name){
						exist = true;
					}
				})

				if(exist == false){
					$scope.regularSites.push(cust)
				}

				$scope.regularDelivery.senderObj = $scope.regularSites[$scope.regularSites.length-1]
				$scope.regularDelivery.receiverObj = {};

				$scope.senderChanged()

				break;

			case '1':
				//var cust = {name: angular.element('#customer').find('option:selected').text()}
				var exist = false;


				angular.forEach($scope.regularSites, function(obj){
					if(obj.name == cust.name){
						exist = true;
					}
				})

				if(exist == false){
					$scope.regularSites.push(cust)
				}

				$scope.regularDelivery.receiverObj = $scope.regularSites[$scope.regularSites.length-1]
				$scope.regularDelivery.senderObj = {};


				$scope.receiverChanged()

				break;

			case '2':
				$scope.regularDelivery.sender = undefined;
				$scope.regularDelivery.senderObj = undefined;
				$scope.regularDelivery.receiver = undefined;
				$scope.regularDelivery.receiverObj = undefined;

				break;
		}
	}


    $scope.senderChanged = function(){
		var obj = $scope.regularDelivery.senderObj;

		$scope.regularDelivery.sourceStreet = (obj == undefined) ? undefined : obj.streetName;
		$scope.regularDelivery.sourceHomeNum = (obj == undefined) ? undefined : obj.streetNum;
		$scope.regularDelivery.sourcePhone = (obj == undefined) ? undefined : obj.phone1;
		$scope.regularDelivery.sourceCity = (obj == undefined) ? undefined : obj.city;
	}

	$scope.receiverChanged = function(){
		var obj = $scope.regularDelivery.receiverObj;

		$scope.regularDelivery.destStreet = (obj == undefined) ? undefined : obj.streetName;
		$scope.regularDelivery.destHomeNum = (obj == undefined) ? undefined : obj.streetNum;
		$scope.regularDelivery.destPhone = (obj == undefined) ? undefined : obj.phone1;
		$scope.regularDelivery.destCity = (obj == undefined) ? undefined : obj.city;
	}

	$scope.$watch('regularDelivery.customer', function(data){
		for (i in $scope.customers){
			if($scope.customers[i].id == data){
				$scope.contactMans = $scope.customers[i].contact_man
			}
		}
	})

    $scope.addTagging = function(name){
		return {name:name}
	}

    $scope.$watch('regularDelivery.senderObj', function(obj){
		$scope.regularDelivery.sender = (obj == undefined) ? undefined : obj.name
	})

	$scope.$watch('regularDelivery.receiverObj', function(obj){
		$scope.regularDelivery.receiver = (obj == undefined) ? undefined : obj.name
	})

	$scope.newRegularDelivery = function(){
		$scope.regularDelivery = {}
		$scope.selectedRegularDelivery = 0;
	}

	$scope.deleteRegularDelivery = function(){
		$http({
			method: 'DELETE',
			url: '/api/RegularDelivery/' + $scope.regularDelivery.id
		}).success(function(){
			//TODO: remove from list
			$scope.regularDelivery = {}
			$scope.selectedRegularDelivery = 0;

			$rootScope.addAlert('נמחק בהצלחה', 'success')
		}).error(function(data){
			$rootScope.addAlert('התרחשה שגיאה! נסה שוב מאוחר יותר', 'danger')
		})
	}

	$scope.submit = function(){
		if($scope.regularDelivery.id){
			$http({
				method: 'PUT',
				url: '/api/RegularDelivery/' + $scope.regularDelivery.id,
				data: $scope.regularDelivery,
				headers : { 'Content-Type': 'application/json' }
			}).success(function(data){
				$rootScope.addAlert('סבב קבוע הוזן בהצלחה!', 'success')
				//alert("המשלוח הוזן!")
			})
			.error(function(data){
				$rootScope.addAlert('שגיאה', 'danger')
				//alert("שגיאה!")
			})
		} else {
			$http({
				method: 'POST',
				url: '/api/newRegularDelivery/',
				data: $scope.regularDelivery,
				headers : { 'Content-Type': 'application/json' }
			})
			.success(function(data){
				$rootScope.addAlert('סבב קבוע הוזן בהצלחה!', 'success')
				//alert("המשלוח הוזן!")
			})
			.error(function(data){
				$rootScope.addAlert('שגיאה', 'danger')
				//alert("שגיאה!")
			})
		}
	}

	$scope.initObjects = function(data){
        $scope.regularDelivery.senderObj = {};
		$scope.regularDelivery.receiverObj = {};

        $scope.regularDelivery.senderObj['name'] = (data.sender == undefined) ? undefined : data.sender
		$scope.regularDelivery.receiverObj['name'] = (data.receiver == undefined) ? undefined : data.receiver

		$scope.regularDelivery.lastUpdate = (data.lastUpdate == undefined) ? undefined : new Date(data.lastUpdate)
		$scope.regularDelivery.startDate = (data.startDate == undefined) ? undefined : new Date(data.startDate)
		$scope.regularDelivery.endDate = (data.endDate == undefined) ? undefined : new Date(data.endDate)
	}

	$scope.selectRegularDelivery = function(){
		$http({
			method: 'GET',
			url: '/api/RegularDelivery/' + $scope.selectedRegularDelivery
		}).success(function(data){
			$scope.regularDelivery = data;
			$scope.initObjects(data);
		})
	}
}])
