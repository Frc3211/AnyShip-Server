app.controller('loginCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
	//init
	$http.get('http://95.85.43.135/is-authenticated/')
		.success(function(data, status, headers, config){
			if(data.state == 'authorized'){
				$state.go('dashboard')
			}
		})
		.error(function(data, status, headers, config){

		})
	
	//function
	$scope.login = function(){
		$http.post('http://95.85.43.135/rest-auth/login/', {
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

app.controller('dashboardCtrl', ['$scope', '$rootScope', '$http', '$state', function($scope, $rootScope, $http, $state){
	//init
	$scope.menus = [{
		name: 'משלוחים',
		link: 'main.deliveries',
		icon: 'delivery.png'
	}, {
		name: 'משלוח חדש',
		link: 'main.newDelivery',
		icon: 'new-delivery.png'
	}, {
		name: 'לקוח חדש',
		link: 'main.newCustomer',
		icon: 'customers.png'
	}, {
		name: 'עובד חדש',
		link: 'main.newEmployee',
		icon: 'deliver-man.png'
	},/* {
		name: 'ערים',
		link: 'main.cities',
		icon: 'cities.png'
	}, */{
		name: 'מחירונים',
		link: 'main.priceList',
		icon: 'pricelist.png'
	}, {
		name: 'טבלאות',
		link: 'main-small.tables',
		icon: 'tables.png'
	}]
	
	$http.get('/api/Delivery/').success(function(data){
		$scope.deliveries = data;
	})
	
	
	//functions	
	$scope.gotoPage = function(page){
		$state.go(page)
	}
}])

app.controller('mainCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state){
	//init
	$scope.menus = {
		main: [{
			title: 'מחירונים',
			link: 'main.priceList'
		}, {
			title: 'ערים',
			link: 'main.cities'
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
	$scope.goTo = function($event){
		$state.go($event.target.dataset.link)
	} 
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
				console.log(data);
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
			})
			.error(function(data){
				console.log(data)
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
	
	//functions
	$scope.selectEmployee = function(){
		$http({
			method: 'GET',
			url: '/api/Employee/' + $scope.selectedEmployee.id
		}).success(function(data){
			$scope.employee = data;
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
			})
		} else {
			$http({
				method: 'POST',
				url: '/api/Employee/',
				data: $scope.employee,
				headers : { 'Content-Type': 'application/json' }
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

app.controller('newDeliveryCtrl', ['$scope', '$rootScope', '$http', '$filter', function($scope, $rootScope, $http, $filter){
	//init
	$rootScope.currMenu = 'commands';
	$scope.delivery = {}
	
	$scope.delivery.time = new Date();
	$scope.delivery.date = new Date();
	$scope.customerIndex = 0;
	
	$http.get('/api/Customers/').success(function(data){
		$scope.customers = data;
	})
	
	$http.get('/api/Delivery/').success(function(data){
		$scope.deliveries = data;
	})
	
	$rootScope.currPage = 'main.newDelivery'
	$rootScope.currTable = "משלוח חדש"
	
	$http({
		method: 'GET',
		url: '/api/UrgencyList/'
	}).success(function(data){
		$scope.urgs = data;
		$scope.delivery.urgency = $scope.urgs[0].id;
	})
	
	$http({
		method: 'GET',
		url: '/api/DoubleTypeList/'
	}).success(function(data){
		$scope.doubles = data;
		$scope.delivery.doubleType = $scope.doubles[0].id;
	})
	
	$scope.delivery.numOfPackages = 0;
	$scope.delivery.numOfBoxes = 0;
	$scope.delivery.waiting = 0;
	$scope.delivery.status = $rootScope.deliveryStatuses[0].id;
	
	
	//functions
	$scope.selectDelivery = function(){
		$http({
			method: 'GET',
			url: '/api/Delivery/' + $scope.selectedDelivery.id
		}).success(function(data){
			$scope.delivery = data;
		})
	}
	
	$scope.newDelivery = function(){
		$scope.delivery = {}
		$scope.selectedDelivery = 0;
	}
	
	$scope.submitDelivery = function(){
		$scope.delivery.date = $filter('date')($scope.delivery.date, 'yyyy-MM-dd')
		$scope.delivery.time = $filter('date')($scope.delivery.time, 'HH:mm')
		$scope.delivery.rakazTime = $filter('date')($scope.delivery.rakazTime, 'HH:mm')
		$scope.delivery.exeTime = $filter('date')($scope.delivery.exeTime, 'HH:mm')
		$scope.delivery.estTime = $filter('date')($scope.delivery.estTime, 'HH:mm')
		
		$http({
			method: 'POST',
			url: '/api/newDelivery/',
			data: $scope.delivery,
			headers : { 'Content-Type': 'application/json' }
		})
		.success(function(data){
			alert("המשלוח הוזן!")
		})
		.error(function(data){
			alert("שגיאה!")
		})
	}
	
	$scope.change = function(){
		switch($scope.delivery.type){
			case '0':
				$scope.delivery.sender = $scope.delivery.customer;
				break;
			case '1':
				$scope.delivery.receiver = $scope.delivery.customer;
				break;
			case '2':
				console.log(2)
				break;
		}
	}
	
	$scope.getPrice = function(){
		if($scope.delivery.customer == undefined | $scope.delivery.urgency == undefined | $scope.delivery.sourceCity == undefined | $scope.delivery.destCity == undefined){
			alert("חסרים נתונים");
			return
		}
		
		$rootScope.price = {}
		$rootScope.price.urgency = $.grep($scope.urgs, function(e){ return e.id == $scope.delivery.urgency; })[0].multiplier;
		$rootScope.price.double = $.grep($scope.doubles, function(e){ return e.id == $scope.delivery.doubleType ;})[0].multiplier;

		$rootScope.showLoader = true;
		
		$http({
			method: 'GET',
			url: '/api/getPrice/' + $scope.delivery.customer + '/' + $scope.delivery.sourceCity + '/' + $scope.delivery.destCity
		}).success(function(data){
			$rootScope.price.multiForPackage = data[0].multiForPackage;
			$rootScope.price.multiForBox = data[0].multiForBox;
			$rootScope.price.addForWaiting = data[0].waiting;
			$rootScope.price.basicPrice = data[0].price;
			
			
			$rootScope.price.packages = $scope.delivery.numOfPackages;
			$rootScope.price.boxes = $scope.delivery.numOfBoxes;
			$rootScope.price.waiting = $scope.delivery.waiting;
			$rootScope.price.afternoon = 0;
			
			console.log($rootScope.price);
			$rootScope.showPopup = true;
			$rootScope.showLoader = false;
			
			$rootScope.price.total = $rootScope.price.urgency * $rootScope.price.basicPrice + ($rootScope.price.multiForPackage * $rootScope.price.packages) + ($rootScope.price.multiForBox * $rootScope.price.boxes) + ($rootScope.price.addForWaiting * $rootScope.price.waiting);
		}).error(function(data){
			$rootScope.showLoader = false;
			alert("לא הוזן מחירון למסלול זה")
		})
	}
}])
var newDeliveryCtrl = function($scope, $rootScope, $http, $filter){
	
}

var deliveryCtrl = function($scope, $rootScope, $stateParams, $http){
	//init
	$http({
		method: 'GET',
		url: '/api/Delivery/' + $rootScope.idToShow
	}).success(function(data){
		$scope.delivery = data
	})
	
	$http({
		method: 'GET',
		url: '/api/UrgencyList/'
	}).success(function(){
		$scope.urgs = data;
	})
	
	$http({
		method: 'GET',
		url: '/api/DoubleTypeList/'
	}).success(function(data){
		$scope.doubles = data;
	})
	
	//functions
}

var deliveriesCtrl = function($scope, $rootScope, $http, $state){
	//init
	$rootScope.currMenu = 'commands';
	$rootScope.showLoader = true;
	$rootScope.currPage = 'main.deliveries'
	
	$http.get('/api/Delivery/').success(function(data){
		$scope.records = data
		$rootScope.showLoader = false;
		console.log(data);
	})
	
	$rootScope.currTable = "מעקב משלוחים - מוצא / יעד"

	$scope.table = {}
	$scope.table.name = 'מעקב משלוחים - מוצא / יעד'
	$scope.table.columns = [{
		name: 'קבלה',
		width: 10
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
		name: 'שם אוסף',
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
			$scope.filterUrgency = !$scope.filterUrgency;
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
		icon: 'future.png',
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
		}
	}, {
		title: 'באיחור',
		icon: 'lates.png',
		method: function(){
			$scope.zeroFilters()
		}
	}]
	
	//functions
	$scope.filterDeliveries = function(item){
		if(!item.status){
			return false;
		}
		return (!$scope.filterUrgency || (item.urgency.name != 'רגיל')) && (!$scope.filterDoubles || (item.doubleType.name != 'לא'))
	}
	
	$scope.zeroFilters = function(){
		$scope.filterUrgency 	= false;
		$scope.filterDoubles 	= false;
		$scope.filterFutures 	= false;
		$scope.filterTommorow 	= false;
		$scope.filterSpecial 	= false;
		$scope.filterDones 		= false;
		$scope.filterLates 		= false;
		$scope.filterInTransit 	= false;
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
	}
	
	$scope.showRecord = function(event){
		$rootScope.idToShow = event.currentTarget.dataset['id'];
		$state.go('main.delivery')
	}
}



app.controller('priceListCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
	//init
	$rootScope.currPage = 'main.priceList';
	$rootScope.currMenu = 'main'
	$rootScope.showLoader = true;
	
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
		console.log($scope.priceLists)
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
			console.log($scope.currPriceList);
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

app.controller('tablesCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
	//init
	$scope.tables = [{
		title: 'סטטוסים',
		fields: ['שם'],
		name: 'Status'
	}, {
		title: 'תפקידים',
		fields: ['שם'],
		name: 'Jobs'
	}, {
		title: 'סטטוסי משלוח',
		fields: ['שם'],
		name: 'DeliveryStatus'
	}]
	
	$scope.currTable = $scope.tables[2];
	
	$http({
		method: 'GET',
		url: '/api/' + $scope.currTable.name
	}).success(function(data){
		$scope.rows = data;
	})
	
	
	//functions
}])