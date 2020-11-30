// js/controllers/main.js
    
angular.module('userController', [])

    .controller('mainController', function($scope, $http) {
        $scope.formData = {};

        // when landing on the page, get all todos and show them
        $http.get('/api/users')
                .success(function(data) {
                        let sum = 0;
                        for(let i=0; i<data.length; i++){
                            sum += data[i].followers;
                        }

                        $scope.users = data;
                        $scope.totalFollowers = sum;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });

        $scope.getUser = function(userName) {
            $http.get('/api/users/' + userName)
                .success(function(data) {
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                    });
                };

        $scope.createUser = function() {
            $http.post('/api/users/send', $scope.formData)
                .success(function(data) {
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            };

        $scope.twitterLogin = function() {
            $http.get('/auth/twitter', $scope.formData)
                .success(function(data) {
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            };

        $scope.twitterLogout = function() {
            $http.get('/logout', $scope.formData)
                .success(function(data) {
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            };
            
    });