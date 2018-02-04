'use strict';

angular
  .module('easyOrder')
  .controller('cartCtrl', ['$scope','$state', '$rootScope', '$stateParams', 'orderService', function($scope, $state,$rootScope, $stateParams, orderService) {
  
  $scope.items = $rootScope.order;
  $scope.tableNumber = "";
  $scope.errorText = "";


  $scope.validateTableNumber = function() {
    if (!parseInt($scope.tableNumber)) {
        $scope.errorText += 'Invalid table number! ';
        return false;
    };
    return true;
   }

  $scope.validateCart = function() {
    if ($scope.items.length == 0) {
        $scope.errorText += 'Your order is empty! ';
        return false; 
    }
    return true;
  }

  $scope.makeOrder = function() {
    if ($scope.validateCart() && $scope.validateTableNumber()) {
        $scope.errorText = '';
        orderService.makeOrder($scope.items, $scope.tableNumber)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });
        }
    else {
        alert($scope.errorText);
        $scope.errorText = '';
    }
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