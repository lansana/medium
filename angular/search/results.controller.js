(function() { 'use strict';

    angular
        .module('search')
        .controller('SearchResultsController', SearchResultsController);

    /**
     * @type {string[]}
     */
    SearchResultsController.$inject = ['searchResolver'];

    /**
     * @param searchResolver
     * @constructor
     */
    function SearchResultsController(searchResolver) {
        var vm = this;
        vm.articles = searchResolver.articles;
        vm.categories = searchResolver.categories;
        vm.users = searchResolver.users;
        vm.results = (vm.articles.length > 0 || vm.categories.length > 0 || vm.users.length > 0);
    }

})();