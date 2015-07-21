app.controller('rakazCtrl', ['$scope', '$rootScope', '$http', '$state', '$filter', 'ngDialog', 'tablesService', 'objectsService', function($scope, $rootScope, $http, $state, $filter, ngDialog, tablesService, objectsService){
	//init
	$rootScope.currMenu = 'commands';
	$rootScope.currPage = 'main.deliveries'
	$scope.records = [];

	$scope.currRecordIndex = 0;

	$scope.records = $scope.records.concat(objectsService.list('Delivery'))
	$scope.records = $scope.records.concat(objectsService.list('RegularDelivery'))
	$scope.employees = objectsService.list('Employee')

	$scope.vehicleTypes = tablesService['VehicleTypes'].getAll()

	$rootScope.currTable = "מעקב משלוחים - מוצא / יעד"

	$scope.filterGeneral = true;

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
			$scope.filterGeneral = true;
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
	},/* {
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
	}, */{
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
			$scope.filterLates = true;
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


	$scope.setFilterWaitings = function(){
		$scope.zeroFilters();
		$scope.filterWaitings = true;
	}

	$scope.setFilterOpenes = function(){
		$scope.zeroFilters();
		$scope.filterOpenes = true;
	}

	$scope.key = function($event){
		switch($event.keyCode){
			case 40:
				if($scope.currRecordIndex < $scope.filteredRecords.length - 1){
					$scope.currRecordIndex++;
				}
				break;
			case 38:
				if($scope.currRecordIndex > 0){
					$scope.currRecordIndex--;
				}
				break;
		}
	}

	$scope.checkUrgency = function(value){
		switch(value){
			case 'רגיל':
				return null;
				break;
			case 'מיידי':
				return 'mark-very-urgent';
				break;
			case 'בהול':
				return 'mark-very-urgent';
				break;
			case 'בהול כיוון אחד':
				return 'mark-very-urgent';
				break;
			case 'דחוף כיוון אחד':
				return 'mark-urgent';
				break;
			case 'דחוף':
				return 'mark-urgent';
				break;
		}
	}

	$scope.checkDouble = function(value){
		switch(value){
			case 'רגיל':
				break;
			case 'כפול רגיל':
				return 'mark-double'
				break;
			case 'ללא חיוב':
				return 'mark-double-no-charge';
				break;
			case 'חזרה למשרד':
				return 'mark-double-return';
				break;
			default:
				return null;
				break;
		}
	}

	$scope.submitChanges = function(field){
		var data = {}
		if(typeof($scope.currRecord[field]) == 'object'){
			data[field] = $scope.currRecord[field].id;
		} else {
			data[field] = $scope.currRecord[field];
		}

		if($scope.currRecord.hasOwnProperty('isSunday')){
			/*$http({
				method: 'PUT',
				url: '/api/RegularDelivery/' + $scope.currRecord.id,
				data: data
			})*/
			objectsService.put('RegularDelivery', $scope.currRecord.id, data);
		} else {
			/*
			$http({
				method: 'PUT',
				url: '/api/Delivery/' + $scope.currRecord.id,
				data: data
			})*/
			objectsService.put('Delivery', $scope.currRecord.id, data);
		}

	}

	$scope.$watch('records', function(obj){
		$scope.countOpens = 0;
		$scope.countWaitings = 0;
		angular.forEach($scope.records, function(obj){
			switch(obj.status){
				case 0:
					$scope.countOpens++;
					break;
				case 4:
					$scope.countWaitings++;
					break
			}
		})
	}, true)

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

	$scope.change = function(record, fieldName, id, oldId){
		var data = {}
		data[fieldName] = id

		var index = $scope.records.indexOf(record);

		switch(fieldName){
			case 'firstDeliver':
				data['status'] = 1
				$scope.records[index].status = 1;
				break;
			case 'secondDeliver':
				record.status = 1
				data['status'] = 1
				if(record.firstDeliver == null){
					record.firstDeliver = id;
					data.firstDeliver = id;
				}

				break;
			case 'status':
				switch(id){
					case 1: // הועבר לשליח
						if(record.firstDeliver == null){
							alert("לא נבחר שליח")
							record.status = oldId;
							data['status'] = oldId;
							return;
						}
						break;
					case 2: // חזר מכפולה
						if(record.doubleType.name == "רגיל"){
							alert("משלוח לא כפול")
							record.status = oldId;
							data['status'] = oldId;
							return;
						}
						break;
					case 3:
						if(!confirm("להעביר למבוטלים?")){
							record.status = oldId;
							data['status'] = oldId;
							return;
						}
						break;
					case 5: // נאסף

						break;
						//if(record.)
					case 6: //בוצע
						if(record.firstDeliver == null || record.secondDeliver == null){
							alert('יש לבחור שליח אוסף ומוסר!')
							record.status = oldId;
							data['status'] = oldId;
							return;
						}
						break;
					case 7: // שליח שני
						if(record.firstDeliver == null){
							alert('יש לבחור שליח אוסף!')
							record.status = oldId;
							data['status'] = oldId;
							return;
						}
						break;
					case 8: // אושר ביצוע
						if(record.firstDeliver == null || record.secondDeliver == null){
							alert('יש לבחור שליח אוסף ושליח מוסר!')
							record.status = oldId;
							data['status'] = oldId;
							return;
						}
						break;
					case 9: // כפולה קבל 1
						if(record.firstDeliver == null){
							alert('יש לבחור שליח!')
							record.status = oldId;
							data.status = oldId;
							return;
						}
						break;
					case 10:
						if(record.firstDeliver == null){
							alert("יש לבחור שליח אוסף")
							record.status = oldId;
							data.status = oldId;
							return;
						}
						break;
				}
				break;
		}

		if(record.hasOwnProperty('isSunday')){
			$http({
				method: 'PUT',
				url: '/api/RegularDelivery/' + record.id,
				data: data,
				headers : { 'Content-Type': 'application/json' }
			}).success(function(data){
				//$scope.records[index] = data;
			})
		} else {
			$http({
				method: 'PUT',
				url: '/api/updateDelivery/' + record.id,
				data: data,
				headers : { 'Content-Type': 'application/json' }
			}).success(function(data){
				//$scope.records[index] = data;
			})
		}
	}

	$scope.filterDeliveries = function(item){
		if(!item.status){
		//	return false;
		}
		//console.log(item)
		return (!$scope.filterUrgency || item.urgency.name != 'רגיל') &&
			(!$scope.filterGeneral || item.status != 6) &&
			(!$scope.filterDoubles || item.doubleType.name != 'רגיל') &&
			//(!$scope.filterFutures || ) &&
			(!$scope.filterTomorrow || item.isTomorrow == true) &&
			(!$scope.filterDones || item.status == 6) &&
			(!$scope.filterOpenes || item.status == 0) &&
			(!$scope.filterLates || item.status == 6 || new Date() < new Date(item.endTime)) &&
			(!$scope.filterWaitings || item.status == 4) &&
			// filterLates
			// filterSpecial
			// filterInTransit
			(!$scope.filterCustomer || item.customer.id == $scope.filterCustomerData)
	}

	$scope.zeroFilters = function(){
		$scope.currRecordIndex 	= 0;
		$scope.currRecord		= null;
		$scope.filterGeneral	= false;
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
		$scope.filterWaitings 	= false;
		// קבלנים
		// זהב
	}

	$scope.zeroFilters()
	$scope.filterGeneral = true;

	$scope.tooltip = function($event){
		if($event.target.offsetWidth < $event.target.scrollWidth){
			angular.element($event.target).addClass('tooltip')
		}
	}

	$scope.$watch('currRecordIndex', function(value){
		$scope.currRecord = $scope.filteredRecords[$scope.currRecordIndex]
	})

	$scope.selectRecord = function(record, i){
		$scope.currRecord = $scope.filteredRecords[$scope.currRecordIndex];
		$scope.currRecordIndex = i;

		/*var index = $scope.records.indexOf(record)
		$scope.currRecord = $scope.records[index]
		$scope.currRecordIndex = i*/

		//$scope.initCurrRecord()
		if($scope.currRecord.hasOwnProperty('isSunday')){
			$scope.currRecord.deliveryType = 'סבב קבוע'
		} else {
			$scope.currRecord.deliveryType = 'משלוח רגיל'
		}
	}

	/*$scope.initCurrRecord = function(){
		$scope.currRecord.customer = ($scope.currRecord.customer == undefined) ? undefined : $scope.currRecord.customer.id
		$scope.currRecord.contactMan = ($scope.currRecord.contactMan == undefined) ? undefined : $scope.currRecord.contactMan.id
		$scope.currRecord.doubleType = ($scope.currRecord.doubleType == undefined) ? undefined : $scope.currRecord.doubleType.id
		$scope.currRecord.firstDeliver = ($scope.currRecord.firstDeliver == undefined) ? undefined : $scope.currRecord.firstDeliver.id
		$scope.currRecord.secondDeliver = ($scope.currRecord.secondDeliver == undefined) ? undefined : $scope.currRecord.secondDeliver.id
		$scope.currRecord.urgency = ($scope.currRecord.urgency == undefined) ? undefined : $scope.currRecord.urgency.id
		$scope.currRecord.vehicleType = ($scope.currRecord.vehicleType == undefined) ? undefined : $scope.currRecord.vehicleType.id
		delete($scope.currRecord.client)
	}*/

	$scope.$watch('currRecord', function(obj){
		if(obj == undefined)
			return;
		obj.dateCreated = new Date(obj.created);
	})

	$scope.showRecord = function(event, record){
		id = event.currentTarget.dataset['id'];
		if(record.hasOwnProperty('isSunday')){
			$state.go('main.regularDelivery', {id: id})
		} else {
			$state.go('main.delivery', {id: id})
		}
	}
}])
