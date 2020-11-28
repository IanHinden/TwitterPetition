// js/controllers/main.js
    
angular.module('userController', [])

    .controller('mainController', function($scope, $http) {
        $scope.formData = {};

        // when landing on the page, get all todos and show them
        $http.get('/api/users')
                .success(function(data) {
                        $scope.users = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });
    });