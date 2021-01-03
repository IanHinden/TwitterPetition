// js/controllers/unverifiedController.js
    
angular.module('unverifiedController', [])

    .controller('unverifiedController', function($scope, $http) {
        // A call to get info about unverified user with highest follower count
        $http.get('/api/users/featuredunverified')
                .success(function(data) {
                    $scope.unverifiedImage = data.profileImageUrl;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });        
    });