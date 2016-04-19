(function() { 'use strict';

    angular
        .module('ui.scroll-to-top-when')
        .directive('uiScrollToTopWhen', uiScrollToTopWhen);

    /**
     * @type {string[]}
     */
    uiScrollToTopWhen.$inject = ['$timeout'];

    /**
     * @param $timeout
     * @returns {{restrict: string, link: link}}
     */
    function uiScrollToTopWhen($timeout) {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, elem, attrs) {
            scope.$on(attrs.scrollToTopWhen, function() {
                $timeout(function () {
                    angular.element(elem)[0].scrollTop = 0;
                });
            });
        }
    }

})();