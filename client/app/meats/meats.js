'use strict';

angular
  .module('easyOrder')
  .controller('meatsCtrl', ['$scope','$state', '$rootScope', '$stateParams', 'menuService', function($scope, $state,$rootScope, $stateParams, menuService) {
  
  $scope.items = [
    {id: 11, label: "meat1", price: 100, imgUrl: "../img/meat1.jpg", quantity: 1},
    {id: 12, label: "meat2", price: 200, imgUrl: "../img/meat1.jpg", quantity: 1},
    {id: 13, label: "meat3", price: 300, imgUrl: "../img/meat1.jpg", quantity: 1},
    {id: 14, label: "meat4", price: 400, imgUrl: "../img/meat1.jpg", quantity: 1},
    {id: 15, label: "meat5", price: 400, imgUrl: "../img/meat1.jpg", quantity: 1},
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