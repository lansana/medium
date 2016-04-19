(function () { 'use strict';

    angular
        .module('search')
        .controller('SearchHeaderController', SearchHeaderController);

    /**
     * @type {string[]}
     */
    SearchHeaderController.$inject = ['$state'];

    /**
     * @param $state
     * @constructor
     */
    function SearchHeaderController($state) {
        var vm = this;
        vm.search = search;
        vm.q = '';

        function search() {
            $state.go('app.search.results', {
                q: vm.q
            });
        }
    }

})();