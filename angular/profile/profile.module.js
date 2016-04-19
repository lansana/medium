(function() { 'use strict';

    angular
        .module('profile', [])
        .config(config);

    /**
     * @type {string[]}
     */
    config.$inject = ['$stateProvider'];

    /**
     * @type {string[]}
     */
    profileResolver.$inject = ['$stateParams', 'profileService'];

    /**
     * @param $stateProvider
     */
    function config($stateProvider) {
        $stateProvider
            .state('app.profile', {
                url: '/@:username',
                views: {
                    'head': {
                        templateUrl: 'app/profile/head.html',
                        controller: 'ProfileHeadController as vm'
                    },
                    'header': {
                        templateUrl: 'app/profile/header.html',
                        controller: 'ProfileHeaderController as vm'
                    },
                    'wide-content': {
                        templateUrl: 'app/profile/content.html',
                        controller: 'ProfileContentController as vm'
                    }
                },
                resolve: {
                    profileResolver: profileResolver
                }
            });
    }

    /**
     * @param $stateParams
     * @param profileService
     * @returns {*}
     */
    function profileResolver($stateParams, profileService) {
        return profileService.getUser($stateParams.username);
    }

})();