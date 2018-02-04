  'use strict';

  angular
    .module('easyOrder')
    .controller('pizzasCtrl', ['$scope','$state', '$rootScope', '$stateParams', 'menuService', function($scope, $state,$rootScope, $stateParams, menuService) {
    
    var vm = this;
    vm.getMenu = $scope.getMenu;
    $scope.items = [];

    getMenu();

    // $scope.getMenu = function() {
    //   menuService.getMenu(4)
    //     .then(function (response) {
    //       $scope.items = response;
    //     })
    //     .catch(function (response) {
    //       console.log(response);
    //     });
    // };

   function getMenu() {
      menuService.getMenu(4)
        .then(function (response) {
          $scope.items = response;
        })
        .catch(function (response) {
          console.log(response);
        });
    };

    $scope.isItemInOrder = function(item) {
      for (var i = 0; i < $rootScope.order.length; i++) {
        if ($rootScope.order[i].id == item.id) {
          return true;
        }
      }
      return false;
    }

    $scope.addToOrder = function(item) {
      console.log(item);
      // $scope.item.quantity = item.quantity;
      $rootScope.total += item.price * item.quantity;
      if ($scope.isItemInOrder(item)) {
        for (var i = 0; i < $rootScope.order.length; i++) {
          if ($rootScope.order[i].id == item.id) {
            $rootScope.order[i].quantity += item.quantity;
          }
        }
      } else {
        $rootScope.order.push(angular.copy(item));
      }
      console.log($rootScope.order);  
      alert('Item was added to the order');
    };



  }]);