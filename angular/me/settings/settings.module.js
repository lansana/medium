(function() { 'use strict';

    angular
        .module('settings', [])
        .config(config)
        .run(run);

    /**
     * @type {string[]}
     */
    config.$inject = ['$stateProvider'];

    /**
     * @type {string[]}
     */
    run.$inject = ['redirectService'];

    /**
     * @param $stateProvider
     */
    function config($stateProvider) {
        $stateProvider
            .state('app.me.settings', {
                url: '/settings',
                views: {
                    'head@app': {
                        templateUrl: 'app/me/settings/head.html'
                    },
                    'wide-content@app': {
                        templateUrl: 'app/me/settings/settings.html'
                    }
                },
                default: 'app.me.settings.account',
                params: {
                    menu: 'settings'
                }
            })
            .state('app.me.settings.account', {
                url: '/account',
                views: {
                    '@app.me.settings': {
                        templateUrl: 'app/me/settings/account/account.html',
                        controller: 'SettingsAccountController as vm'
                    }
                }
            })
            .state('app.me.settings.password', {
                url: '/password',
                views: {
                    '@app.me.settings': {
                        templateUrl: 'app/me/settings/password/password.html',
                        controller: 'SettingsPasswordController as vm'
                    }
                }
            });
    }

    /**
     * @param redirectService
     */
    function run(redirectService) {
        redirectService.goDefaultChildState();
    }

})();