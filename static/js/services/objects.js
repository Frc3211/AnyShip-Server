app.service('objectsService', ['$http', '$filter', function($http, $filter){
    var objectTypes = ['Customers', 'Delivery', 'Employee', 'UrgencyList', 'DoubleTypeList', 'RegularDelivery', 'RegularSite']
    var objects = {}
    var objectsService = this;

    angular.forEach(objectTypes, function(type){
        $http({
            method: 'GET',
            url: '/api/' + type + '/'
        }).success(function(data){
            objects[type] = data;
        })
    })

    this.list = function(type){
        return objects[type];
    }

    this.get = function(type, id){
        return $filter('getById')(type, id)
    }

    this.post = function(type, data){
        var promise = $http({
            method: 'POST',
            url: '/api/' + type + '/',
            data: data
        })
        /// TODO: fix this
        promise.success(function(data){
            $http({
                method: 'GET',
                url: '/api/' + type + '/' + data.id
            }).success(function(data){
                objects[type].push(data)
            })
            //objects[type].push(data)
        })

        return promise;
    }

    this.getById = function(type, id){
		var i = 0, len = objects[type].length;
		for(; i < len ; i++){
			if(+objects[type][i].id == id){
				return objects[type][i]
			}
		}
		return null;
    }

    /*this.put = function(type, id, data){
        $http({
            method: 'PUT',
            url: '/api/' + type + '/' + id,
            data: data
        }).success(function(data){
            var obj = $filter('getById')(type, id);
            obj = data;
            console.log("success")
            return true;
        }).error(function(data){
            return false;
        })
    }*/

    this.put = function(type, id, data){
        var promise = $http({
            method: 'PUT',
            url: '/api/' + type + '/' + id,
            data: data
        })

        promise.success(function(cbData){
            /*var obj = objectsService.getById(type, id);
            var index = objects[type].indexOf(obj);
            for(i in data){
                console.log("setting", i, "from", objects[type][index][i], "to", data[i])
                objects[type][index][i] = data[i];
            }*/
        })
        return promise;
    }

    this.delete = function(type, id){
        var obj = objectsService.getById(type, id)

        if(obj.id){
            $http({
                method: 'DELETE',
                url: '/api/' + type + '/' + id
            }).success(function(data){
                var list = objects[type];
        		var i = 0, len = list.length;
        		for(; i < len ; i++){
        			if(+list[i].id == id){
        				objects[type].splice(i, 1);
                        console.log("splicing")
                        return true;
        			}
        		}
            })
        } else {
            for(; i < len ; i++){
                if(+list[i].id == id){
                    objects[type].splice(i, 1);
                    console.log("splicing")
                    return true;
                }
            }
        }

    }
}])
