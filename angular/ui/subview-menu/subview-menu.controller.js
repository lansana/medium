(function() { 'use strict';

    angular
        .module('ui.subview-menu')
        .controller('SubviewMenuController', SubviewMenuController);

    /**
     * @type {string[]}
     */
    SubviewMenuController.$inject = ['subviewMenuService', '$scope', '$stateParams', '$state'];

    /**
     * @param subviewMenuService
     * @param $scope
     * @param $stateParams
     * @param $state
     * @constructor
     */
    function SubviewMenuController(subviewMenuService, $scope, $stateParams, $state) {
        var vm = this;
        vm.menu = [];
        vm.go = go;

        // Watch the change of the parent state of the subviews  to
        // select the proper menu based on the $stateParams.menu value.
        $scope.$watch(function() {
            return $stateParams.menu;
        }, function() {
            vm.menu = subviewMenuService.getMenu($stateParams.menu);
        });

        // Watch the change of the subview state and highlight the tab
        // that has the state value of the current subview state.
        $scope.$watch(function() {
            return $state.current.name;
        }, function() {
            highlightSelectedTab();
        });

        function highlightSelectedTab() {
            for (var i = 0; i < vm.menu.length; i++) {
                if (vm.menu[i].state == $state.current.name)
                    vm.menu[i].selected = true;
                else
                    vm.menu[i].selected = false;
            }
        }

        function go(tab) {
            $state.go(tab.state);
        }
    }

})();