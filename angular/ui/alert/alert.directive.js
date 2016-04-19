(function () { 'use strict';

    angular
        .module('ui.alert')
        .directive('uiAlert', uiAlert);

    /**
     * @returns {{restrict: string, templateUrl: string, link: link}}
     */
    function uiAlert() {
        var directive = {
            restrict: 'A',
            templateUrl: 'app/ui/alert/alert.html',
            link: link
        };

        return directive;

        function link(scope) {
            scope.$on('input:success', function(event, data) {
                scope.error = false;
                scope.success = true;
                scope.message = data.message;
            });

            scope.$on('input:error', function (event, data) {
                scope.success = false;
                scope.error = true;
                scope.message = data.message;
            });
        }
    }

})();