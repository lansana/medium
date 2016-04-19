(function() { 'use strict';

    angular
        .module('articles')
        .directive('topStories', topStories);

    /**
     * @returns {{restrict: string, scope: {}, templateUrl: string, link: link}}
     */
    function topStories() {
        var directive = {
            restrict: 'A',
            scope: {},
            templateUrl: 'app/articles/top-stories/top-stories.html',
            link: link
        };

        return directive;

        function link(scope, elem, attrs) {
            if (attrs.data) {
                var data = scope.$eval(attrs.data);
                scope.articles = data;
            }
        }
    }

})();