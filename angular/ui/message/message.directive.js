(function() { 'use strict';

    angular
        .module('ui.message')
        .directive('uiMessage', uiMessage);

    /**
     * @type {string[]}
     */
    uiMessage.$inject = ['$timeout'];

    /**
     * @param $timeout
     * @param $window
     * @returns {{restrict: string, templateUrl: string, replace: boolean, link: link}}
     */
    function uiMessage($timeout) {
        var directive = {
            restrict: 'A',
            templateUrl: 'app/ui/message/message.html',
            replace: true,
            link: link
        };

        return directive;

        function link(scope, elem, attrs) {
            scope.$on('message', function (event, data) {
                scope.message = data.message;
                slideDown();

                $timeout(function () {
                    slideUp();
                }, 5000);
            });

            function slideDown() {
                elem.animate({
                    top: '0px'
                }, 100);
            }

            function slideUp() {
                elem.animate({
                    top: '-500px'
                }, 100);
            }
        }
    }

})();