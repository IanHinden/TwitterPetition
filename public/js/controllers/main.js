// js/controllers/main.js
    
angular.module('userController', [])

    .controller('mainController', function($scope, $http) {
        $scope.formData = {};

        // when landing on the page, get all todos and show them
        $http.get('/api/sum')
                .success(function(data) {
                    $scope.totalFollowers = data[0].total;
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
        
        $scope.updatePledge = function(userId, pledge) {
            $http.post('/api/users/pledge/' + userId + '/' + pledge)
                .success(function(data) {
                    console.log($);
                    $(document).ready(function(){
                        $('#successToast').toast({animation: false, delay: 2000});
                        $("#successToast").toast('show');
                    });
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });   
            };

        $scope.updateOptions = function(userId, featured, email) {
            $http.post('/api/users/options/' + userId + '/' + featured + '/' + email)
                .success(function(data) {
                    console.log($);
                    $(document).ready(function(){
                        $('#successToast').toast({animation: false, delay: 2000});
                        $("#successToast").toast('show');
                    });
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });   
            };
            
    });