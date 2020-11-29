// js/controllers/sessionController.js
    
angular.module('sessionController', [])

    .controller('sessionController', function($scope, $http) {
        $scope.formData = {};

        // when landing on the page, get all todos and show them
        $http.get('/session')
                .success(function(data) {
                        $scope.session = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });        
    });