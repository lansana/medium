(function() { 'use strict';

    angular
        .module('home')
        .controller('HomeContentController', HomeContentController);

    /**
     * @type {string[]}
     */
    HomeContentController.$inject = ['articlesResolver', 'articleService'];

    /**
     * @param articlesResolver
     * @param articleService
     * @constructor
     */
    function HomeContentController(articlesResolver, articleService) {
        var vm = this;
        vm.articles = articlesResolver.articles;
        vm.topArticles = [];
        vm.categories = [];
        vm.loadStories = articleService.loadStories;

        getTopStories();
        addFeaturedCategories();

        function getTopStories() {
            articleService
                .getTopStories()
                .then(function(res) {
                    vm.topArticles = res.articles;
                })
                .catch(function(res) {
                    console.log('Error fetching top stories: ', res);
                });
        }

        function addFeaturedCategories() {
            for (var i = 0; i < vm.articles.length; i++) {
                if (vm.articles[i].categories) {
                    for (var j = 0; j < vm.articles[i].categories.length; j++) {
                        if (!alreadyExists(vm.articles[i].categories[j])) {
                            vm.categories.push(vm.articles[i].categories[j]);
                        }
                    }
                }
            }
        }

        function alreadyExists(val) {
            return vm.categories.some(function (arrVal) {
                return Object.is(JSON.stringify(val), JSON.stringify(arrVal));
            });
        }
    }

})();

