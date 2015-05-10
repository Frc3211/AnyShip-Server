app.controller('loginCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
	$http.get('http://95.85.43.135/is-authenticated/')
		.success(function(data, status, headers, config){
			if(data.state == 'authorized'){
				$state.go('dashboard')
			}
		})
		.error(function(data, status, headers, config){

		})

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
	
	$scope.gotoPage = function(page){
		$state.go(page)
	}
	
	$http.get('/api/Delivery/').success(function(data){
		$scope.deliveries = data;
	})
}])

app.controller('mainCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state){
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
	
	$scope.goTo = function($event){
		$state.go($event.target.dataset.link)
	} 
}])

app.controller('newCustomerCtrl', ['$scope', '$rootScope', '$http', '$state', function($scope, $rootScope, $http, $state){
	$rootScope.currMenu = 'commands';
	$rootScope.currTable = "לקוח חדש"
	$rootScope.currPage = 'main.newCustomer'
	console.log($state.current.name)
	
	$http({
		method: 'GET',
		url: '/api/PriceList/'
	}).success(function(data){
		$scope.priceLists = data;
	})
	
	$scope.customer = {}
	$scope.customer['client'] = 1
	$scope.submitCustomer = function(){
		$http({
			method: 'POST',
			url: '/api/Customers/',
			data: $scope.customer,
			headers : { 'Content-Type': 'application/json' }
		})
		.success(function(data){
			console.log(data)
		})
		.error(function(data){
			console.log(data)
		})
	}
}])

app.controller('newEmployeeCtrl', ['$scope', '$rootScope', '$http', '$state', '$filter', function($scope, $rootScope, $http, $state, $filter){
	$rootScope.currMenu = 'commands';
	$rootScope.currTable = "עובד חדש"
	$rootScope.currPage = 'main.newEmployee'
	
	$scope.submit = function(){
		$scope.employee.startDate = $filter('date')($scope.employee.startDate, 'yyyy-MM-dd');
		$scope.employee.endDate = $filter('date')($scope.employee.endDate, 'yyyy-MM-dd');
		$scope.employee.licenseExp = $filter('date')($scope.employee.licenseExp, 'yyyy-MM-dd');
		$scope.employee.birthDate = $filter('date')($scope.employee.birthDate, 'yyyy-MM-dd');
		
		$http({
			method: 'POST',
			url: '/api/Employee/',
			data: $scope.employee,
			headers : { 'Content-Type': 'application/json' }
		})
	}
}])

app.controller('citiesCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
	$rootScope.currMenu = 'main'
	$rootScope.currTable = "ערים"
	$rootScope.currPage = 'main.cities'
}])

app.controller('newDeliveryCtrl', ['$scope', '$rootScope', '$http', '$filter', function($scope, $rootScope, $http, $filter){
	$rootScope.currMenu = 'commands';
	$scope.delivery = {}
	
	$http.get('/api/Customers/').success(function(data){
		$scope.customers = data;
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
	
	$scope.delivery['client'] = 1
	$scope.delivery.numOfPackages = 0;
	$scope.delivery.numOfBoxes = 0;
	$scope.delivery.waiting = 0;
	$scope.delivery.status = $rootScope.deliveryStatuses[0].id;
	
	$scope.submitDelivery = function(){
		$scope.delivery.date = $filter('date')($scope.delivery.date, 'yyyy-MM-dd')
		$scope.delivery.time = $filter('date')($scope.delivery.time, 'HH:mm')
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
	console.log($rootScope.idToShow)
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
}

var deliveriesCtrl = function($scope, $rootScope, $http, $state){
	$rootScope.currMenu = 'commands';
	$rootScope.showLoader = true;
	$rootScope.currPage = 'main.deliveries'
	$http.get('/api/Delivery/').success(function(data){
		$scope.records = data
		$rootScope.showLoader = false;
	})
	
	$rootScope.currTable = "מעקב משלוחים - מוצא / יעד"

	$scope.tooltip = function($event){
		if($event.target.offsetWidth < $event.target.scrollWidth){
			angular.element($event.target).addClass('tooltip')
		} 
	}
	
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
	
	$scope.selectRecord = function(id){
		$scope.currRecord = $scope.records[id]
	}
	
	$scope.showRecord = function(event){
		$rootScope.idToShow = event.currentTarget.dataset['id'];
		$state.go('main.delivery')
	}
}



app.controller('priceListCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
	$rootScope.currPage = 'main.priceList';
	$rootScope.currMenu = 'main'
	$rootScope.showLoader = true;
	$http.get('/api/PriceList/').success(function(data){
		$scope.priceLists = data;
		//$scope.currPriceList = data[0];
		$scope.currPriceList = 0;
		$rootScope.showLoader = false;
	})
	
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
	$scope.close = function(){
		$rootScope.showPopup = false;
	}
}])

app.controller('tablesCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
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
}])