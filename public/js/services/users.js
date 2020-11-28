// js/services/todos.js
angular.module('userService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Users', function($http) {
        return {
            get : function() {
                return $http.get('/api/users');
            },
        }
    });