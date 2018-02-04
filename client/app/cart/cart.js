'use strict';

angular
  .module('easyOrder')
  .controller('cartCtrl', ['$scope','$state', '$rootScope', '$stateParams', 'orderService', function($scope, $state,$rootScope, $stateParams, orderService) {
  
  $scope.items = $rootScope.order;
  $scope.isUserChoosing = $rootScope.isUserChoosing;
  $scope.tableNumber = "";
  $scope.errorText = "";


  $scope.validateTableNumber = function() {
    if (!parseInt($scope.tableNumber)) {
        $scope.errorText += 'Невалиден номер на маса! ';
        return false;
    };
    return true;
   }

  $scope.validateCart = function() {
    if ($scope.items.length == 0) {
        $scope.errorText += 'Вашата поръчка е празна!' ;
        return false; 
    }
    return true;
  }

  $scope.makeOrder = function() {
    if ($scope.validateCart() && $scope.validateTableNumber()) {
        $scope.errorText = '';
        var parsedItems = [];
        for (var i = 0; i < $scope.items.length; i++) {
          parsedItems.push({
            item: $scope.items[i].id,
            quantity: $scope.items[i].quantity
          })
        }
        orderService.makeOrder(parsedItems, $scope.tableNumber)
        .then(function (response) {
            alert("Успешно направихте поръчка!");
            $scope.isUserChoosing = false;
            $rootScope.isUserChoosing = false;
        })
        .catch(function (response) {
            alert('Неуспешна заявка за поръчка');
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

  $scope.removeFromOrder = function(item) {
    var index = $rootScope.order.indexOf(item);
    $rootScope.order.splice(index, 1);
    $rootScope.total -= item.price * item.quantity;   
  };
}]);