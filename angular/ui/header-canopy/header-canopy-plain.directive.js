(function () {
    'use strict';

    angular
        .module('ui.header-canopy')
        .directive('uiHeaderCanopyPlain', uiHeaderCanopyPlain);

    /**
     * @returns {{restrict: string, templateUrl: string, link: link}}
     */
    function uiHeaderCanopyPlain() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/ui/header-canopy/header-canopy-plain.html',
            link: link
        };

        return directive;

        function link(scope, elem, attrs) {
            if (attrs.title) {
                scope.title = attrs.title;
            } else {
                console.log('Missing title or description attribute in header-canopy-plain directive!');
            }
        }
    }

})();