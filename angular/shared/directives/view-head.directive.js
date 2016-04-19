(function() { 'use strict';

    angular
        .module('directives')
        .directive('viewHead', viewHead);

    /**
     * @type {string[]}
     */
    viewHead.$inject = ['$document'];

    /**
     * @param $document
     * @returns {{restrict: string, link: link}}
     */
    function viewHead($document) {
        var head = angular.element($document[0].head),
            directive = {
                restrict: 'A',
                link: link
            };

        return directive;

        function link(scope, elem) {
            // Move the element into the head of the document.
            // Although the physical location of the document changes, the element remains
            // bound to the scope in which it was declared, so it can refer to variables from
            // the view scope if necessary.
            head.append(elem);

            // When the scope is destroyed, remove the element.
            // This is on the assumption that we're being used in some sort of view scope.
            // It doesn't make sense to use this directive outside of the view, and nor does it
            // make sense to use it inside other scope-creating directives like ng-repeat.
            scope.$on('$destroy', function () {
                elem.remove();
            });
        }
    }

})();