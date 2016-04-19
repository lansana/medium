(function() { 'use strict';

    angular
        .module('profile')
        .controller('ProfileContentController', ProfileContentController);

    /**
     * @type {string[]}
     */
    ProfileContentController.$inject = ['profileResolver'];

    /**
     * @param profileResolver
     * @constructor
     */
    function ProfileContentController(profileResolver) {
        var vm = this;
        vm.articles = profileResolver.articles;
        vm.user = profileResolver.user;
        vm.hasContent = vm.articles.length > 0;
    }

})();