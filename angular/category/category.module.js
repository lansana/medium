(function() { 'use strict';

    angular
        .module('category', [])
        .config(config);

    /**
     * @type {string[]}
     */
    config.$inject = ['$stateProvider'];

    /**
     * @type {string[]}
     */
    categoryResolver.$inject = ['$stateParams', 'articleService'];

    /**
     * @param $stateProvider
     */
    function config($stateProvider) {
        $stateProvider
            .state('app.category', {
                url: '/category/:categorySlug',
                views: {
                    'head': {
                        templateUrl: 'app/category/head.html',
                        controller: 'CategoryHeadController as vm'
                    },
                    'header': {
                        templateUrl: 'app/category/header.html',
                        controller: 'CategoryHeaderController as vm'
                    },
                    'wide-content': {
                        templateUrl: 'app/category/content.html',
                        controller: 'CategoryContentController as vm'
                    }
                },
                resolve: {
                    categoryResolver: categoryResolver
                }
            });
    }

    function categoryResolver($stateParams, articleService) {
        return articleService.getAllForCategory($stateParams.categorySlug);
    }

})();