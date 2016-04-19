(function() { 'use strict';

    angular
        .module('ui.subview-menu')
        .directive('uiSubviewMenu', uiSubviewMenu);

    /**
     * @returns {{restrict: string, templateUrl: string, controller: string}}
     */
    function uiSubviewMenu() {
        var directive =  {
            restrict: 'EA',
            templateUrl: 'app/ui/subview-menu/subview-menu.html',
            controller: 'SubviewMenuController as vm'
        };

        return directive;
    }

})();