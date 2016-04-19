(function() { 'use strict';

    angular
        .module('ui.heading')
        .directive('uiHeading', uiHeading);

    /**
     * @returns {{restrict: string, templateUrl: string, link: link}}
     */
    function uiHeading() {
        var directive = {
            restrict: 'EA',
            scope: {},
            templateUrl: 'app/ui/heading/heading.html',
            link: link
        };

        return directive;

        function link(scope, elem, attrs) {
            if (attrs.title) {
                scope.title = attrs.title;
                scope.bold = attrs.bold || false;
            }
        }
    }

})();