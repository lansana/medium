(function () { 'use strict';

    angular
        .module('auth')
        .factory('authService', authService);

    /**
     * @type {string[]}
     */
    authService.$inject = ['$http', '$auth', '$state', 'apiService', 'userService', 'config'];

    /**
     * @param $http
     * @param $auth
     * @param $state
     * @param apiService
     * @param userService
     * @param config
     * @returns {{signup: signup, login: login, logout: logout, sendResetLink: sendResetLink, resetPassword: resetPassword, verifyToken: verifyToken}}
     */
    function authService($http, $auth, $state, apiService, userService, config) {
        var service = {
            signup: signup,
            login: login,
            logout: logout,
            sendResetLink: sendResetLink,
            resetPassword: resetPassword,
            verifyToken: verifyToken
        };

        return service;

        function signup(credentials) {
            return $http.post(config.url + '/signup', credentials);
        }

        function login(credentials) {
            return $auth.login(credentials).then(function() {
                return $http.get(config.url + '/authenticate/user')
                    .then(apiService.handleSuccess, apiService.handleError);
            });
        }

        function logout() {
            return $http.post(config.url + '/logout').then(function () { // Invalidate token in server
                return $auth.logout().then(function () { // Remove token from local storage
                    userService.removeUser(); // Remove user from local storage
                    $state.go('app.home');
                });
            });
        }

        function sendResetLink(email) {
            return $http.post(config.url + '/reset', email)
                .then(apiService.handleSuccess, apiService.handleError);
        }

        function resetPassword(token, credentials) {
            return $http.post(config.url + '/reset/' + token, credentials)
                .then(apiService.handleSuccess, apiService.handleError);
        }

        function verifyToken(token) {
            return $http.get(config.url + '/reset/verify/' + token);
        }
    }

})();