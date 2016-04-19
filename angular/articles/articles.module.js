(function () { 'use strict';

    angular
        .module('articles', [])
        .config(config);

    /**
     * @type {string[]}
     */
    config.$inject = ['$stateProvider'];

    /**
     * @type {string[]}
     */
    articleResolver.$inject = ['$stateParams', 'articleService'];

    /**
     * @type {string[]}
     */
    writeOrEditResolver.$inject = ['$state', 'articleService'];

    /**
     * @param $stateProvider
     */
    function config($stateProvider) {
        $stateProvider
            .state('app.article', {
                url: '/@:username/:articleSlug',
                views: {
                    'head': {
                        templateUrl: 'app/articles/article/head.html',
                        controller: 'ArticleHeadController as vm'
                    },
                    'article-content': {
                        templateUrl: 'app/articles/article/article.html',
                        controller: 'ArticleController as vm'
                    }
                },
                resolve: {
                    articleResolver: articleResolver
                }
            })
            .state('app.write', {
                url: '/write',
                data: {
                    permissions: {
                        only: ['isAuthenticated'],
                        redirectTo: 'app.home'
                    }
                },
                views: {
                    'head': {
                        templateUrl: 'app/articles/write-or-edit/head.html'
                    },
                    'wide-content': {
                        templateUrl: 'app/articles/write-or-edit/write-or-edit.html',
                        controller: 'WriteOrEditController as vm'
                    }
                },
                resolve: {
                    writeOrEditResolver: writeOrEditResolver
                }
            })
            .state('app.edit', {
                url: '/@:username/:articleSlug/edit?draft',
                data: {
                    permissions: {
                        only: ['isAuthenticated'],
                        redirectTo: 'app.home'
                    }
                },
                views: {
                    'head': {
                        templateUrl: 'app/articles/write-or-edit/head.html'
                    },
                    'wide-content': {
                        templateUrl: 'app/articles/write-or-edit/write-or-edit.html',
                        controller: 'WriteOrEditController as vm'
                    }
                },
                params: {
                    title: null,
                    body: null,
                    categories: null,
                    draft: {
                        value: 'false',
                        squash: true
                    }
                },
                resolve: {
                    writeOrEditResolver: writeOrEditResolver
                }
            });
    }

    /**
     * @param $stateParams
     * @param articleService
     * @returns {*}
     */
    function articleResolver($stateParams, articleService) {
        return articleService.getPublic($stateParams.articleSlug);
    }

    /**
     * @param $state
     * @param articleService
     * @returns {*}
     */
    function writeOrEditResolver($state, articleService) {
        // Fetch a draft
        if ($state.toParams.draft === 'true') {
            return articleService.getDraft($state.toParams.articleSlug);
        }
        // Fetch a public story
        else if ($state.toParams.draft === 'false') {
            return articleService.getPublic($state.toParams.articleSlug);
        }
    }

})();