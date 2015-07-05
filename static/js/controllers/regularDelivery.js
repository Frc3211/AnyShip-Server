app.controller('regularDeliveryCtrl', ['$scope', '$http', '$rootScope', '$state', function($scope, $http, $rootScope, $state){
	//init
	$scope.regularDelivery = {}
	if ($state.params.id){
		$http({
			method: 'GET',
			url: '/api/RegularDelivery/' + $state.params.id
		}).success(function(data){
			$scope.regularDelivery = data
			//$scope.initObjects(data)
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
			url: '/api/RegularSitesForCustomer/' + $scope.delivery.customer
		}).success(function(data){
			$scope.regularSites = data;
			$scope.typeCallback();
		})
	}

	$scope.$watch('regularDelivery.customer', function(data){
		for (i in $scope.customers){
			if($scope.customers[i].id == data){
				$scope.contactMans = $scope.customers[i].contact_man
			}
		}
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
