(function() { 'use strict';

    angular
        .module('articles')
        .factory('articleService', articleService);

    /**
     * @type {string[]}
     */
    articleService.$inject = ['$rootScope', '$http', 'config', 'apiService'];

    /**
     * @param $rootScope
     * @param $http
     * @param config
     * @param apiService
     * @returns {{loadStories: loadStories, get: get, getTopStories: getTopStories, getAllForCategory: getAllForCategory, getUserDrafts: getUserDrafts, getUserPublished: getUserPublished, getUserUnpublished: getUserUnpublished, getPublic: getPublic, getDraft: getDraft, createPublic: createPublic, saveDraft: saveDraft, edit: edit, verifyEdit: verifyEdit, publish: publish, unpublish: unpublish, forceDelete: forceDelete, heart: heart, unheart: unheart}}
     */
    function articleService($rootScope, $http, config, apiService) {
        var loadStoriesUrl = '/articles?page=2',
            hasMoreStoriesToLoad = true,
            service = {
            loadStories: loadStories,
            get: get,
            getTopStories: getTopStories,
            getAllForCategory: getAllForCategory,
            getUserDrafts: getUserDrafts,
            getUserPublished: getUserPublished,
            getUserUnpublished: getUserUnpublished,
            getPublic: getPublic,
            getDraft: getDraft,
            createPublic: createPublic,
            saveDraft: saveDraft,
            edit: edit,
            verifyEdit: verifyEdit,
            publish: publish,
            unpublish: unpublish,
            forceDelete: forceDelete,
            heart: heart,
            unheart: unheart
        };

        return service;

        function loadStories() {
            if (hasMoreStoriesToLoad) {
                service
                    .get(loadStoriesUrl)
                    .then(function (res) {
                        if (res.hasOwnProperty('message')) {
                            hasMoreStoriesToLoad = false;
                        } else {
                            loadStoriesUrl = res.nextPageUrl;
                            $rootScope.$broadcast('stories:loaded', res.articles);
                        }
                    })
                    .catch(function (res) {
                        console.log('Error loading more stories: ', res);
                    });
            }
        }

        function get(url) {
            return $http.get(config.url + (url || '/articles'))
                .then(apiService.handleSuccess, apiService.handleError);
        }

        function getTopStories() {
            return $http.get(config.url + '/top-stories')
                .then(apiService.handleSuccess, apiService.handleError);
        }

        function getAllForCategory(slug) {
            return $http.get(config.url + '/category/' + slug)
                .then(apiService.handleSuccess, apiService.handleError);
        }

        function getUserDrafts() {
            return $http.get(config.url + '/articles/draft')
                .then(apiService.handleSuccess, apiService.handleError);
        }

        function getUserPublished() {
            return $http.get(config.url + '/articles/published')
                .then(apiService.handleSuccess, apiService.handleError);
        }

        function getUserUnpublished() {
            return $http.get(config.url + '/articles/unpublished')
                .then(apiService.handleSuccess, apiService.handleError);
        }

        function getPublic(slug) {
            return $http.get(config.url + '/articles/' + slug)
                .then(apiService.handleSuccess, apiService.handleError);
        }

        function getDraft(slug) {
            return $http.get(config.url + '/articles/' + slug + '/draft')
                .then(apiService.handleSuccess, apiService.handleError);
        }

        function createPublic(data) {
            return $http.post(config.url + '/articles/create/public', data)
                .then(apiService.handleSuccess, apiService.handleError);
        }

        function saveDraft(data) {
            return $http.put(config.url + '/articles/save/draft', data)
                .then(apiService.handleSuccess, apiService.handleError);
        }

        function edit(data, slug) {
            return $http.put(config.url + '/articles/' + slug + '/edit', data)
                .then(apiService.handleSuccess, apiService.handleError);
        }

        function verifyEdit(slug) {
            return $http.post(config.url + '/articles/' + slug + '/edit/verify')
                .then(apiService.handleSuccess, apiService.handleError);
        }

        function publish(slug) {
            return $http.put(config.url + '/articles/' + slug + '/publish')
                .then(apiService.handleSuccess, apiService.handleError);
        }

        function unpublish(slug) {
            return $http.put(config.url + '/articles/' + slug + '/unpublish')
                .then(apiService.handleSuccess, apiService.handleError);
        }

        function forceDelete(slug) {
            return $http.put(config.url + '/articles/' + slug + '/delete')
                .then(apiService.handleSuccess, apiService.handleError);
        }

        function heart(id) {
            return $http.put(config.url + '/articles/heart/' + id, null, {ignoreLoadingBar: true});
        }

        function unheart(id) {
            return $http.put(config.url + '/articles/unheart/' + id, null, {ignoreLoadingBar: true});
        }
    }

})();