(function() { 'use strict';

    angular
        .module('ui.navbar')
        .directive('uiNavbar', uiNavbar);

    /**
     * @returns {{restrict: string, templateUrl: string, controller: string}}
     */
    function uiNavbar() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/ui/navbar/navbar.html',
            controller: 'NavbarController as vm'
        };

        return directive;
    }

})();