app.controller('rakazCtrl', ['$scope', '$rootScope', '$http', '$state', 'ngDialog', function($scope, $rootScope, $http, $state, ngDialog){
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
		if($scope.records[id].hasOwnProperty('isSunday')){
			$scope.currRecord.deliveryType = 'סבב קבוע'
		} else {
			$scope.currRecord.deliveryType = 'משלוח רגיל'
		}
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
