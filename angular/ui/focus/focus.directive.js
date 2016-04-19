(function() { 'use strict';

    angular
        .module('ui.focus')
        .directive('uiFocus', uiFocus);

    /**
     * @returns {{restrict: string, link: link}}
     */
    function uiFocus() {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, elem) {
            elem.focus();
        }
    }

})();