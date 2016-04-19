(function () { 'use strict';

    angular
        .module('profile')
        .controller('ProfileHeaderController', ProfileHeaderController);

    /**
     * @type {string[]}
     */
    ProfileHeaderController.$inject = ['profileResolver'];

    /**
     * @param profileResolver
     * @constructor
     */
    function ProfileHeaderController(profileResolver) {
        var vm = this;
        vm.user = profileResolver.user;
    }

})();