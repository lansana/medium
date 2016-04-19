(function() { 'use strict';

    angular
        .module('404', [])
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
            .state('app.404', {
                views: {
                    'wide-content': {
                        templateUrl: 'app/404/404.html',
                        controller: 'NotFoundController as vm'
                    }
                },
                params: {
                    message: null
                }
            });
    }

})();