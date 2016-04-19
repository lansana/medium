(function() { 'use strict';

    angular
        .module('config')
        .constant('config', {
            url: 'http://' + window.location.hostname + '/api/v1',
            version: '1.0.0'
        })
        .config(config)
        .factory('configService', configService);

    /**
     * @type {string[]}
     */
    config.$inject = ['$provide', 'cfpLoadingBarProvider'];

    /**
     * @type {string[]}
     */
    configService.$inject = ['$rootScope', '$document'];

    /**
     * @param $provide
     * @param cfpLoadingBarProvider
     */
    function config($provide) {
        // Decorating '$state' with 'toState', 'toParams', 'fromState' and 'fromParams' for ease of use
        // throughout the app without where listening for stateChange events is not possible/ideal.
        $provide.decorator('$state', function($delegate, $rootScope) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                $delegate.toState = toState;
                $delegate.toParams = toParams;
                $delegate.fromState = fromState;
                $delegate.fromParams = fromParams;
            });

            return $delegate;
        });
    }

    /**
     * @param $rootScope
     * @param $document
     * @returns {{initialize: initialize, prepareDocument: prepareDocument}}
     */
    function configService($rootScope, $document) {
        var service = {
            initialize: initialize,
            prepareDocument: prepareDocument
        };

        return service;

        function initialize() {
            service.prepareDocument();
        }

        function prepareDocument() {
            // Scroll to top on new state
            $rootScope.$on("$stateChangeSuccess", function () {
                $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
            });
        }
    }

})();