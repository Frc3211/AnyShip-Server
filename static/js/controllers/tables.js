app.controller('tablesCtrl', ['$scope', '$rootScope', '$http', '$state', 'tablesService', function($scope, $rootScope, $http, $state, tablesService){
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
			title: 'סוגי משלוח',
            isAdded: true
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
		},
        Status: {
            fields: [{
                title: 'שם',
                name: 'name'
            }],
            name: 'Status',
            title: 'סטטוסים',
            isAdded: true
        },
        Jobs: {
            fields: [{
                title: 'תפקיד',
                name: 'name'
            }],
            name: 'Jobs',
            title: 'תפקידים',
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
}])
