(function() { 'use strict';

    angular
        .module('ui.when-scrolled')
        .directive('uiWhenScrolled', uiWhenScrolled);

    uiWhenScrolled.$inject = ['$window', '$document'];

    /**
     * @returns {{restrict: string, link: link}}
     */
    function uiWhenScrolled($window, $document) {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, elem, attrs) {
            var windowEl = angular.element($window),
                canLoadOnScroll = true;

            windowEl.on('scroll', function() {
                if (canLoadOnScroll) {
                    if ((windowEl.scrollTop() + windowEl.height()) >= ($document.height() / 2)) {
                        canLoadOnScroll = false;
                        scope.$apply(attrs.uiWhenScrolled);
                    }
                }
            });

            scope.$on('stories:loaded', function() {
                canLoadOnScroll = true;
            });
        }
    }

})();