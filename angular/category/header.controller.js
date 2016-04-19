(function() { 'use strict';

    angular
        .module('category')
        .controller('CategoryHeaderController', CategoryHeaderController);

    /**
     * @type {string[]}
     */
    CategoryHeaderController.$inject = ['categoryResolver'];

    /**
     * @param categoryResolver
     * @constructor
     */
    function CategoryHeaderController(categoryResolver) {
        var vm = this;
        vm.category = categoryResolver.category;
    }

})();