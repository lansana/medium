(function () {
    'use strict';

    angular
        .module('stories')
        .controller('UnpublishedController', UnpublishedController);

    /**
     * @type {string[]}
     */
    UnpublishedController.$inject = ['unpublishedResolver', 'meStoriesService', 'articleService', 'modalService', '$rootScope'];

    /**
     * @param unpublishedResolver
     * @param meStoriesService
     * @param articleService
     * @param modalService
     * @param $rootScope
     * @constructor
     */
    function UnpublishedController(unpublishedResolver, meStoriesService, articleService, modalService, $rootScope) {
        var vm = this;
        vm.articles = unpublishedResolver.articles;
        vm.message = unpublishedResolver.message || "You don't have any unpublished stories.";
        vm.publish = publish;
        vm.forceDelete = forceDelete;

        function publish(slug) {
            var modalOptions = {
                actionButtonText: 'Publish',
                headerText: 'Publish',
                bodyText: 'Published stories are viewable by the public.'
            };

            modalService
                .showModal({}, modalOptions)
                .then(function () {
                    articleService
                        .publish(slug)
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

        function forceDelete(slug) {
            var modalOptions = {
                actionButtonText: 'Delete',
                headerText: 'Delete',
                bodyText: 'Deleted stories are gone forever. Are you sure?'
            };

            modalService
                .showModal({}, modalOptions)
                .then(function () {
                    articleService
                        .forceDelete(slug)
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