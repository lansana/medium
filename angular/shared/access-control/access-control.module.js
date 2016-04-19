(function() { 'use strict';

    angular
        .module('access-control', [])
        .run(run);

    /**
     * @type {string[]}
     */
    run.$inject = ['$auth', '$q', 'authService', 'PermissionStore', 'RoleStore', 'articleService'];

    /**
     * @param $auth
     * @param $q
     * @param authService
     * @param PermissionStore
     * @param RoleStore
     * @param articleService
     */
    function run($auth, $q, authService, PermissionStore, RoleStore, articleService) {
        /**
         * Set permissions.
         */
        initializePermissions();
        initializeRoles();

        /**
         * Define all permissions for app.
         */
        function initializePermissions() {
            PermissionStore.definePermission('isAnonymous', isAnonymous);
            PermissionStore.definePermission('isAuthenticated', isAuthenticated);
            PermissionStore.definePermission('isTokenValid', isTokenValid);
        }

        /**
         * Define all roles for the app.
         */
        function initializeRoles() {
            RoleStore.defineRole('isEditableByUser', [], isEditableByUser);
        }

        /**
         * Check if user is anonymous.
         *
         * @returns {boolean}
         */
        function isAnonymous() {
            return !$auth.isAuthenticated();
        }

        /**
         * Check if user is authenticated.
         *
         * @returns {boolean}
         */
        function isAuthenticated() {
            return $auth.isAuthenticated();
        }

        /**
         * Verify token in server.
         *
         * @param stateParams
         * @returns {*}
         */
        function isTokenValid(stateParams) {
            var deferred = $q.defer();

            authService
                .verifyToken(stateParams.token)
                .then(function(res) {
                    if (res.status == 200) {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                })
                .catch(function() {
                    deferred.reject(); // Error with request
                });

            return deferred.promise;
        }

        /**
         * Verify the authenticated user with the article
         * they are trying to edit. Only the owner can access
         * the edit page of a given article.
         *
         * @param stateParams
         * @returns {*}
         */
        function isEditableByUser(stateParams) {
            var deferred = $q.defer();

            articleService
                .verifyEdit(stateParams.articleSlug)
                .then(function(res) {
                    if (res.status == 200) {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                })
                .catch(function() {
                    deferred.reject();
                });

            return deferred.promise;
        }
    }

})();