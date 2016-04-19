(function() { 'use strict';

    angular
        .module('articles')
        .directive('articles', articles);

    /**
     * @returns {{restrict: string, scope: {}, templateUrl: string, link: link}}
     */
    function articles() {
        var directive = {
            restrict: 'AE',
            scope: {},
            templateUrl: 'app/articles/articles.html',
            link: link
        };

        return directive;

        function link(scope, elem, attrs) {
            // Set the first interval of stories loaded from resolver
            scope.articles = scope.$eval(attrs.data) || null;

            scope.$on('stories:loaded', function(event, stories) {
                for (var i = 0; i < stories.length; i++) {
                    scope.articles.push(stories[i]);
                }
            });
        }
    }

})();