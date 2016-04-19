(function () { 'use strict';

    angular
        .module('articles')
        .controller('ArticleHeadController', ArticleHeadController);

    /**
     * @type {string[]}
     */
    ArticleHeadController.$inject = ['articleResolver'];

    /**
     * @param articleResolver
     * @constructor
     */
    function ArticleHeadController(articleResolver) {
        var vm = this;
        vm.article = articleResolver.article;
    }

})();