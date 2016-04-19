(function() { 'use strict';

    angular
        .module('search')
        .factory('searchService', searchService);

    /**
     * @type {string[]}
     */
    searchService.$inject = ['$http', 'apiService', 'config'];

    /**
     * @param $http
     * @param apiService
     * @param config
     * @returns {{all: all, findCategories: findCategories}}
     */
    function searchService($http, apiService, config) {
        var service = {
            all: all,
            findCategories: findCategories
        };

        return service;

        function all(q) {
            return $http.get(config.url + '/search?q=' + q)
                .then(apiService.handleSuccess, apiService.handleError);
        }

        function findCategories(q) {
            return $http.get(config.url + '/search/categories?q=' + q)
                .then(apiService.handleSuccess, apiService.handleError);
        }
    }

})();