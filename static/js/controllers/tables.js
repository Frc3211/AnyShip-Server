app.controller('tablesCtrl', ['$scope', '$rootScope', '$http', '$state', 'tablesService', 'objectsService', function($scope, $rootScope, $http, $state, tablesService, objectsService){
	//init
	$scope.tables = {
		VehicleTypes: {
			fields: [{
				title: 'כלי רכב',
				name: 'name',
				type: 'input',
				input: 'text'
			}, {
				title: 'מחיר',
				name: 'price',
				type: 'input',
				input: 'text'
			}],
			name: 'VehicleTypes',
			title: 'סוגי משלוח',
            isAdded: true
		},
        UrgencyList: {
			fields: [{
				title: 'דחיפות',
				name: 'name',
				type: 'input',
				input: 'text'
			}, {
				title: 'מכפיל',
				name: 'multiplier',
				type: 'input',
				input: 'text'
			}],
			name: 'UrgencyList',
			title: 'מחירון דחיפויות'
		},
		DoubleTypeList: {
			fields: [{
				title: 'כפולה',
				name: 'name',
				type: 'input',
				input: 'text'
			}, {
				title: 'מכפיל',
				name: 'multiplier',
				type: 'input',
				input: 'text'
			}],
			name: 'DoubleTypeList',
			title: 'מחירון כפולות'
		},
        Status: {
            fields: [{
                title: 'שם',
                name: 'name',
				type: 'input',
				input: 'text'
            }],
            name: 'Status',
            title: 'סטטוסים',
            isAdded: true
        },
        Jobs: {
            fields: [{
                title: 'תפקיד',
                name: 'name',
				type: 'input',
				input: 'text'
            }],
            name: 'Jobs',
            title: 'תפקידים',
            isAdded: true
        },
		VehicleCalander: {
			fields: [{
				title: "מס' רכב",
				name: 'vehicleId',
				type: 'input',
				input: 'text'
			}, {
				title: 'סוג רכב',
				name: 'vehicleType',
				type: 'table',
				table: 'VehicleTypes'
			}, {
				title: 'סטטוס',
				name: 'status',
				type: 'object',
				object: 'Status'
			}, {
				title: 'נהג',
				name: 'driver',
				type: 'object',
				object: 'Employee'
			}, {
				title: 'סוף טסט',
				name: 'endTest',
				type: 'input',
				input: 'date'
			}, {
				title: 'סוף ביטוח',
				name: 'insuranceEnd',
				type: 'input',
				input: 'date'
			}, {
				title: 'תאריך רכישה',
				name: 'purchaseDate',
				type: 'input',
				input: 'date'
			}],
			title: 'יומן רכב',
			name: 'VehicleCalander',
			isAdded: true
		}
	}

	$scope.table = $scope.tables[$state.params.tableName]
	$rootScope.currTable = $scope.table.title;

    $scope.rows = tablesService[$scope.table.name].getAll();

	//functions
	$scope.addEntry = function(){
        $scope.rows.push({})
	}

	$scope.deleteEntry = function(index){

		if($scope.rows[index].hasOwnProperty('id')){
            tablesService[$scope.table.name].deleted.push($scope.rows[index].id)
			//$scope.deleted.push($scope.rows[index]['id'])
		}
		$scope.rows.splice(index, 1)
	}

	$scope.changed = function(index){
        $scope.rows[index].changed = true
	}

	$scope.save = function(){
		tablesService[$scope.table.name].save()
    }

   	$scope.objects = {};
   	$scope.tables = {};

    angular.forEach($scope.table.fields, function(obj, index){
    	if(obj.type == 'object'){
    		$scope.objects[obj.object] = objectsService.list(obj.object);
    		//console.log($scope.objects);
    	} else if(obj.type == 'table'){
    		$scope.tables[obj.table] = tablesService[obj.table].getAll();
    		console.log($scope.tables);
    	}
    });
}])
