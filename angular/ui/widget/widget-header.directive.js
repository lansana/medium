(function() { 'use strict';

    angular
        .module('ui.widget')
        .directive('uiWidgetHeader', uiWidgetHeader);

    /**
     * @returns {{restrict: string, templateUrl: string, link: link}}
     */
    function uiWidgetHeader() {
        var directive = {
            restrict: 'A',
            templateUrl: 'app/ui/widget/widget-header.html',
            link: link
        };

        return directive;

        function link(scope, elem, attrs) {
            scope.title = attrs.title || null;
            scope.description = attrs.description || null;
        }
    }

})();