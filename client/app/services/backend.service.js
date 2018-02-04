'use strict';

    angular
        .module('easyOrder')
        .factory('backendService', backendService);

    function backendService() {

        var _SERVER = 'http://localhost:8000';

        var service = {
            backendUrl: backendUrl
        };
        return service;

        function backendUrl() {
            return _SERVER;
        };
    };