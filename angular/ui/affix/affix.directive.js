(function() { 'use strict';

    angular
        .module('ui.affix')
        .directive('uiAffix', uiAffix);

    /**
     * @type {string[]}
     */
    uiAffix.$inject = ['$timeout'];

    /**
     * @returns {{restrict: string, link: link}}
     */
    function uiAffix($timeout) {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, elem) {
            var navbar = angular.element(document.querySelector('#navbar')),
                header = angular.element(document.querySelector('#header')),
                searchHeader = angular.element(document.querySelector('#search-header')),
                topHeight;

            $timeout(function () {
                topHeight = navbar[0].offsetTop + header[0].offsetHeight || searchHeader[0].offsetHeight;

                elem.affix({
                    offset: {
                        top: topHeight
                    }
                });
            }, false);
        }
    }

})();