// js/controllers/sessionController.js
    
angular.module('sessionController', [])

    .controller('sessionController', function($scope, $http) {
        // when landing on the page, get all users and show them
        $http.get('/session')
                .success(function(data) {
                    console.log(data);
                    $scope.session = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });        
    });