app.service('objectsService', ['$http', function($http){
    var objectsData = {};

    var service = {
        customers: {
            promise: $http.get('/api/Customers/').success(function(data){
                objectsData['Customers'] = data;
            })
        }
    }
    
    return service;
}])
