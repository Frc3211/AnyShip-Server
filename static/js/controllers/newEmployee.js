app.controller('newEmployeeCtrl', ['$scope', '$rootScope', '$http', '$state', '$filter', function($scope, $rootScope, $http, $state, $filter){
	//init
	$rootScope.currMenu = 'commands';
	$rootScope.currTable = "עובד חדש"
	$rootScope.currPage = 'main.newEmployee'

	$http({
		method: 'GET',
		url: '/api/Employee/'
	}).success(function(data){
		$scope.employees = data;
	})

	$scope.genderOptions = [{
		title: 'זכר',
		value: 'TRUE'
	}, {
		title: 'נקבה',
		value: 'FALSE'
	}]

	//functions
	$scope.selectEmployee = function(){
		$http({
			method: 'GET',
			url: '/api/Employee/' + $scope.selectedEmployee.id
		}).success(function(data){
			$scope.employee = data;
		})
	}

	$scope.deleteEmployee = function(){
		$http({
			method: 'DELETE',
			url: '/api/Employee/' + $scope.employee.id
		}).success(function(){
			for (var i = $scope.employees.length - 1 ; i >= 0 ; i--){
				var obj = $scope.employees[i];

				if($scope.employee.id == $scope.employees[i].id){
					$scope.employees.splice(i, 1);
				}
			}
			$scope.employee = {}

			$rootScope.addAlert('עובד נמחק בהצלחה', 'success')
		}).error(function(){
			$rootScope.addAlert('התרחשה שגיאה, נסה שוב מאוחר יותר', 'danger')
		})
	}

	$scope.newEmployee = function(){
		$scope.employee = {}
		$scope.selectedEmployee = 0;
	}

	$scope.newEmployee = function(){
		$scope.employee = {}
	}

	$scope.submit = function(){
		$scope.employee.startDate = $filter('date')($scope.employee.startDate, 'yyyy-MM-dd');
		$scope.employee.endDate = $filter('date')($scope.employee.endDate, 'yyyy-MM-dd');
		$scope.employee.licenseExp = $filter('date')($scope.employee.licenseExp, 'yyyy-MM-dd');
		$scope.employee.birthDate = $filter('date')($scope.employee.birthDate, 'yyyy-MM-dd');
		if($scope.employee.id){
			$http({
				method: 'PUT',
				url: '/api/Employee/' + $scope.employee.id,
				data: $scope.employee,
				headers : { 'Content-Type': 'application/json' }
			}).success(function(){
				$rootScope.addAlert('עובד נשמר בהצלחה', 'success')
			})
		} else {
			$http({
				method: 'POST',
				url: '/api/Employee/',
				data: $scope.employee,
				headers : { 'Content-Type': 'application/json' }
			}).success(function(){
				$rootScope.addAlert('עובד נשמר בהצלחה', 'success')
			})

		}
	}
}])
