(function() { 'use strict';

    angular
        .module('ui.navbar', [])
        .directive('uiNavScroll', uiNavScroll);

    /**
     * @type {string[]}
     */
    uiNavScroll.$inject = ['$window', '$timeout'];

    /**
     * @param $window
     * @param $timeout
     * @returns {{restrict: string, link: link}}
     */
    function uiNavScroll($window, $timeout) {
        var directive =  {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, element) {
            var windowEl = angular.element($window);
            var delta = 50;
            var lastScrollTop = 0;

            element.bind('mouseover', mouseover);

            windowEl.on('scroll', scroll);

            function mouseover() {
                element.removeClass('closed');

                return $timeout((function () {
                    return element.css({
                        overflow: 'visible'
                    });
                }), 150);
            }

            function scroll() {
                var st = windowEl.scrollTop();

                // Check if at top of page
                if (st === 0)
                    element.removeClass('shadow');
                else
                    element.addClass('shadow');

                if (Math.abs(lastScrollTop - st) <= delta)
                    return;

                // Check if scrolling down
                if (st > lastScrollTop)
                    element.addClass('closed');
                else
                    element.removeClass('closed');


                lastScrollTop = st;
            }
        }
    }

})();