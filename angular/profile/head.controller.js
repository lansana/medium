(function () { 'use strict';

    angular
        .module('profile')
        .controller('ProfileHeadController', ProfileHeadController);

    /**
     * @type {string[]}
     */
    ProfileHeadController.$inject = ['profileResolver'];

    /**
     * @param profileResolver
     * @constructor
     */
    function ProfileHeadController(profileResolver) {
        var vm = this;
        vm.user = profileResolver.user;
    }

})();