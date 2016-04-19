(function() { 'use strict';

    angular
        .module('ui.navbar')
        .controller('NavbarController', NavbarController);

    /**
     * @type {string[]}
     */
    NavbarController.$inject = ['$state', '$scope'];

    /**
     * @param $state
     * @param $scope
     * @constructor
     */
    function NavbarController($state, $scope) {
        var vm = this;
        vm.writing = false;
        vm.search = search;
        vm.q = '';

        function search() {
            $state.go('app.search.results', {q: vm.q});
        }

        $scope.$watch(function() {
            return $state.current.name;
        }, function() {
            vm.writing = $state.current.name == 'app.write' || $state.current.name == 'app.edit';

            if ($state.current.name === 'app.home') {
                vm.addBoxedLayout = true;
            } else {
                vm.addBoxedLayout = false;
            }
        });
    }

})();