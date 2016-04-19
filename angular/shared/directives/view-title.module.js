(function() { 'use strict';

    angular
        .module('directives')
        .directive('viewTitle', viewTitle);

    /**
     * @type {string[]}
     */
    viewTitle.$inject = ['$rootScope', '$timeout'];

    /**
     * @param $rootScope
     * @param $timeout
     * @returns {{restrict: string, link: link}}
     */
    function viewTitle($rootScope, $timeout) {
        var title,
            directive = {
                restrict: 'EA',
                link: link
            };

        return directive;

        function link(scope, elem) {
            var tagName = elem[0].tagName.toLowerCase();

            // If we've been inserted as an element then we detach from the DOM because the caller
            // doesn't want us to have any visual impact in the document.
            // Otherwise, we're piggy-backing on an existing element so we'll just leave it alone.
            if (tagName === 'view-title' || tagName === 'viewTitle')
                elem.remove();

            scope.$watch(function() {
                return elem.text();
            }, function (newTitle) {
                $rootScope.viewTitle = title = newTitle;
            });

            scope.$on('$destroy', function () {
                title = undefined;

                // Wait until next digest cycle do delete viewTitle
                $timeout(function() {
                    if (!title) {
                        // No other view-title has reassigned title.
                        delete $rootScope.viewTitle;
                    }
                });
            });
        }
    }

})();