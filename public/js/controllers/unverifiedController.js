// js/controllers/unverifiedController.js
    
angular.module('unverifiedController', [])

    .controller('unverifiedController', function($scope, $http) {
        // A call to get info about unverified user with highest follower count
        $http.get('/api/users/featuredunverified')
                .success(function(data) {
                    $scope.unverifiedImage = data.profileImageUrl;
                    $scope.unverifiedUsername = data.userName;
                    $scope.unverifiedFollowers = data.followers;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });        
    });