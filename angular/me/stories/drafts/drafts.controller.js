(function () { 'use strict';

    angular
        .module('stories')
        .controller('DraftsController', DraftsController);

    /**
     * @type {string[]}
     */
    DraftsController.$inject = ['draftsResolver', 'meStoriesService', 'articleService', 'modalService', '$rootScope'];

    /**
     * @param draftsResolver
     * @param meStoriesService
     * @param articleService
     * @param modalService
     * @param $rootScope
     * @constructor
     */
    function DraftsController(draftsResolver, meStoriesService, articleService, modalService, $rootScope) {
        var vm = this;
        vm.drafts = draftsResolver.drafts;
        vm.message = draftsResolver.message || "You have no drafts.";
        vm.forceDelete = forceDelete;

        function forceDelete(slug) {
            var modalOptions = {
                actionButtonText: 'Delete',
                headerText: 'Delete',
                bodyText: 'Deleted drafts are gone forever. Are you sure?'
            };

            modalService
                .showModal({}, modalOptions)
                .then(function () {
                    articleService
                        .forceDelete(slug)
                        .then(function(res) {
                            meStoriesService.removeFromCollection(vm.drafts, slug);

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