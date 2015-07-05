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

app.controller('dashboardCtrl', ['$scope', '$rootScope', '$http', '$state', '$modal', function($scope, $rootScope, $http, $state, $modal){
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
			$rootScope.gotoPage('main.newDelivery')
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
							title: 'טבלאות',
							click: function(){
								$scope.currMenu = $scope.menus.tables;
							}
						}],
						priceLists: [{
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
							title: 'סוגי משלוח',
							click: function(){
								$modalInstance.close()
								$rootScope.gotoPage('main.tables', {tableName: 'VehicleTypes'})
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

app.controller('newCustomerCtrl', ['$scope', '$rootScope', '$http', '$state', '$filter', 'dateFilter', function($scope, $rootScope, $http, $state, $filter, dateFilter){
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
	$scope.selectCustomer = function(){
		$http({
			method: 'GET',
			url: '/api/Customers/' + $scope.selectedCustomer.id
		}).success(function(data){
			$scope.customer = data;
			$scope.contactMans = data.contact_man;
		})
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
		$scope.customer = {}
		$scope.selectedCustomer = 0;
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

				$rootScope.addAlert('לקוח נשמר בהצלחה', 'success')
			})
			.error(function(data){
				$rootScope.addAlert('התרחשה שגיאה, נסה שוב מאוחר יותר', 'danger')
			})
		}
	}
}])

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

app.controller('deliveriesCtrl', ['$scope', '$rootScope', '$http', '$state', 'ngDialog', function($scope, $rootScope, $http, $state, ngDialog){
	//init
	$rootScope.currMenu = 'commands';
	$rootScope.showLoader = true;
	$rootScope.currPage = 'main.deliveries'
	$scope.records = [];

	$http.get('/api/LastDeliveries/').success(function(data){
		$scope.records = $scope.records.concat(data);
		$rootScope.showLoader = false;
	})

	$http.get('/api/LastRegularDeliveries/').success(function(data){
		$scope.records = $scope.records.concat(data);
	})

	$http.get('/api/Employee/').success(function(data){
		$scope.employees = data;
	})

	$rootScope.currTable = "מעקב משלוחים - מוצא / יעד"

	$scope.table = {}
	$scope.table.name = 'מעקב משלוחים - מוצא / יעד'
	$scope.table.columns = [{
		name: 'קבלה',
		width: 8
	}, {
		name: 'שם הלקוח',
		width: 13
	}, {
		name: 'כתובת מוצא',
		width: 13
	}, {
		name: 'כתובת יעד',
		width: 13
	}, {
		name: 'דחף',
		width: 7
	}, {
		name: 'כמה',
		width: 7
	}, {
		name: 'שליח אוסף',
		width: 9
	}, {
		name: 'שליח מוסר',
		width: 9
	}, {
		name: 'סטטוס',
		width: 14
	}]

	$scope.filters = [{
		title: 'הכל',
		icon: '',
		method: function(){
			$scope.zeroFilters()
		}
	}, {
		title: 'דחופים',
		icon: 'urgent.png',
		method: function(){
			$scope.zeroFilters()
			$scope.filterUrgency = true;
		}
	}, {
		title: 'כפול',
		icon: 'doubles.png',
		method: function(){
			$scope.zeroFilters()
			$scope.filterDoubles = true;
		}
	}, {
		title: 'עתידיות',
		icon: 'futures.png',
		method: function(){
			$scope.zeroFilters()
		}
	}, {
		title: 'מיוחד',
		icon: 'special.png',
		method: function(){
			$scope.zeroFilters()
		}
	}, {
		title: 'מבוצעות',
		icon: 'ended.png',
		method: function(){
			$scope.zeroFilters()
			$scope.filterDones = true;
		}
	}, {
		title: 'באיחור',
		icon: 'lates.png',
		method: function(){
			$scope.zeroFilters()
		}
	}, {
		title: 'למחר',
		icon: 'isTomorrow',
		method: function(){
			$scope.zeroFilters();
			$scope.filterTomorrow = true;
		}
	}, {
		title: 'מותאם אישית',
		icon: 'opens.png',
		method: function(){
			$scope.zeroFilters()
			$scope.popup();
		}
	}]

	//functions
	$scope.popup = function(){
		ngDialog.open({
			template: 'static/partials/popup.html',
			scope: $scope,
			controller: ['$scope', function($scope){
				$scope.customFilters = [{
					name: 'לקוח',
					filterName: 'filterCustomer'
				}]
			}]
		})
	}

	$scope.change = function(record, fieldName, id){
		console.log('changing', record, fieldName)
		var data = {}
		data[fieldName] = id
		if(record.hasOwnProperty('isSunday')){
			$http({
				method: 'PUT',
				url: '/api/RegularDelivery/' + record.id,
				data: data,
				headers : { 'Content-Type': 'application/json' }
			}).success(function(data){
				//console.log(data)
			})
		} else {
			$http({
				method: 'PUT',
				url: '/api/updateDelivery/' + record.id,
				data: data,
				headers : { 'Content-Type': 'application/json' }
			}).success(function(data){
				//console.log(data)
			})
		}
	}

	$scope.filterDeliveries = function(item){
		if(!item.status){
		//	return false;
		}
		//console.log(item)
		return (!$scope.filterUrgency || item.urgency.name != 'רגיל') &&
			(!$scope.filterDoubles || item.doubleType.name != 'רגיל')	&&
			//(!$scope.filterFutures || ) &&
			(!$scope.filterTomorrow || item.isTomorrow == true) &&
			(!$scope.filterDones || item.status == 0) &&
			(!$scope.filterOpenes || item.status == 6) &&
			// filterLates
			// filterSpecial
			// filterInTransit
			(!$scope.filterCustomer || item.customer.id == $scope.filterCustomerData)
	}

	$scope.zeroFilters = function(){
		$scope.filterUrgency 	= false;
		$scope.filterDoubles 	= false;
		$scope.filterFutures 	= false;
		$scope.filterTomorrow 	= false;
		$scope.filterDones 		= false;
		$scope.filterOpenes 	= false;
		$scope.filterLates 		= false;
		$scope.filterSpecial 	= false;
		$scope.filterInTransit 	= false;
		$scope.filterCustomer 	= false;
		// קבלנים
		// זהב
	}

	$scope.tooltip = function($event){
		if($event.target.offsetWidth < $event.target.scrollWidth){
			angular.element($event.target).addClass('tooltip')
		}
	}

	$scope.selectRecord = function(id){
		$scope.currRecord = $scope.records[id]
		console.log($scope.currRecord)
	}

	$scope.showRecord = function(event, record){
		id = event.currentTarget.dataset['id'];
		if(record.hasOwnProperty('isSunday')){
			$state.go('main.regularDelivery', {id: id})
		} else {
			$state.go('main.delivery', {id: id})
		}


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

app.controller('tablesCtrl', ['$scope', '$rootScope', '$http', '$state', function($scope, $rootScope, $http, $state){
	//init
	$scope.tables = {
		VehicleTypes: {
			fields: [{
				title: 'כלי רכב',
				name: 'name'
			}, {
				title: 'מחיר',
				name: 'price'
			}],
			name: 'VehicleTypes',
			title: 'סוגי משלוח'
		},
		UrgencyList: {
			fields: [{
				title: 'דחיפות',
				name: 'name'
			}, {
				title: 'מכפיל',
				name: 'multiplier'
			}],
			name: 'UrgencyList',
			title: 'מחירון דחיפויות'
		},
		DoubleTypeList: {
			fields: [{
				title: 'כפולה',
				name: 'name'
			}, {
				title: 'מכפיל',
				name: 'multiplier'
			}],
			name: 'DoubleTypeList',
			title: 'מחירון כפולות'
		}
	}

	$scope.table = $scope.tables[$state.params.tableName]
	$rootScope.currTable = $scope.table.title;


	$http({
		method: 'GET',
		url: '/api/' + $scope.table.name
	}).success(function(data){
		$scope.rows = data;
	})

	$scope.deleted = []
	$scope.changed = [];
	//functions
	$scope.addEntry = function(){
		$scope.rows.push({})
	}

	$scope.deleteEntry = function(index){
		if($scope.rows[index].hasOwnProperty('id')){
			$scope.deleted.push($scope.rows[index]['id'])
		}
		$scope.rows.splice(index, 1)
	}

	$scope.changed = function(row){
		row.changed = true;
	}

	$scope.save = function(){
		angular.forEach($scope.deleted, function(value, key){
			$http({
				method: 'DELETE',
				url: '/api/' + $scope.table.name + '/' + value
			})
		})

		angular.forEach($scope.rows, function(value, key){
			if(value.id){
				if(value.changed){
					$http({
						method: 'PUT',
						url: '/api/' + $scope.table.name + '/' + value.id,
						data: value,
						headers : { 'Content-Type': 'application/json' }
					}).success(function(data){
						value.changed = false;
					})
				}
			} else {
				$http({
					method: 'POST',
					url: '/api/' + $scope.table.name + '/',
					data: value,
					headers : { 'Content-Type': 'application/json' }
				}).success(function(data){
					value.id = data.id;
				})
			}
		})
	}
}])


app.controller('regularSitesCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
	// init
	$rootScope.currTable = 'אתרים קבועים';
	$http.get('/api/RegularSite/').success(function(data){
		$scope.regularSites = data;
	})

	// functions
	$scope.save = function(){
		angular.forEach($scope.regularSites, function(obj, index){
			if(!obj.id){
				$http({
					method: 'POST',
					url: '/api/RegularSite/',
					data: obj,
					headers : { 'Content-Type': 'application/json' }
				}).success(function(data){
					$rootScope.addAlert('נשמר בהצלחה', 'success')
					obj.id = data.id
				}).error(function(data){
					$rootScope.addAlert('שגיאה, נסה שוב מאוחר יותר', 'danger')
				})
			} else if(obj.changed){
				$http({
					method: 'PUT',
					url: '/api/RegularSite/' + obj.id,
					data: obj,
					headers : { 'Content-Type': 'application/json' }
				}).success(function(data){
					obj.changed = false;
					$rootScope.addAlert('נשמר בהצלחה', 'success')
				}).error(function(data){
					$rootScope.addAlert('שגיאה, נסה שוב מאוחר יותר', 'danger')
				})
			} else {
				console.log(index + " not changed")
			}
		})
	}

	$scope.change = function(row){
		row.changed = true;
	}

	$scope.addEntry = function(){
		$scope.regularSites.push({})
	}

	$scope.deleteEntry = function(index){
		console.log($scope.regularSites[index])
		if($scope.regularSites[index].id != undefined){
			$http({
				method: 'DELETE',
				url: '/api/RegularSite/' + $scope.regularSites[index].id
			}).success(function(data){
				$rootScope.addAlert('נמחק בהצלחה', 'success')
			})
		}
		$scope.regularSites.splice(index, 1);
	}
}])
