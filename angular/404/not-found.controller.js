(function() { 'use strict';

    angular
        .module('404')
        .controller('NotFoundController', NotFoundController);

    /**
     * @type {string[]}
     */
    NotFoundController.$inject = ['$stateParams', '$state'];

    /**
     * @param $stateParams
     * @param $state
     * @constructor
     */
    function NotFoundController($stateParams, $state) {
        var vm = this;
        vm.message = $stateParams.message;
        vm.search = search;
        vm.q = '';

        function search() {
            $state.go('app.search.results', {q: vm.q});
        }
    }

})();