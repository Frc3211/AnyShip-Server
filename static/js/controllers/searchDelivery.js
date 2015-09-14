app.controller('searchDeliveryCtrl', ['$scope', 'objectsService', function($scope, objectsService){
    $scope.customers = objectsService.list('Customers');
}]);
