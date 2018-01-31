'use strict';

angular
  .module('easyOrder')
  .controller('saladsCtrl', ['$scope','$state', '$rootScope', '$stateParams', 'menuService', function($scope, $state,$rootScope, $stateParams, menuService) {
  
  $scope.items = [
    {id: 5, label: "Italian Fresh Chopped Salad With Ruccola And Tomatoes", price: 6.20, imgUrl: "../img/salad2.jpg", quantity: 1},
    {id: 6, label: "Chicken, Gorgonzola, Pear, And Walnut Salad", price: 5.80, imgUrl: "../img/salad3.jpg", quantity: 1},
    {id: 7, label: "Blackberry & Walnut Summer Salad", price: 6.10, imgUrl: "../img/salad4.jpg", quantity: 1},
    {id: 8, label: "Kale, Grapefruit, & Avocado Detox Salad", price:4.90, imgUrl: "../img/salad5.jpg", quantity: 1},
    {id: 10, label: "Broccoli & Apple Salad", price: 6.70, imgUrl: "../img/salad6.jpg", quantity: 1},
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