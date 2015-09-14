app.controller('loginCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
	//init
	$http.get('/is-authenticated/')
	.success(function(data, status, headers, config){
		if(data.state == 'authorized'){
			$state.go('dashboard')
		}
	})
	.error(function(data, status, headers, config){

	})

	//function
	$scope.login = function(){
		$http.post('/rest-auth/login/', {
			'username': $scope.username,
			'password': $scope.password
		})
		.success(function(data, status, headers, config){
			$state.go('dashboard');
		})
		.error(function(data, status, headers, config){
			alert('User or password incorrect')
		})
	}
}]);

app.controller('dashboardCtrl', ['$scope', '$rootScope', '$http', '$state', '$modal', 'objectsService', function($scope, $rootScope, $http, $state, $modal, objectsService){
	//init
	$scope.menus = [{
		name: 'מסך רכז',
		//link: 'main.deliveries',
		click: function(){

			$rootScope.gotoPage('main.deliveries')
		},
		icon: 'delivery.png'
	}, {
		name: 'מסך פקיד',
		//link: 'main.newDelivery',
		click: function(){
			$state.go('main.newDelivery')
			//$rootScope.gotoPage('main.newDelivery')
		},
		icon: 'new-delivery.png'
	}, {
		name: 'לקוחות',
		//link: 'main.newCustomer',
		click: function(){
			$rootScope.gotoPage('main.newCustomer')
		},
		icon: 'customers.png'
	}, {
		name: 'עובדים',
		//link: 'main.newEmployee',
		click: function(){
			$rootScope.gotoPage('main.newEmployee')
		},
		icon: 'deliver-man.png'
	},/* {
		name: 'ערים',
		link: 'main.cities',
		icon: 'cities.png'
	}, {
		name: 'מחירונים',
		click: function(){
			$rootScope.gotoPage('main.priceList')
		},
		//link: 'main.priceList',
		icon: 'pricelist.png'
	}, */{
		name: 'טבלאות',
		//link: 'main-small.tables',
		click: function(){
			//$rootScope.gotoPage('main-small.tables')
			var modalInstance = $modal.open({
				animation: true,
				templateUrl: '/static/partials/modals/tablesList.html',
				controller: function($scope, $modalInstance){

					$scope.menus = {
						main: [{
							title: 'מחירונים',
							click: function(){
								$scope.currMenu = $scope.menus.priceLists
							}
						}, {
							title: 'טבלאות בחירה',
							click: function(){
								$scope.currMenu = $scope.menus.tables;
							}
						}, {
							title: 'ניהול',
							click: function(){
								$scope.currMenu = $scope.menus.manage;
							}
						}],
						priceLists: [{
							title: 'חזור',
							click: function(){
								$scope.currMenu = $scope.menus.main;
							}
						}, {
							title: 'מחירון יעדים',
							click: function(){
								$rootScope.showLoader = true;
								$modalInstance.close()
								$rootScope.gotoPage('main.priceList')
							}
						}, {
							title: 'מחירון דחיפויות',
							click: function(){
								$modalInstance.close()
								$rootScope.gotoPage('main.tables', {tableName: 'UrgencyList'})
							}
						}, {
							title: 'מחירון כפולות',
							click: function(){
								$modalInstance.close()
								$rootScope.gotoPage('main.tables', {tableName: 'DoubleTypeList'})
							}
						}],
						tables: [{
							title: 'חזור',
							click: function(){
								$scope.currMenu = $scope.menus.main;
							}
						}, {
							title: 'סוגי משלוח',
							click: function(){
								$modalInstance.close()
								$rootScope.gotoPage('main.tables', {tableName: 'VehicleTypes'})
							}
						}, {
							title: 'סטטוסים',
							click: function(){
								$modalInstance.close()
								$rootScope.gotoPage('main.tables', {tableName: 'Status'})
							}
						}, {
							title: 'תפקידים',
							click: function(){
								$modalInstance.close()
								$rootScope.gotoPage('main.tables', {tableName: 'Jobs'})
							}
						}],
						manage: [{
							title: 'צי רכב',
							click: function(){
								$modalInstance.close();
								$rootScope.gotoPage('main.tables', {tableName: 'VehicleCalander'})
							}
						}]
					}

					$scope.currMenu = $scope.menus['main']

					$scope.close = function(){
						$modalInstance.close();
					}

					$scope.closeAndGoTo = function(page){
						$modalInstance.close()
						$rootScope.gotoPage(page)
					}

					/*$scope.openPrices = function(){
						$modalInstance.close();
						$modal.open({
							templateUrl: '/static/partials/modals/priceListTables.html',
							size: 'sm',
							animation: true,
							controller: function($scope, $modalInstance){
								$scope.close = function(){
									$modalInstance.close()
								}
							}
						})
					}*/
				},
				size: 'sm'
			});
		},
		icon: 'tables.png'
	}, {
		name: 'משלוחים קבועים',
		//link: 'main.newRegularDelivery',
		click: function(){
			$rootScope.gotoPage('main.newRegularDelivery')
		},
		icon: 'regularDelivery.png'
	}, {
		name: 'אתרים קבועים',
		//link: 'main.regularSites',
		click: function(){
			$rootScope.gotoPage('main.regularSites')
		},
		icon: 'regularSites.png'
	}]

	$http.get('/api/Delivery/').success(function(data){
		$scope.deliveries = data;
	})

	$scope.notifications = [{
		type: 'רשינות',
		content: 'הרשיון של דני פג בעוד 20 יום',
		color: '#27ae30'
	}, {
		type: 'משלוחים',
		content: 'משלוח 20 מאחר בחצי שעה',
		color: '#ae6d27'
	}, {
		type: 'הודעה',
		content: 'בלה בלה בלה',
		color: '#0ab0f6'
	}]

	/*$q.all(prom).then(function(data){
		console.log(prom, data)
	})*/
	//functions

	$scope.showRecord = function(event){
		$rootScope.showLoader = true;
		id = event.currentTarget.dataset['id'];
		$state.go('main.delivery', {id: id})
	}
}])

