'use strict';
    angular
        .module('easyOrder')
        .controller('AppCtrl', ['$scope', '$state', '$rootScope', function ($scope, $state, $rootScope) {
      
          $rootScope.total = 0;
          $rootScope.order = [];
          $rootScope.isUserChoosing = true;         
        }])
        .config(['$locationProvider', function($locationProvider) {
          $locationProvider.hashPrefix('');
        }]);