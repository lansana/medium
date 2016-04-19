(function () {
    'use strict';

    angular
        .module('ui.header-canopy')
        .directive('uiHeaderCanopyCategory', uiHeaderCanopyCategory);

    /**
     * @returns {{restrict: string, templateUrl: string, link: link}}
     */
    function uiHeaderCanopyCategory() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/ui/header-canopy/header-canopy-category.html',
            link: link
        };

        return directive;

        function link(scope, elem, attrs) {
            if (attrs.title && attrs.description) {
                scope.title = attrs.title;
                scope.description = attrs.description;
            } else {
                console.log('Missing title or description attribute in header-canopy-category directive!');
            }
        }
    }

})();