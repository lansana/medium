(function() { 'use strict';

    angular
        .module('services')
        .factory('userService', userService);

    /**
     * @type {string[]}
     */
    userService.$inject = ['$rootScope'];

    /**
     * @param $rootScope
     * @returns {{initialize: initialize, setUser: setUser, removeUser: removeUser}}
     */
    function userService($rootScope) {
        var service = {
            initialize: initialize,
            setUser: setUser,
            removeUser: removeUser
        };

        return service;

        /**
         * Checks the authenticated of user on initial page load.
         */
        function initialize() {
            var user = localStorage.getItem('user');

            if (user !== null)
                activateUserInRootScope(user, true);
            else
                disableUserInRootScope();

        }

        /**
         * Set and authenticate user.
         *
         * @param user
         */
        function setUser(user) {
            setUserInLocalStorage(user);
            activateUserInRootScope(user);
        }

        /**
         * Remove and de-authenticate user.
         */
        function removeUser() {
            removeUserFromLocalStorage();
            disableUserInRootScope();
        }

        /**
         * Set user in local storage.
         *
         * @param user
         */
        function setUserInLocalStorage(user) {
            localStorage.setItem('user', JSON.stringify(user));
        }

        /**
         * Remove user from local storage.
         */
        function removeUserFromLocalStorage() {
            localStorage.removeItem('user');
        }

        /**
         * Set and authenticate user in $rootScope.
         *
         * @param user
         * @param shouldParse (Optional; set to 'true' if user is string that needs
         *                     to be parsed to JSON. Usually needed if user is coming
         *                     from local storage.)
         */
        function activateUserInRootScope(user, shouldParse) {
            $rootScope.$broadcast('authenticated');

            if (shouldParse)
                $rootScope.currentUser = JSON.parse(user);
            else
                $rootScope.currentUser = user;

        }

        /**
         * Remove and de-authenticate user from $rootScope.
         */
        function disableUserInRootScope() {
            $rootScope.$broadcast('unauthenticated');
            $rootScope.currentUser = null;
        }
    }

})();