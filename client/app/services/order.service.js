'use strict';

    angular
        .module('easyOrder')
        .factory('orderService', orderService);

        orderService.$inject = ['$q', '$http', 'backendService'];

    function orderService($q, $http, backendService) {

        var service = {
            makeOrder: makeOrder,
        };

        return service;

        function makeOrder(items, tableNumber) {
            var deferred = $q.defer();
            console.log(items);
            console.log(tableNumber);
            $http({
                method: 'POST',
                url: backendService.backendUrl() + '/api/order/create',
                data: {
                    "items": items,
                    "tableNumber": tableNumber
                }
            }).then(function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
};