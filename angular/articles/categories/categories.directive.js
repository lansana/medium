(function() { 'use strict';

    angular
        .module('articles')
        .directive('categories', categories);

    /**
     * @returns {{restrict: string, templateUrl: string, link: link}}
     */
    function categories() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/articles/categories/categories.html',
            link: link
        };

        return directive;

        function link(scope, elem, attrs) {
            if (attrs.data) {
                var data = scope.$eval(attrs.data);

                scope.categories = data;
                scope.inverse = attrs.inverse || false;
            }
        }
    }

})();