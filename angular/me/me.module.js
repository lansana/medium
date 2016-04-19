(function() { 'use strict';

    angular
        .module('me', ['stories', 'settings'])
        .config(config);

    /**
     * @type {string[]}
     */
    config.$inject = ['$stateProvider'];

    /**
     * @param $stateProvider
     */
    function config($stateProvider) {
        $stateProvider
            .state('app.me', {
                url: '/me',
                abstract: true,
                data: {
                    permissions: {
                        only: ['isAuthenticated'],
                        redirectTo: 'app.home'
                    }
                }
            });
    }

})();