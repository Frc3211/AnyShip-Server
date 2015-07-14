app.controller('newCustomerCtrl', ['$scope', '$rootScope', '$http', '$state', '$filter', 'dateFilter', '$modal', 'objectsService', function($scope, $rootScope, $http, $state, $filter, dateFilter, $modal, objectsService){
	//init
	$rootScope.currMenu = 'commands';
	$rootScope.currTable = "לקוח חדש"
	$rootScope.currPage = 'main.newCustomer'
	$scope.contactMans = [];
	$scope.customer = {}

	$http({
		method: 'GET',
		url: '/api/Customers/'
	}).success(function(data){
		$scope.customers = data;
	})

    //$scope.customers = objectsService['Customers']
    console.log($scope.customers)

	$http({
		method: 'GET',
		url: '/api/PriceList/'
	}).success(function(data){
		$scope.priceLists = data;
	})

	$http({
		method: 'GET',
		url: '/api/CustomerTypes/'
	}).success(function(data){
		$scope.customerTypes = data;
	})

	//functions
    $scope.initObjects = function(data){
        $scope.customer.openingDate = (data.openingDate == undefined) ? undefined : new Date(data.openingDate)
        $scope.customer.endDate = (data.endDate == undefined) ? undefined : new Date(data.endDate)
    }

	$scope.selectCustomer = function(){
        if(!$scope.form.$pristine){
			var modalInstance = $modal.open({
				animation: true,
				templateUrl: '/static/partials/modals/yesNoWindow.html',
				controller: function($scope, $modalInstance){
					$scope.close = function(){
						$modalInstance.close();
					}

					$scope.msg = "יש שינויים שלא נשמרו. להמשיך בכל זאת?";
					$scope.title = "אזהרה"

					$scope.yes = function(){
                        $http({
                			method: 'GET',
                			url: '/api/Customers/' + $scope.$parent.selectedCustomer.id
                		}).success(function(data){
                			$scope.$parent.customer = data;
                			$scope.$parent.contactMans = data.contact_man;
                            $scope.$parent.form.$pristine = true
                            $scope.initObjects(data);
                            $modalInstance.close();
                		})
					}

					$scope.no = function(){
						$scope.$parent.selectedCustomer = 0;
						$modalInstance.close();
					}
				},
				scope: $scope,
				size: 'sm'
			});
		} else {
            $http({
    			method: 'GET',
    			url: '/api/Customers/' + $scope.selectedCustomer.id
    		}).success(function(data){
    			$scope.customer = data;
    			$scope.contactMans = data.contact_man;
                $scope.initObjects(data);
    		})
		}
	}

	$scope.deleteCustomer = function(){
		$http({
			method: 'DELETE',
			url: '/api/Customers/' + $scope.customer.id
		}).success(function(){
			for (var i = $scope.customers.length - 1 ; i >= 0 ; i--){
				var obj = $scope.customers[i];

				if($scope.customer.id == $scope.customers[i].id){
					$scope.customers.splice(i, 1);
				}
			}
			$scope.customer = {}
			$rootScope.addAlert('נמחק בהצלחה', 'success')
		}).error(function(){
			$rootScope.addAlert('שגיאה', 'danger')
		})
	}

	$scope.newCustomer = function(){
        if(!$scope.form.$pristine){
			var modalInstance = $modal.open({
				animation: true,
				templateUrl: '/static/partials/modals/yesNoWindow.html',
				controller: function($scope, $modalInstance){
					$scope.close = function(){
						$modalInstance.close();
					}

					$scope.msg = "יש שינויים שלא נשמרו. להמשיך בכל זאת?";
					$scope.title = "אזהרה"

					$scope.yes = function(){
						$scope.$parent.customer = {};
						$scope.$parent.selectedCustomer = 0;
						$scope.$parent.form.$pristine = true
						$modalInstance.close();
					}

					$scope.no = function(){
						$modalInstance.close();
					}
				},
				scope: $scope,
				size: 'sm'
			});
		} else {
            $scope.customer = {}
    		$scope.selectedCustomer = 0;
		}
	}

	$scope.newContact = function(){
		$scope.contactMans.push({});
	}

	$scope.deleteEntry = function(index){
		if($scope.contactMans[index].id != undefined){
			$http({
				method: 'DELETE',
				url: '/api/ContactMan/' + $scope.contactMans[index].id
			}).success(function(data){
				//alert("נמחק בהצלחה")
				$rootScope.addAlert('נמחק בהצלחה', 'success')
			})
		}
		$scope.contactMans.splice(index, 1)

	}

	/*$scope.$watch('customer.openingDate', function(date){
		console.log($scope.customer.openingDate)
		$scope.customer.openingDate = dateFilter(date, 'yyyy-MM-dd')
		console.log($scope.customer.openingDate)
		console.log('filter', dateFilter(date, 'yyyy-MM-dd'))
	})

	$scope.$watch('customer.endDate', function(date){
		$scope.customer.endDate = dateFilter(date, 'yyyy-MM-dd')
		console.log('filter', dateFilter(date, 'yyyy-MM-dd'))
	})*/

	$scope.submitCustomer = function(){
		//$scope.customer.endDate = $filter('date')($scope.customer.endDate, 'yyyy-MM-dd');
		//$scope.customer.openingDate = $filter('date')($scope.customer.openingDate, 'yyyy-MM-dd');

		//Check if new customer or existing customer
		if($scope.customer.id){
			$http({
				method: 'PUT',
				url: '/api/Customers/' + $scope.customer.id,
				data: $scope.customer,
				headers : { 'Content-Type': 'application/json' }
			}).success(function(data){
                $scope.form.$pristine = true
                $rootScope.addAlert('לקוח נשמר בהצלחה', 'success')
            })
			angular.forEach($scope.contactMans, function(value, key){
				if(value.id){
					$http({
						method: 'PUT',
						url: '/api/ContactMan/' + value.id,
						data: value,
						headers : { 'Content-Type': 'application/json' }
					})
				} else {
					value.customer = $scope.customer.id;
					$http({
						method: 'POST',
						url: '/api/ContactMan/',
						data: value,
						headers : { 'Content-Type': 'application/json' }
					}).success(function(data){
						value.id = data.id;
					})
				}
			})
		} else {
			$http({
				method: 'POST',
				url: '/api/Customers/',
				data: $scope.customer,
				headers : { 'Content-Type': 'application/json' }
			})
			.success(function(data){
				$scope.customer.id = data.id;
				angular.forEach($scope.contactMans, function(value, key){
					value.customer = data.id;
					$http({
						method: 'POST',
						url: '/api/ContactMan/',
						data: value,
						headers : { 'Content-Type': 'application/json' }
					}).success(function(data){
						console.log(data);
					})
				})
                $scope.$parent.form.$pristine = true
				$rootScope.addAlert('לקוח נשמר בהצלחה', 'success')
			})
			.error(function(data){
				$rootScope.addAlert('התרחשה שגיאה, נסה שוב מאוחר יותר', 'danger')
			})
		}
	}
}])
