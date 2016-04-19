(function () { 'use strict';

    angular
        .module('stories')
        .controller('PublishedController', PublishedController);

    /**
     * @type {string[]}
     */
    PublishedController.$inject = ['publishedResolver', 'meStoriesService', 'articleService', 'modalService', '$rootScope'];

    /**
     * @param publishedResolver
     * @param meStoriesService
     * @param articleService
     * @param modalService
     * @param $rootScope
     * @constructor
     */
    function PublishedController(publishedResolver, meStoriesService, articleService, modalService, $rootScope) {
        var vm = this;
        vm.articles = publishedResolver.articles;
        vm.message = publishedResolver.message || "You haven't published any stories yet.";
        vm.unpublish = unpublish;

        function unpublish(slug) {
            vm.articleSlug = slug;

            var modalOptions = {
                actionButtonText: 'Unpublish',
                headerText: 'Unpublish',
                bodyText: 'Unpublished stories are hidden from the public.'
            };

            modalService
                .showModal({}, modalOptions)
                .then(function() {
                    articleService
                        .unpublish(slug)
                        .then(function(res) {
                            meStoriesService.removeFromCollection(vm.articles, slug);

                            $rootScope.$broadcast('message', {
                                message: res.message
                            });
                        })
                        .catch(function(res) {
                            console.log(res);
                        });
                });
        }
    }

})();