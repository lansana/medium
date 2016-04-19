(function () { 'use strict';

    angular
        .module('category')
        .controller('CategoryContentController', CategoryContentController);

    /**
     * @type {string[]}
     */
    CategoryContentController.$inject = ['categoryResolver'];

    /**
     * @param categoryResolver
     * @constructor
     */
    function CategoryContentController(categoryResolver) {
        var vm = this;
        vm.articles = categoryResolver.articles;
    }

})();