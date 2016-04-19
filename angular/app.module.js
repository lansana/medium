(function () { 'use strict';

    angular
        .module('app', [

            /*
             |--------------------------------------------------------------------------
             | External Modules
             |--------------------------------------------------------------------------
             |
             | These are the modules created by the AngularJS team, open source
             | projects or third party modules.
             |
             */

                'ngAnimate', 'ngSanitize', 'permission', 'ui.router', 'satellizer', 'angular-loading-bar',
                '720kb.tooltips', 'ui.bootstrap',

            /*
             |--------------------------------------------------------------------------
             | Internal Modules
             |--------------------------------------------------------------------------
             |
             | These are the modules that are meant to be shared throughout the
             | app, either as some kind of config, data, reusable component,
             | view or partial, etc.
             |
             */

                // Shared
                'directives', 'filters', 'services', 'config', 'access-control', 'util',

                // $templateCache
                'viewsAndPartials',

                // Other
                'auth', 'home', 'profile', 'articles', 'category', 'ui', 'search', 'me',

                // Errors
                '404'

        ])
        .config(config)
        .run(run);

    /**
     * @type {string[]}
     */
    config.$inject = ['$urlRouterProvider', '$httpProvider', '$locationProvider', '$stateProvider'];

    /**
     * @type {string[]}
     */
    run.$inject = ['configService', 'userService'];

    /**
     * Configure app.
     *
     * @param $urlRouterProvider
     * @param $httpProvider
     * @param $locationProvider
     * @param $stateProvider
     */
    function config($urlRouterProvider, $httpProvider, $locationProvider, $stateProvider) {
        $stateProvider.state('app', {
            templateUrl: 'app/app.html'
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $urlRouterProvider.otherwise(function($injector) {
            $injector.get('$state').go('app.404');
        });

        $httpProvider.interceptors.push('apiInterceptor');
    }

    /**
     *  Initialize global configuration.
     *  Initialize user if logged in.
     *
     * @param configService
     * @param userService
     */
    function run(configService, userService) {
        configService.initialize();
        userService.initialize();
    }

})();