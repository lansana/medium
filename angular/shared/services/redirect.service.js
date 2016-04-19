(function() { 'use strict';

    angular
        .module('services')
        .factory('redirectService', redirectService);

    /**
     * @type {string[]}
     */
    redirectService.$inject = ['$rootScope', '$state'];

    /**
     * @param $rootScope
     * @param $state
     * @returns {{goDefaultChildState: goDefaultChildState}}
     */
    function redirectService($rootScope, $state) {
        var service = {
            goDefaultChildState: goDefaultChildState
        };

        return service;

        // This is used for states that have sub-menus. Each sub-menu
        // should have it's own state, and a default child state is set
        // in the state to be redirected to using this function.
        function goDefaultChildState() {
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
                if (toState.default) {
                    event.preventDefault();

                    $state.go(toState.default, toParams);
                }
            });
        }
    }

})();