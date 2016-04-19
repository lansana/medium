(function () { 'use strict';

    angular
        .module('auth', [])
        .config(configuration);

    /**
     * @type {string[]}
     */
    configuration.$inject = ['$stateProvider', '$authProvider', 'config'];

    /**
     * @type {string[]}
     */
    logoutResolver.$inject = ['authService'];

    /**
     * @param $stateProvider
     * @param $authProvider
     * @param config
     */
    function configuration($stateProvider, $authProvider, config) {
        // Satellizer configuration that specifies which API
        // route the JWT should be retrieved from
        $authProvider.loginUrl = config.url + '/authenticate';

        $stateProvider
            .state('app.signup', {
                url: '/signup',
                data: {
                    permissions: {
                        except: ['isAuthenticated'],
                        redirectTo: 'app.home'
                    }
                },
                views: {
                    'head': {
                        templateUrl: 'app/auth/signup/head.html'
                    },
                    'wide-content': {
                        templateUrl: 'app/auth/signup/signup.html',
                        controller: 'SignupController as vm'
                    }
                }
            })
            .state('app.login', {
                url: '/login',
                data: {
                    permissions: {
                        except: ['isAuthenticated'],
                        redirectTo: 'app.home'
                    }
                },
                views: {
                    'head': {
                        templateUrl: 'app/auth/login/head.html'
                    },
                    'wide-content': {
                        templateUrl: 'app/auth/login/login.html',
                        controller: 'LoginController as vm'
                    }
                }
            })
            .state('app.logout', {
                url: '/logout',
                data: {
                    permissions: {
                        except: ['isAnonymous'],
                        redirectTo: 'app.login'
                    }
                },
                resolve: {
                    logoutResolver: logoutResolver
                }
            })
            .state('app.reset', {
                url: '/reset',
                views: {
                    'head': {
                        templateUrl: 'app/auth/password-forgot/head.html'
                    },
                    'wide-content': {
                        templateUrl: 'app/auth/password-forgot/password-forgot.html',
                        controller: 'PasswordForgotController as vm'
                    }
                }
            })
            .state('app.reset-password', {
                url: '/reset/:token',
                data: {
                    permissions: {
                        only: ['isTokenValid'],
                        redirectTo: 'app.reset'
                    }
                },
                views: {
                    'head': {
                        templateUrl: 'app/auth/password-reset/head.html'
                    },
                    'wide-content': {
                        templateUrl: 'app/auth/password-reset/password-reset.html',
                        controller: 'PasswordResetController as vm'
                    }
                }
            });
    }

    /**
     * @param authService
     * @returns {*}
     */
    function logoutResolver(authService) {
        return authService.logout();
    }

})();