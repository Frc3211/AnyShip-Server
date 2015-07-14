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
