  'use strict';

  angular
    .module('easyOrder')
    .controller('pizzasCtrl', ['$scope','$state', '$rootScope', '$stateParams', 'menuService', function($scope, $state,$rootScope, $stateParams, menuService) {
    
    $scope.items = [
      {id: 1, label: "pizza1", price: 100, imgUrl: "../img/slide-1.jpeg", quantity: 1},
      {id: 2, label: "pizza2", price: 200, imgUrl: "../img/slide-1.jpeg", quantity: 1},
      {id: 3, label: "pizza3", price: 300, imgUrl: "../img/slide-1.jpeg", quantity: 1},
      {id: 4, label: "pizza4", price: 400, imgUrl: "../img/slide-1.jpeg", quantity: 1},
    ]

    $scope.getMenu = function() {
      menuService.getMenu()
        .then(function (response) {
          console.log(response);
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