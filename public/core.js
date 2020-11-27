const twitterPetition = angular.module('twitterPetition', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/users')
        .success(function(data) {
            $scope.users = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

}