(function () { 'use strict';

    angular
        .module('stories', [])
        .config(config)
        .run(run);

    /**
     * @type {string[]}
     */
    config.$inject = ['$stateProvider'];

    /**
     * @type {string[]}
     */
    run.$inject = ['redirectService'];

    /**
     * @type {string[]}
     */
    draftsResolver.$inject = ['articleService'];

    /**
     * @type {string[]}
     */
    publishedResolver.$inject = ['articleService'];

    /**
     * @type {string[]}
     */
    unpublishedResolver.$inject = ['articleService'];

    /**
     * @param $stateProvider
     */
    function config($stateProvider) {
        $stateProvider
            .state('app.me.stories', {
                url: '/stories',
                views: {
                    'head@app': {
                        templateUrl: 'app/me/stories/head.html'
                    },
                    'wide-content@app': {
                        templateUrl: 'app/me/stories/stories.html'
                    }
                },
                default: 'app.me.stories.drafts',
                params: {
                    menu: 'stories'
                }
            })
            .state('app.me.stories.drafts', {
                url: '/drafts',
                views: {
                    '@app.me.stories': {
                        templateUrl: 'app/me/stories/drafts/drafts.html',
                        controller: 'DraftsController as vm'
                    }
                },
                resolve: {
                    draftsResolver: draftsResolver
                }
            })
            .state('app.me.stories.published', {
                url: '/published',
                views: {
                    '@app.me.stories': {
                        templateUrl: 'app/me/stories/published/published.html',
                        controller: 'PublishedController as vm'
                    }
                },
                resolve: {
                    publishedResolver: publishedResolver
                }
            })
            .state('app.me.stories.unpublished', {
                url: '/unpublished',
                views: {
                    '@app.me.stories': {
                        templateUrl: 'app/me/stories/unpublished/unpublished.html',
                        controller: 'UnpublishedController as vm'
                    }
                },
                resolve: {
                    unpublishedResolver: unpublishedResolver
                }
            });
    }

    /**
     * @param redirectService
     */
    function run(redirectService) {
        redirectService.goDefaultChildState();
    }

    /**
     * @param articleService
     * @returns {*}
     */
    function draftsResolver(articleService) {
        return articleService.getUserDrafts();
    }

    /**
     * @param articleService
     * @returns {*}
     */
    function publishedResolver(articleService) {
        return articleService.getUserPublished();
    }

    /**
     * @param articleService
     * @returns {*}
     */
    function unpublishedResolver(articleService) {
        return articleService.getUserUnpublished();
    }

})();