app.controller('mainCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state){
	//init
	$scope.menus = {
		main: [{
			title: 'מחירונים',
			link: 'main.priceList'
		}, {
			title: 'סבבים קבועים',
			link: 'main.newRegularDelivery'
		}],
		commands: [{
			title: 'משלוחים',
			link: 'main.deliveries'
		}, {
			title: 'לקוחות',
			link: 'main.newCustomer'
		}, {
			title: 'משלוח חדש',
			link: 'main.newDelivery'
		},{
			title: 'עובד חדש',
			link: 'main.newEmployee'
		}],
		tables: [{
			title: 'תפקידים',
			link: 'main-small.tables'
		}]
	}

	//functions
}])

app.controller('citiesCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
	//init
	$rootScope.currMenu = 'main'
	$rootScope.currTable = "ערים"
	$rootScope.currPage = 'main.cities'

	//functions
}])


app.controller('alertCtrl', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout){
	$scope.alerts = [];

	$scope.closeAlert = function() {
		$scope.alerts.splice($scope.alerts.length-1, 1)
	};

	$rootScope.addAlert = function(msg, type){
		$scope.alerts.push({msg: msg, type: type})
		$timeout(function(){
			$scope.closeAlert()
		}, 5000)
	}
}])


app.controller('priceListCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
	//init
	$rootScope.currPage = 'main.priceList';
	$rootScope.currMenu = 'main'
	$rootScope.showLoader = true;
	$rootScope.currTable = 'מחירונים';

	$http.get('/api/PriceList/').success(function(data){
		$scope.priceLists = data;
		//$scope.currPriceList = data[0];
		$scope.currPriceList = 0;
		$rootScope.showLoader = false;
	})


	//functions
	$scope.addEntry = function(){
		if($scope.priceLists[$scope.currPriceList].id){
			$scope.priceLists[$scope.currPriceList].entries.push({'list': $scope.priceLists[$scope.currPriceList].id})
		} else {
			$scope.priceLists[$scope.currPriceList].entries.push({})
		}
	}

	$scope.deleteEntry = function(index){
		$rootScope.showLoader = true;
		$http({
			method: 'DELETE',
			url: '/api/PriceListEntryUpdate/' + $scope.priceLists[$scope.currPriceList].entries[index].id
		}).success(function(data){
			$scope.priceLists[$scope.currPriceList].entries.splice(index, 1);
			$rootScope.showLoader = false;
		}).error(function(data){
			$rootScope.showLoader = false;
		})
	}

	$scope.addList = function(){
		$scope.priceLists.push({'entries': []})
		$scope.currPriceList = $scope.priceLists.length - 1;
		$scope.priceLists[$scope.currPriceList].name = '[הכנס שם]'
	}

	$scope.removeList = function(){
		$rootScope.showLoader = true;
		$http({
			method: 'DELETE',
			url: '/api/PriceListUpdate/' + $scope.priceLists[$scope.currPriceList].id,
			headers : { 'Content-Type': 'application/json' }
		}).success(function(data){
			$scope.priceLists.splice($scope.currPriceList, 1);
			if($scope.priceLists.length == 0){
				$scope.addList()
			}
			$scope.currPriceList--;
			$rootScope.showLoader = false;
		}).error(function(data){
			$rootScope.showLoader = false;
		})
	}

	$scope.nextList = function(){
		if($scope.currPriceList >= $scope.priceLists.length - 1){
			console.log("disabled");
			return;
		}
		$scope.currPriceList++;
	}

	$scope.backList = function(){
		if($scope.currPriceList==0){
			console.log("disabled")
			return;
		}
		$scope.currPriceList--;
	}

	$scope.submitPriceList = function(){
		$rootScope.showLoader = true;
		if(!$scope.priceLists[$scope.currPriceList].id){
			$http({
				method: 'POST',
				data: {'name': $scope.priceLists[$scope.currPriceList].name, 'client': 1},
				url: '/api/PriceList/',
				headers : { 'Content-Type': 'application/json' }
			}).success(function(data){
				angular.forEach($scope.priceLists[$scope.currPriceList].entries, function(value, key){
					value.list = data.id
				})
				$scope.submitEntries()
				$rootScope.showLoader = false;
			}).error(function(data){
				$rootScope.showLoader = false;
			})
		} else {
			$http({
				method: 'PUT',
				data: {'name': $scope.priceLists[$scope.currPriceList].name, 'client': 1},
				url: '/api/PriceListUpdate/' + $scope.priceLists[$scope.currPriceList].id,
				headers : { 'Content-Type': 'application/json' }
			}).success(function(data){
				$scope.submitEntries();
				$rootScope.showLoader = false;
			}).error(function(data){
				$rootScope.showLoader = false;
			})
		}
	}

	$scope.submitEntries = function(){
		angular.forEach($scope.priceLists[$scope.currPriceList].entries, function(value, key){
			if(value.id){
				$http({
					method: 'PUT',
					data: value,
					url: '/api/PriceListEntryUpdate/' + value.id,
					headers : { 'Content-Type': 'application/json' }
				})
			} else {
				value['client'] = 1
				$http({
					method: 'POST',
					data: value,
					url: '/api/PriceListEntry/',
					headers : { 'Content-Type': 'application/json' }
				})
			}
		})
	}
}])

app.controller('popupCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
	//init
	//functions
	$scope.close = function(){
		$rootScope.showPopup = false;
	}
}])
