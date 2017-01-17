var PM = angular.module('PM', ['ui.router', 'ngMaterial']);


PM.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/input');
    
    $stateProvider
        .state('input', {
            url: '/input',
            templateUrl: '/partials/input.html'
        })
        .state('result', {
            url: '/result',
            templateUrl: '/partials/result.html'      
        });
        
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
             $state.transitionTo('result');
        })
     };

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
  }

  

     $scope.getResult = function() {
         console.log('is getResult firing? ', $scope.input )
         resultFactory.getResult($scope.input)
         .then(function(resp){
             console.log('celeb data returning? ', resp);


            $scope.link = {src: resp.url};
             console.log($scope.link)
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