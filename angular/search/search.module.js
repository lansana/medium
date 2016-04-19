(function() { 'use strict';

    angular
        .module('search', [])
        .config(config)
        .run(run);

    /**
     * @type {string[]}
     */
    config.$inject = ['$stateProvider'];

    /**
     * @type {string[]}
     */
    run.$inject = ['$rootScope', '$state'];

    /**
     * @type {string[]}
     */
    searchResolver.$inject = ['$stateParams', 'searchService'];

    /**
     * @param $stateProvider
     */
    function config($stateProvider) {
        $stateProvider
            .state('app.search', {
                url: '/search?q',
                views: {
                    'search-header': {
                        templateUrl: 'app/search/header.html',
                        controller: 'SearchHeaderController as vm'
                    },
                    'wide-content': {
                        templateUrl: 'app/search/content.html'
                    }
                }
            })
            .state('app.search.results', {
                views: {
                    'results@app.search': {
                        templateUrl: 'app/search/results.html',
                        controller: 'SearchResultsController as vm'
                    }
                },
                resolve: {
                    searchResolver: searchResolver
                }
            });
    }

    /**
     * @param $rootScope
     * @param $state
     */
    function run($rootScope, $state) {
        // If '/search' is loaded via refresh or direct access from address bar and
        // it contains a query string, go to the results state with the query string.
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
            if (toState.name == 'app.search' && toParams.q) {
                event.preventDefault();

                $state.go('app.search.results', {
                    q: toParams.q
                });
            }
        });
    }

    /**
     * @param $stateParams
     * @param searchService
     * @returns {Promise|*|{src}|{options}}
     */
    function searchResolver($stateParams, searchService) {
        return searchService.all($stateParams.q);
    }

})();