'use strict';

angular
  .module('easyOrder')
  .controller('drinksCtrl', ['$scope','$state', '$rootScope', '$stateParams', 'menuService', function($scope, $state,$rootScope, $stateParams, menuService) {
  
  $scope.items = [
    {id: 21, label: "drink1", price: 100, imgUrl: "../img/drink1.jpeg", quantity: 1},
    {id: 22, label: "drink2", price: 200, imgUrl: "../img/drink1.jpeg", quantity: 1},
    {id: 23, label: "drink3", price: 300, imgUrl: "../img/drink1.jpeg", quantity: 1},
    {id: 24, label: "drink4", price: 400, imgUrl: "../img/drink1.jpeg", quantity: 1},
    {id: 25, label: "drink5", price: 400, imgUrl: "../img/drink1.jpeg", quantity: 1},
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