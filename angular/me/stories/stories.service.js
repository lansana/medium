(function() { 'use strict';

    angular
        .module('me')
        .factory('meStoriesService', meStoriesService);

    /**
     * @returns {{removeFromCollection: removeFromCollection}}
     */
    function meStoriesService() {
        var service = {
            removeFromCollection: removeFromCollection
        };

        return service;

        function removeFromCollection(collection, slug) {
            for (var i = 0; i < collection.length; i++) {
                if (collection[i].slug == slug) {
                    collection.splice(i, 1);
                }
            }

            return collection;
        }
    }

})();