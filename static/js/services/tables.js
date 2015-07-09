app.service('tablesService', ['$http', '$rootScope', function($http, $rootScope){
    var tablesData = {};

    var saveFunc = function(){
        var name = this.name

        angular.forEach(this.deleted, function(value, key){
            $http({
                method: 'DELETE',
                url: '/api/' + name + '/' + value
            })
        })

        angular.forEach(tablesData[name], function(obj){
            if(obj.id){
                if(obj.changed){
                    $http({
                        method: 'PUT',
                        url: '/api/' + name + '/' + obj.id,
                        data: obj,
                        headers : { 'Content-Type': 'application/json' }
                    }).success(function(data){
                        obj.changed = false;
                    })
                }
            } else {
                $http({
                    method: 'POST',
                    url: '/api/' + name + '/',
                    data: obj,
                    headers : { 'Content-Type': 'application/json' }
                }).success(function(data){
                    obj.id = data.id;
                })
            }
        })
    }

    var service = {
        DoubleTypeList: {
            name: 'DoubleTypeList',
            promise: $http.get('/api/DoubleTypeList/').success(function(data){
                tablesData['DoubleTypeList'] = data;
            }),
            getAll: function(){
                return tablesData['DoubleTypeList'];
            },
            save: saveFunc,
            deleted: []
        },
        UrgencyList: {
            name: 'UrgencyList',
            promise: $http.get('/api/UrgencyList/').success(function(data){
                tablesData['UrgencyList'] = data;
            }),
            getAll: function(){
                return tablesData['UrgencyList'];
            },
            save: saveFunc,
            deleted: []
        },
        VehicleTypes: {
            name: 'VehicleTypes',
            promise: $http.get('/api/VehicleTypes/').success(function(data){
                tablesData['VehicleTypes'] = data;
            }),
            getAll: function(){
                return tablesData['VehicleTypes']
            },
            save: saveFunc,
            deleted: []
        },
        Status: {
            name: 'Status',
            promise: $http.get('/api/Status/').success(function(data){
                tablesData['Status'] = data;
            }),
            getAll: function(){
                return tablesData['Status']
            },
            save: saveFunc,
            deleted: []
        },
        Jobs: {
            name: 'Jobs',
            promise: $http.get('/api/Jobs/').success(function(data){
                tablesData['Jobs'] = data;
            }),
            getAll: function(){
                return tablesData['Jobs']
            },
            save: saveFunc,
            deleted: []
        }
    }
    return service;
}])
