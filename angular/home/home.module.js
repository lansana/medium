(function() { 'use strict';

    angular
        .module('home', [])
        .config(config);

    /**
     * @type {string[]}
     */
    config.$inject = ['$stateProvider'];

    /**
     * @type {string[]}
     */
    articlesResolver.$inject = ['articleService'];

    /**
     * @param $stateProvider
     */
    function config($stateProvider) {
        $stateProvider
            .state('app.home', {
                url: '/',
                views: {
                    'head': {
                        templateUrl: 'app/home/head.html'
                    },
                    'header': {
                        templateUrl: 'app/home/header.html',
                        controller: 'HomeHeaderController as vm'
                    },
                    'content': {
                        templateUrl: 'app/home/content.html',
                        controller: 'HomeContentController as vm'
                    }
                },
                resolve: {
                    articlesResolver: articlesResolver
                }
            });
    }

    /**
     * @param articleService
     * @returns {*}
     */
    function articlesResolver(articleService) {
        return articleService.get();
    }

})();