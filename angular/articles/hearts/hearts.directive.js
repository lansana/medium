(function() { 'use strict';

    angular
        .module('ui')
        .directive('hearts', hearts);

    /**
     * @type {string[]}
     */
    hearts.$inject = ['articleService'];

    /**
     * @param articleService
     * @returns {{restrict: string, scope: {}, templateUrl: string, link: link}}
     */
    function hearts(articleService) {
        var directive = {
            restrict: 'EA',
            scope: {},
            templateUrl: 'app/articles/hearts/hearts.html',
            link: link
        };

        return directive;

        function link(scope, elem, attrs) {
            var flag = false;
            var limit = 0;

            if (attrs.count) {
                scope.heartCount = attrs.count;
                scope.heart = heart;
            }

            function heart() {
                if (!flag && limit < 5)
                    articleService.heart(attrs.id).then(doHeart);
                else if (flag && limit < 5)
                    articleService.unheart(attrs.id).then(undoHeart);
            }

            function doHeart() {
                flag = true;
                scope.heartSuccess = true;
                scope.heartCount++;
                limit++;
            }

            function undoHeart() {
                flag = false;
                scope.heartSuccess = false;
                scope.heartCount--;
                limit++;
            }
        }
    }

})();