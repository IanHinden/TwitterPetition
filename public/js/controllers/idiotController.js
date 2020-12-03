// js/controllers/idiotController.js
    
angular.module('idiotController', [])

    .controller('idiotController', function($scope, $http) {
        // A call to check if there is currently a session
        $http.get('/api/idiot')
                .success(function(data) {
                    let adjusted = data.data[0].followers_count * .4;
                    $scope.idiot = data.data[0].followers_count;
                    $scope.adjusted = adjusted;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });        
    });