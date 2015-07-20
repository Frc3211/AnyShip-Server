app.controller('regularSitesCtrl', ['$scope', '$rootScope', '$http', 'objectsService', '$filter', function($scope, $rootScope, $http, objectsService, $filter){
	// init
	$rootScope.currTable = 'אתרים קבועים';
	/*$http.get('/api/RegularSite/').success(function(data){
		$scope.regularSites = data;
	})*/

	$scope.regularSites = objectsService.list('RegularSite')
	$scope.regularSites = $filter('orderBy')($scope.regularSites, 'name')

	// functions
	$scope.save = function(){
		angular.forEach($scope.regularSites, function(obj, index){
			if(!obj.id){
				objectsService.post('RegularSite', obj).success(function(data){
					$rootScope.addAlert('נשמר בהצלחה', 'success')
					obj.id = data.id
				}).error(function(data){
					$rootScope.addAlert('שגיאה, נסה שוב מאוחר יותר', 'danger')
				})
			} else if(obj.changed){
				objectsService.put('RegularSite', obj.id, obj).success(function(data){
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
		objectsService.delete('RegularSite', $scope.regularSites[index].id);
		$scope.regularSites.splice(index, 1);
		$rootScope.addAlert('נמחק בהצלחה', 'success');
	}
}])
