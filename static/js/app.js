var app = angular.module('anyShip', ['ui.bootstrap', 'ui.router', 'ngCookies', 'ngSanitize', 'ngDialog', 'ui.select']);

app.config([ '$stateProvider', '$urlRouterProvider', '$httpProvider', '$interpolateProvider',
	function($stateProvider, $urlRouterProvider, $httpProvider, $interpolateProvider){
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

		$urlRouterProvider

		.otherwise('/dashboard');

		$stateProvider
			.state('dashboard', {
				url: '/dashboard',
				templateUrl: 'static/partials/dashboard.html',
				resolve: {
					'tablesServiceData': function(tablesService){
						return tablesService['VehicleTypes'].promise;
					},
					/*objectsServiceData: function(objectsService){
						return objectsService['customers'].promise;
					}*/
				}
			})
			.state('login', {
			    url: '/login',
			    templateUrl: 'static/partials/login.html',
			})
			.state('main', {
				url: 'main',
				templateUrl: 'static/partials/main.html'
			})
			.state('main.newDelivery',{
				url: '/newDelivery',
				templateUrl: 'static/partials/newDelivery.html',
				//controller: newDeliveryCtrl
			})
			.state('main.delivery', {
				url: '/delivery/:id',
				templateUrl: 'static/partials/newDelivery.html',
				//controller: deliveryCtrl
			})
			.state('main.deliveries', {
				url: '/deliveries',
				templateUrl: 'static/partials/deliveries.html',
				//controller: deliveriesCtrl
			})
			.state('main.newCustomer', {
				url: '/newCustomer',
				templateUrl: 'static/partials/newCustomer.html'
			})
			.state('main.newEmployee', {
				url: '/newEmployee',
				templateUrl: 'static/partials/newEmployee.html'
			})
			.state('main.cities', {
				url: '/cities',
				templateUrl: 'static/partials/cities.html'
			})
			.state('main.priceList', {
				url: '/priceList',
				templateUrl: 'static/partials/priceList.html'
			})
			.state('main.newRegularDelivery',{
				url: '/newRegularDelivery',
				templateUrl: 'static/partials/regularDelivery.html'
			})
			.state('main.regularDelivery', {
				url: '/regularDelivery/:id',
				templateUrl: 'static/partials/regularDelivery.html'
			})
			.state('main.regularSites', {
				url: '/regularSites',
				templateUrl: 'static/partials/regularSites.html'
			})
			/*.state('main-small', {
				url: '/main-small',
				templateUrl: 'static/partials/main-small.html'
			})*/
			.state('main.tables', {
				url: '/tables/:tableName',
				templateUrl: 'static/partials/tables.html'
			})
	}
])

app.run(['$state', '$rootScope', '$http', '$modal', function($state, $rootScope, $http, $modal){
	$rootScope.showLoader = true;
	$rootScope.$on('$stateChangeStart', function(event, toState){
		if(toState.name != 'login'){
		$http.get('/is-authenticated/')
			.success(function(data, status, headers, config){
				if(data.state == 'unauthorized'){
					$state.go('login')
				}
				else if(!$rootScope.user){
					$rootScope.user = {}
				}

				$rootScope.user.name = data.user.name;
			})
			.error(function(){
				$state.go('login');
			})
		}
	})

	$http.get('/api/Cities/').success(function(data){
		$rootScope.cities = data;
	})

	$http.get('/api/VehicleTypes/').success(function(data){
		$rootScope.vehicles = data;
	})

	/*$http.get('/api/DeliveryStatus/').success(function(data){
		$rootScope.deliveryStatuses = data;
	})*/

	$http.get('/api/Status/').success(function(data){
		$rootScope.Statuses = data;
	})

	$http.get('/api/Jobs').success(function(data){
		$rootScope.jobs = data;
	})

	$http.get('/api/Banks').success(function(data){
		$rootScope.banks = data;
	})

	$rootScope.showLoader = false;

	$rootScope.goToHome = function(){
		var form = angular.element('form')
		if(form.length == 0){
			$state.go('dashboard');
		} else {
			if(!form.scope().form.$pristine){
				var modalInstance = $modal.open({
					animation: true,
					templateUrl: '/static/partials/modals/yesNoWindow.html',
					controller: function($scope, $modalInstance){
						$scope.close = function(){
							$modalInstance.close();
						}

						$scope.msg = "יש שינויים שלא נשמרו, האם אתה בטוח שברצונך לצאת?";
						$scope.title = "אזהרה"

						$scope.yes = function(){
							form.scope().form.$pristine = true;
							$state.go('dashboard');
							$modalInstance.close();
						}

						$scope.no = function(){
							$modalInstance.close();
						}
					},
					size: 'sm'
				});
			} else {
				$state.go('dashboard');
			}
		}
		/*if($rootScope.formHasChanges){
			var modalInstance = $modal.open({
				animation: true,
				templateUrl: '/static/partials/modals/yesNoWindow.html',
				controller: function($scope, $modalInstance){
					$scope.close = function(){
						$modalInstance.close();
					}

					$scope.msg = "יש שינויים שלא נשמרו, האם אתה בטוח שברצונך לצאת?";
					$scope.title = "אזהרה"

					$scope.yes = function(){
						$modalInstance.close();
						$state.go('dashboard');
						$rootScope.formHasChanges = false;
					}

					$scope.no = function(){
						$modalInstance.close();
					}
				},
				size: 'sm'
			});
		} else {
			$state.go('dashboard');
		}*/
	}

	$http.get('/api/MinCustomers/').success(function(data){
		$rootScope.customersList = data;
	})

	$rootScope.gotoPage = function(page, params){
		$state.go(page, params)
	}

	$rootScope.deliveryStatuses = [{
		id: 0,
		name: 'פתוח'
	}, {
		id: 1,
		name: 'הועבר לשליח'
	}, {
		id: 2,
		name: 'חזר מכפולה'
	}, {
		id: 3,
		name: 'מבוטל'
	}, {
		id: 4,
		name: 'בהמתנה'
	}, {
		id: 5,
		name: 'נאסף'
	}, {
		id: 6,
		name: 'בוצע'
	}, {
		id: 7,
		name: 'שליח שני'
	}]
	/*
	$rootScope.findCustomerById = function(id){
		angular.forEach($rootScope.customers, function(value){
			console.log(value.id, id)
			if(value.id == id){
				console.log("value", value, "id", id)
				return value
			}
		})

		return {}
	}*/
}]);

/*app.filter('time', function(){
	return function(input){
		if(input == null)
			return input
		return input.split(":", 2).join(":")
	}
})*/

app.filter('urgency', function(){
	return function(input){
		if (input == 0){
			return 'רגיל'
		} else if(input == 1){
			return 'דחוף'
		} else if(input == 2){
			return 'דחוף מאוד'
		}
	}
})

app.filter('isDouble', function(){
	return function(input){
		switch(input){
			case 0:
				return 'רגיל'
			case 1:
				return 'כפול'
		}
	}
})

app.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});

app.directive('dragable', function(){
	return {
		restrict: 'A',
		link: function(scope, elem, attr){
			$(elem).draggable();
		}
	}
})
