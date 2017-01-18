var PM = angular.module('PM', ['ui.router', 'ngMaterial']);


PM.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
    
    $urlRouterProvider.otherwise('/input');
    
    $stateProvider
        .state('input', {
            url: '/input',
            templateUrl: '/partials/input.html'
        })
        .state('result', {
            url: '/result',
            templateUrl: '/partials/result.html'      
        })
        .state('calculating', {
            url: '/calculating',
            templateUrl: '/partials/calculating.html'      
        });

    $mdThemingProvider.theme('default')
    .dark();
    $mdThemingProvider.theme('andrew')
    .primaryPalette('pink')
    .accentPalette('orange')
    .backgroundPalette('orange')
    .dark();
     $mdThemingProvider.theme('bong')
    .primaryPalette('pink')
    .accentPalette('orange')
    .backgroundPalette('blue')
    .dark();
     

        
});

PM.controller('PMCtrl', function($scope, $state, $sce, inputFactory, resultFactory) {
    $scope.data = {};
    $scope.name = '';
    $scope.input = '';
    $scope.addInput = function(name, input) {
        $scope.name = name;
        $scope.input = input;
        inputFactory.addInput(name, input)
        .then(function(resp) {
            $state.go('calculating');

            setTimeout(function() {
              $state.go('result');  
            }, 5000);
             
        })
     };

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
  }

  

     $scope.getResult = function() {
         resultFactory.getResult($scope.input)
         .then(function(resp){
            $scope.link = {src: resp.url};
             $scope.data.results = resp
         })
     }



})
.factory('inputFactory', function($http) {

    var addInput = function(n, inp){
        var data = {
            name: n,
            input: inp
        }
        console.log('data = ', data);
        return $http.post('/api/input', data)
        .then(function(resp){
            return resp;
        })
    }

    return {
        addInput: addInput
    }

})
.factory('resultFactory', function($http) {
      
      var getResult = function(input) {
          var data = {input: input} 
          return $http.post('/api/getCeleb', data)
          .then(function(resp) {
              return resp.data;
          })
      }
    
    return {
        getResult: getResult
    }
})