'use strict';

    angular
        .module('easyOrder')
        .factory('menuService', menuService);

    menuService.$inject = ['$q', '$http', 'backendService'];

    function menuService($q, $http, backendService) {

        var service = {
            getMenu: getMenu,
            getMenuItem: getMenuItem,

        };

        return service;

        function getMenu(sectionId) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: backendService.backendUrl() + '/api/menu-section/' + sectionId + '/'
            }).then(function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(error) {
                deferred.resolve(error);
            });
            return deferred.promise;
        };
        function getMenuItem(itemId) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: backendService.backendUrl() + '/api/item/' + itemId
            }).then(function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };        
    };