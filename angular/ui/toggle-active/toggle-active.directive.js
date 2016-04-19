(function() { 'use strict';

    angular
        .module('ui.toggle-active')
        .directive('uiToggleActive', uiToggleActive);

    /**
     * @returns {{restrict: string, link: link}}
     */
    function uiToggleActive() {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, elem) {
            elem.bind('click', function() {
                elem.toggleClass('active');
            });
        }
    }

})();