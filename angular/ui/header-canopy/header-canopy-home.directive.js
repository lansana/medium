(function () { 'use strict';

    angular
        .module('ui.header-canopy')
        .directive('uiHeaderCanopyHome', uiHeaderCanopyHome);

    /**
     * @param $rootScope
     * @returns {{restrict: string, link: link}}
     */
    function uiHeaderCanopyHome() {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, elem) {
            scope.close = function() {
                elem.hide();
            };
        }
    }

})();