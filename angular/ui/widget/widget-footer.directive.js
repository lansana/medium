(function() { 'use strict';

    angular
        .module('ui.widget')
        .directive('uiWidgetFooter', uiWidgetFooter);

    /**
     * @returns {{restrict: string, scope: {submit: string}, bindToController: boolean, controller: string, templateUrl: string, link: link}}
     */
    function uiWidgetFooter() {
        var directive = {
            restrict: 'A',
            scope: {
                submit: '='
            },
            bindToController: true,
            controller: 'WidgetFooterController as vm',
            templateUrl: 'app/ui/widget/widget-footer.html',
            link: link
        };

        return directive;

        function link(scope, elem, attrs) {
            scope.text = attrs.text || null;
        }
    }

})();