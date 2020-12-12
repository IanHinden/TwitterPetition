// js/controllers/sessionController.js
    
angular.module('sessionController', [])

    .controller('sessionController', function($scope, $http) {
        // A call to check if there is currently a session
        $http.get('/session')
                .success(function(data) {
                    $scope.session = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });        
    });