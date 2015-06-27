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

app.controller('dashboardCtrl', ['$scope', '$rootScope', '$http', '$state', function($scope, $rootScope, $http, $state){
	//init
	$scope.menus = [{
		name: 'מסך רכז',
		link: 'main.deliveries',
		icon: 'delivery.png'
	}, {
		name: 'מסך פקיד',
		link: 'main.newDelivery',
		icon: 'new-delivery.png'
	}, {
		name: 'לקוחות',
		link: 'main.newCustomer',
		icon: 'customers.png'
	}, {
		name: 'עובדים',
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
	},/* {
		name: 'טבלאות',
		link: 'main-small.tables',
		icon: 'tables.png'
	}, */{
		name: 'משלוחים קבועים',
		link: 'main.newRegularDelivery',
		icon: 'regularDelivery.png'
	}, {
		name: 'אתרים קבועים',
		link: 'main.regularSites',
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
	$scope.gotoPage = function(page){
		$state.go(page)
	}
	
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

app.controller('newDeliveryCtrl', ['$scope', '$rootScope', '$http', '$filter', '$state', '$modal', function($scope, $rootScope, $http, $filter, $state, $modal){
	//init
	$scope.delivery = {}

	$scope.delivery.numOfPackages = 0;
	$scope.delivery.numOfBoxes = 0;
	$scope.delivery.waiting = 0;
	$scope.delivery.status = 0;
	$scope.delivery.type = '0';
	$scope.regularSites = [];

	

	if ($state.params.id){
		$http({
			method: 'GET',
			url: '/api/Delivery/' + $state.params.id
		}).success(function(data){
			$scope.delivery = data
			$scope.initObjects(data)
		})
	}
	
	$rootScope.currMenu = 'commands';
	
	$scope.delivery.time = new Date();
	$scope.delivery.date = new Date();
	$scope.customerIndex = 0;
	
	$http.get('/api/Customers/').success(function(data){
		$scope.customers = data;
	})
	
	$http.get('/api/Delivery/').success(function(data){
		$scope.deliveries = data;
	})
	
	$http.get('/api/Employee/').success(function(data){
		$scope.employees = data;
	})
	
	$rootScope.currPage = 'main.newDelivery'
	$rootScope.currTable = "משלוח חדש"
	$rootScope.showLoader = false;
	
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
	
	
	//functions
	$scope.addTagging = function(name){
		return {name:name}
	}

	$scope.selectDelivery = function(){
		$http({
			method: 'GET',
			url: '/api/Delivery/' + $scope.selectedDelivery.id
		}).success(function(data){
			$scope.delivery = data;
			$scope.initObjects(data)
		})
	}
	
	$scope.initObjects = function(data){
		$scope.delivery.senderObj = {};
		$scope.delivery.receiverObj = {};

		$scope.delivery.customer = (data.customer == undefined) ? undefined : data.customer.id
		//$scope.delivery.status = (data.status == undefined) ? undefined : data.status.id
		$scope.delivery.senderObj['name'] = (data.sender == undefined) ? undefined : data.sender
		$scope.delivery.receiverObj['name'] = (data.receiver == undefined) ? undefined : data.receiver
		//$scope.delivery.sender = (data.sender == undefined) ? undefined : data.sender.id
		$scope.delivery.destCity = (data.destCity == undefined) ? undefined : data.destCity.id
		$scope.delivery.client = (data.client == undefined) ? undefined : data.client.id
		$scope.delivery.sourceCity = (data.sourceCity == undefined) ? undefined : data.sourceCity.id
		$scope.delivery.urgency = (data.urgency == undefined) ? undefined : data.urgency.id
		$scope.delivery.doubleType = (data.doubleType == undefined) ? undefined : data.doubleType.id
		//$scope.delivery.receiver = (data.receiver == undefined) ? undefined : data.receiver.id
		$scope.delivery.vehicleType = (data.vehicleType == undefined) ? undefined : data.vehicleType.id
		$scope.delivery.contactMan = (data.contactMan == undefined) ? undefined : data.contactMan.id
		$scope.delivery.firstDeliver = (data.firstDeliver == undefined) ? undefined : data.firstDeliver.id
		$scope.delivery.secondDeliver = (data.secondDeliver == undefined) ? undefined : data.secondDeliver.id
		$scope.delivery.thirdDeliver = (data.thirdDeliver == undefined) ? undefined : data.thirdDeliver.id
		
		//dates
		$scope.delivery.created = new Date(data.created)
		$scope.delivery.exeTime = new Date(data.exeTime)
		$scope.delivery.rakazTime = new Date(data.rakazTime)
		$scope.delivery.estTime = new Date(data.estTime)
	}
	
	$scope.customerSelected = function(){
		$http({
			method: 'GET',
			url: '/api/RegularSitesForCustomer/' + $scope.delivery.customer
		}).success(function(data){
			$scope.regularSites = data;
			$scope.typeCallback();
		})
	}
	
	$scope.$watch('delivery.customer', function(data){
		for (i in $scope.customers){
			if($scope.customers[i].id == data){
				$scope.contactMans = $scope.customers[i].contact_man
			}
		}
	})

	$scope.$watch('delivery.senderObj', function(obj){
		$scope.delivery.sender = (obj == undefined) ? undefined : obj.name
	})

	$scope.$watch('delivery.receiverObj', function(obj){
		$scope.delivery.receiver = (obj == undefined) ? undefined : obj.name
	})

	$scope.senderChanged = function(){
		var obj = $scope.delivery.senderObj;
		console.log("senderChanged", obj)

		$scope.delivery.sourceStreet = (obj == undefined) ? undefined : obj.streetName;
		$scope.delivery.sourceHomeNum = (obj == undefined) ? undefined : obj.streetNum;
		$scope.delivery.sourcePhone = (obj == undefined) ? undefined : obj.phone1;
		$scope.delivery.sourceCity = (obj == undefined) ? undefined : obj.city;
	}

	$scope.receiverChanged = function(){
		var obj = $scope.delivery.receiverObj;
		console.log("receiverChanged", obj)

		$scope.delivery.destStreet = (obj == undefined) ? undefined : obj.streetName;
		$scope.delivery.destHomeNum = (obj == undefined) ? undefined : obj.streetNum;
		$scope.delivery.destPhone = (obj == undefined) ? undefined : obj.phone1;
		$scope.delivery.destCity = (obj == undefined) ? undefined : obj.city;
	}

	$scope.typeCallback = function(){
		console.log("cb")
		var cust = undefined;

		angular.forEach($scope.customers, function(obj){
			console.log(obj, $scope.delivery.customer);
			if(obj.id == parseInt($scope.delivery.customer)){
				cust = obj;
			}
		})

		if(cust == undefined)
			return;

		$scope.delivery.sourceStreet = undefined;
		$scope.delivery.sourcePhone = undefined;
		$scope.delivery.sourceHomeNum = undefined;
		$scope.delivery.sourceHomeEnter = undefined;
		$scope.delivery.sourceFloor = undefined;
		$scope.delivery.sourceApart = undefined;
		$scope.delivery.sourceCity = undefined;

		$scope.delivery.destStreet = undefined;
		$scope.delivery.destPhone = undefined;
		$scope.delivery.destHomeNum = undefined;
		$scope.delivery.destHomeEnter = undefined;
		$scope.delivery.destFloor = undefined;
		$scope.delivery.destApart = undefined;
		$scope.delivery.destCity = undefined;

		
		

		switch($scope.delivery.type){
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

				$scope.delivery.senderObj = $scope.regularSites[$scope.regularSites.length-1]
				$scope.delivery.receiverObj = {};

				/*$scope.delivery.sourceStreet = cust.streetName;
				$scope.delivery.sourceHomeNum = cust.streetNum;
				$scope.delivery.sourcePhone = cust.phone1;
				$scope.delivery.sourceCity = cust.city;*/
				
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

				$scope.delivery.receiverObj = $scope.regularSites[$scope.regularSites.length-1]
				$scope.delivery.senderObj = {};

				/*$scope.delivery.destStreet = cust.streetName;
				$scope.delivery.destHomeNum = cust.streetNum;
				$scope.delivery.destPhone = cust.phone1;
				$scope.delivery.destCity = cust.city;*/
				
				$scope.receiverChanged()

				break;

			case '2':
				$scope.delivery.sender = undefined;
				$scope.delivery.senderObj = undefined;
				$scope.delivery.receiver = undefined;
				$scope.delivery.receiverObj = undefined;

				break;
		}
	}

	$scope.deleteDelivery = function(){
		$http({
			method: 'DELETE',
			url: '/api/Delivery/' + $scope.delivery.id
		}).success(function(){
			for (var i = $scope.deliveries.length - 1 ; i >= 0 ; i--){
				var obj = $scope.deliveries[i];
				
				if($scope.delivery.id == $scope.deliveries[i].id){
					$scope.deliveries.splice(i, 1);
				}
			}
			$scope.delivery = {}
			$rootScope.addAlert('נמחק בהצלחה', 'success')
		}).error(function(){
			$rootScope.addAlert('שגיאה', 'danger')
		})
	}
	
	$scope.newDelivery = function(){
		$scope.delivery = {}
		$scope.selectedDelivery = 0;
	}
	
	$scope.submitDelivery = function(){
		/*$scope.delivery.date = $filter('date')($scope.delivery.date, 'yyyy-MM-dd')
		$scope.delivery.time = $filter('date')($scope.delivery.time, 'HH:mm')
		$scope.delivery.rakazTime = $filter('date')($scope.delivery.rakazTime, 'HH:mm')
		$scope.delivery.exeTime = $filter('date')($scope.delivery.exeTime, 'HH:mm')
		$scope.delivery.estTime = $filter('date')($scope.delivery.estTime, 'HH:mm')
		*/
		if($scope.delivery.id){
			$http({
				method: 'PUT',
				url: '/api/updateDelivery/' + $scope.delivery.id,
				data: $scope.delivery,
				headers : { 'Content-Type': 'application/json' }
			}).success(function(data){
				$scope.delivery.id = data.id
				$rootScope.addAlert('משלוח עודכן בהצלחה', 'success')
			})
		} else {
			$http({
				method: 'POST',
				url: '/api/newDelivery/',
				data: $scope.delivery,
				headers : { 'Content-Type': 'application/json' }
			})
			.success(function(data){
				$rootScope.addAlert('המשלוח הוזן!', 'success')
			})
			.error(function(data){
				$rootScope.addAlert('שגיאה', 'danger')
			})
		}
	}
	
	/*$scope.change = function(){
		switch($scope.delivery.type){
			case '0':
				$scope.delivery.receiver = $scope.delivery.sender;
				$scope.delivery.sender = $scope.delivery.customer;
				break;
			case '1':
				$scope.delivery.sender = $scope.delivery.receiver;
				$scope.delivery.receiver = $scope.delivery.customer;
				break;
			case '2':
				$scope.delivery.sender = undefined;
				break;
		}
	}*/
	
	$scope.showPriceInfo = function(){
		$scope.getPrice();
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/static/partials/modals/price.html',
			controller: function($scope, $modalInstance){
				$scope.close = function(){
					$modalInstance.close();
				}
			},
			size: 'sm',
			resolve: {
				price: function(){
					return $scope.price
				}
			}
		});
	}
	
	$scope.getPrice = function(){
		
		if($scope.delivery.customer == undefined | $scope.delivery.urgency == undefined | $scope.delivery.sourceCity == undefined | $scope.delivery.destCity == undefined){
			$rootScope.addAlert('נתונים חסרים', 'danger')
			//alert("חסרים נתונים");
			return;
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
			//$rootScope.showPopup = true;
			
			$rootScope.showLoader = false;
			
			$rootScope.price.total = $rootScope.price.urgency * $rootScope.price.basicPrice + ($rootScope.price.multiForPackage * $rootScope.price.packages) + ($rootScope.price.multiForBox * $rootScope.price.boxes) + ($rootScope.price.addForWaiting * $rootScope.price.waiting);
			$scope.delivery.basicPrice = $rootScope.price.basicPrice
			$scope.delivery.totalPrice = $rootScope.price.total;
		}).error(function(data){
			$rootScope.showLoader = false;
			$rootScope.addAlert('לא הוזן מחירון למסלול זה!', 'danger')
			//alert("לא הוזן מחירון למסלול זה")
		})
	}
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
		console.log($scope.records)
		$rootScope.showLoader = false;
	})

	$http.get('/api/LastRegularDeliveries/').success(function(data){
		$scope.records = $scope.records.concat(data);
		console.log($scope.records)
	})

	$http.get('/api/Employee/').success(function(data){
		$scope.employees = data;
		console.log("getting employees")
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
				console.log(data)
			})
		} else {
			$http({
				method: 'PUT',
				url: '/api/updateDelivery/' + record.id,
				data: data,
				headers : { 'Content-Type': 'application/json' }
			}).success(function(data){
				console.log(data)
			})
		}
	}
	
	$scope.filterDeliveries = function(item){
		if(!item.status){
		//	return false;
		}
		console.log(item)
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
	}
	
	$scope.showRecord = function(event, record){
		id = event.currentTarget.dataset['id'];
		console.log(id)
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

	/*$scope.customerSelected = function(){
		$scope.contactMans = undefined;

		for (i in $scope.customers){
			if($scope.customers[i].id == $scope.regularDelivery.customer){
				$scope.contactMans = $scope.customers[i].contact_man
				//console.log($scope.customers[i])
			}
		}
	}*/

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
		console.log(row)
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