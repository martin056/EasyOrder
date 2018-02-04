(function () {
  'use strict';

  // Declare app level module which depends on views, and app/components
  angular
    .module('easyOrder', ['ui.router', 'ngCookies'])
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state({
        name: 'home',
        url: '/home',
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl',
        controllerAs: '$scope'
        })  
        .state({
          name: 'pizzas',
          url: '/pizzas',
          templateUrl: 'pizzas/pizzas.html',
          controller: 'pizzasCtrl',
          controllerAs: 'pizzasCtrl'
        })
        .state({
          name: 'salads',
          url: '/salads',
          templateUrl: 'salads/salads.html',
          controller: 'saladsCtrl',
          controllerAs: 'saladsCtrl'
        })
        .state({
          name: 'meats',
          url: '/meats',
          templateUrl: 'meats/meats.html',
          controller: 'meatsCtrl',
          controllerAs: 'meatsCtrl'
        })
        .state({
          name: 'desserts',
          url: '/desserts',
          templateUrl: 'desserts/desserts.html',
          controller: 'dessertsCtrl',
          controllerAs: 'dessertsCtrl'
        })
        .state({
          name: 'drinks',
          url: '/drinks',
          templateUrl: 'drinks/drinks.html',
          controller: 'drinksCtrl',
          controllerAs: 'drinksCtrl'
        })
        .state({
          name: 'cart',
          url: '/cart',
          templateUrl: 'cart/cart.html',
          controller: 'cartCtrl',
          controllerAs: 'cartCtrl'
        })
        // .state({
        //   name: 'ideaDetails',
        //   url: '/ideaDetails/{ideaId}',
        //   templateUrl: 'app/components/ideaDetails/ideaDetails.html',
        //   controller: 'ideaDetailsCtrl',
        //   controllerAs: 'vm'
        // })

      $urlRouterProvider.otherwise('/home');
    })
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.withCredentials = true;
    }]);
})();