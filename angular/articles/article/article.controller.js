(function () { 'use strict';

    angular
        .module('articles')
        .controller('ArticleController', ArticleController);

    /**
     * @type {string[]}
     */
    ArticleController.$inject = ['articleResolver'];

    /**
     * @param articleResolver
     * @constructor
     */
    function ArticleController(articleResolver) {
        var vm = this;
        vm.article = articleResolver.article;
        vm.author = articleResolver.author;
    }

})();