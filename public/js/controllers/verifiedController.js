// js/controllers/verifiedController.js
    
angular.module('verifiedController', [])

    .controller('verifiedController', function($scope, $http) {
        // A call to get info about unverified user with highest follower count
        $http.get('/api/users/featuredverified')
                .success(function(data) {
                    $scope.verifiedImage = data.profileImageUrl;
                    $scope.verifiedUsername = data.userName;
                    $scope.verifiedFollowers = data.followers;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });        
    });