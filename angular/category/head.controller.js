(function () { 'use strict';

    angular
        .module('category')
        .controller('CategoryHeadController', CategoryHeadController);

    /**
     * @type {string[]}
     */
    CategoryHeadController.$inject = ['categoryResolver'];

    /**
     * @param categoryResolver
     * @constructor
     */
    function CategoryHeadController(categoryResolver) {
        var vm = this;
        vm.category = categoryResolver.category;
    }

})();