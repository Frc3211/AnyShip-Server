app.controller('newDeliveryCtrl', ['$scope', '$rootScope', '$http', '$filter', '$state', '$modal', 'objectsService', function($scope, $rootScope, $http, $filter, $state, $modal, objectsService){
	//init
	$scope.delivery = {}

	$scope.delivery.numOfPackages = 0;
	$scope.delivery.numOfBoxes = 0;
	$scope.delivery.waiting = 0;
	$scope.delivery.status = 0;
	$scope.delivery.type = '0';
	$scope.regularSites = [];

	$rootScope.currMenu = 'commands';

	$scope.delivery.time = new Date();
	$scope.delivery.date = new Date();
	$scope.customerIndex = 0;

	$scope.customers = objectsService.list('Customers')
	$scope.deliveries = objectsService.list('Delivery')
	$scope.employees = objectsService.list('Employee')
	$scope.urgs = objectsService.list('UrgencyList');
	$scope.doubles = objectsService.list('DoubleTypeList');

	$rootScope.currPage = 'main.newDelivery'
	$rootScope.currTable = "משלוח חדש"
	$rootScope.showLoader = false;

	//functions
	$scope.addTagging = function(name){
		return {name:name}
	}

	$scope.selectDelivery = function(){
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
						$scope.$parent.delivery = angular.copy(objectsService.get('Delivery', $scope.$parent.selectedDelivery.id));
						$scope.$parent.initObjects($scope.$parent.delivery);
						$scope.$parent.form.$pristine = true
						$modalInstance.close();
					}

					$scope.no = function(){
						$scope.$parent.selectedDelivery = 0;
						$modalInstance.close();
					}
				},
				scope: $scope,
				size: 'sm'
			});
		} else {
			$scope.delivery = angular.copy(objectsService.get('Delivery', $scope.selectedDelivery.id));
			$scope.initObjects($scope.delivery);
		}
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
		$scope.delivery.created = (data.created == undefined) ? undefined : new Date(data.created)
		$scope.delivery.exeTime = (data.exeTime == undefined) ? undefined : new Date(data.exeTime)
		$scope.delivery.rakazTime = (data.rakazTime == undefined) ? undefined : new Date(data.rakazTime)
		$scope.delivery.endTime = (data.endTime == undefined) ? undefined : new Date(data.endTime)
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

		$scope.delivery.sourceStreet = (obj == undefined) ? undefined : obj.streetName;
		$scope.delivery.sourceHomeNum = (obj == undefined) ? undefined : obj.streetNum;
		$scope.delivery.sourcePhone = (obj == undefined) ? undefined : obj.phone1;
		$scope.delivery.sourceCity = (obj == undefined) ? undefined : obj.city;
	}

	$scope.receiverChanged = function(){
		var obj = $scope.delivery.receiverObj;

		$scope.delivery.destStreet = (obj == undefined) ? undefined : obj.streetName;
		$scope.delivery.destHomeNum = (obj == undefined) ? undefined : obj.streetNum;
		$scope.delivery.destPhone = (obj == undefined) ? undefined : obj.phone1;
		$scope.delivery.destCity = (obj == undefined) ? undefined : obj.city;
	}

	$scope.typeCallback = function(){
		var cust = undefined;

		angular.forEach($scope.customers, function(obj){
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
		objectsService.delete('Delivery', $scope.delivery.id)
	}

	$scope.newDelivery = function(){
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
						$scope.$parent.delivery = {};
						$scope.$parent.selectedDelivery = 0;
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
			$scope.delivery = {}
			$scope.selectedDelivery = 0;
		}
	}

	$scope.submitDelivery = function(){
		var date = new Date($scope.delivery.endTime)
		var now = new Date()
		date.setDate(now.getDate())
		date.setFullYear(now.getFullYear())
		date.setMonth(now.getMonth())
		$scope.delivery.endTime = date

		if($scope.delivery.id){
			objectsService.put('Delivery', $scope.delivery.id, $scope.delivery).success(function(data){
				$rootScope.addAlert('משלוח עודכן בהצלחה', 'success')
			}).error(function(data){
				$rootScope.addAlert('שגיאה', 'danger');
			});
		} else {
			objectsService.post('Delivery', $scope.delivery).success(function(data){
				$rootScope.addAlert('המשלוח הוזן!', 'success')
			}).error(function(data){
				$rootScope.addAlert('שגיאה', 'danger');
			})
		}
	}

	$scope.showPriceInfo = function(){
		$scope.getPrice();
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/static/partials/modals/priceInfo.html',
			controller: function($scope, $modalInstance){
				$scope.close = function(){
					$modalInstance.close();
				}
			},
			size: 'sm',
			scope: $scope
			/*resolve: {
				price: function(){
					return {name: 'fdsfds'}
				}
			}*/
		});
	}

	$scope.getPrice = function(){

		if($scope.delivery.customer == undefined | $scope.delivery.urgency == undefined | $scope.delivery.sourceCity == undefined | $scope.delivery.destCity == undefined){
			$rootScope.addAlert('נתונים חסרים', 'danger');
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
			//var totalPrice;
			var priceAdd = data;
			$scope.priceData = {};
			$scope.priceData.basicPrice = priceAdd['price']
			$scope.priceData.urgency = $.grep($scope.urgs, function(e){ return e.id == $scope.delivery.urgency; })[0].multiplier;
			$scope.priceData.double = $.grep($scope.doubles, function(e){ return e.id == $scope.delivery.doubleType ;})[0].multiplier;
			$scope.priceData.vehicleTypePrice = $.grep($scope.vehicles, function(e){ return e.id == $scope.delivery.vehicleType ;})[0].price;

			/*$rootScope.price.numForPackage = data[0].numForPackage;
			$rootScope.price.numForBox = data[0].numForBox;
			$rootScope.price.isMultiForPackage = data[0].isMultiForPackage;
			$rootScope.price.isMultiForBox = data[0].isMultiForBox;
			$rootScope.price.addForWaiting = data[0].waiting;
			$rootScope.price.basicPrice = data[0].price;

			$rootScope.price.packages = $scope.delivery.numOfPackages;
			$rootScope.price.boxes = $scope.delivery.numOfBoxes;
			$rootScope.price.waiting = $scope.delivery.waiting;
			$rootScope.price.afternoon = 0;*/

			var now = new Date()
			var time = new Date(now.getTime() + (data.exeTime * 60000))
			time.setSeconds(0)
			time.setMilliseconds(0)
			$scope.delivery.endTime = time

			$rootScope.showLoader = false;


			$scope.priceData.addForUrgency = (priceAdd.price * $scope.priceData.urgency) - priceAdd.price;
			$scope.priceData.addForDouble = (priceAdd.price * $scope.priceData.double) - priceAdd.price;

			//$scope.priceData.totalPrice = $scope.priceData.basicPrice * $scope.priceData.urgency * $scope.priceData.double;
			$scope.priceData.totalPrice = $scope.priceData.basicPrice + $scope.priceData.addForUrgency + $scope.priceData.addForDouble;

			if(priceAdd.isMultiForPackage){
				$scope.priceData.addForPackage = (priceAdd.price * priceAdd.numForPackage) - priceAdd.price;
			} else {
				$scope.priceData.addForPackage = priceAdd.numForPackage
			}
			$scope.priceData.addForPackages = $scope.priceData.addForPackage * $scope.delivery.numOfPackages;
			$scope.priceData.totalPrice += $scope.priceData.addForPackages

			if(priceAdd.isMultiForBox){
				$scope.priceData.addForBox = (priceAdd.price * priceAdd.numForBox) - priceAdd.price;
			} else {
				$scope.priceData.addForBox = priceAdd.numForBox
			}
			$scope.priceData.addForBoxes = $scope.priceData.addForBox * $scope.delivery.numOfBoxes;
			$scope.priceData.totalPrice += $scope.priceData.addForBoxes

			$scope.priceData.waiting = priceAdd.waiting * $scope.delivery.waiting;
			$scope.priceData.totalPrice += $scope.priceData.waiting;
			$scope.priceData.totalPrice += $scope.priceData.vehicleTypePrice;

			/*$rootScope.price.total = $rootScope.price.basicPrice * $rootScope.price.urgency * $rootScope.price.double +
						($rootScope.price.multiForPackage * $rootScope.price.packages) +
						($rootScope.price.multiForBox * $rootScope.price.boxes) + ($rootScope.price.addForWaiting * $rootScope.price.waiting);*/
			$scope.delivery.basicPrice = priceAdd.price;
			$scope.delivery.totalPrice = $scope.priceData.totalPrice;

		}).error(function(data){
			$rootScope.showLoader = false;
			$rootScope.addAlert('לא הוזן מחירון למסלול זה!', 'danger');
			//alert("לא הוזן מחירון למסלול זה")
		})
	}

	if ($state.params.id){
		$scope.delivery = objectsService.get('Delivery', $state.params.id)
		$scope.initObjects($scope.delivery)
	}
}])
