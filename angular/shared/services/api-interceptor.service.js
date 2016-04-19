(function() { 'use strict';

    angular
        .module('services')
        .factory('apiInterceptor', apiInterceptor);

    /**
     * @type {string[]}
     */
    apiInterceptor.$inject = ['$q', '$injector'];

    /**
     * @param $q
     * @param $injector
     * @returns {{request: request, requestError: requestError, response: response, responseError: responseError}}
     */
    function apiInterceptor($q, $injector) {
        var service = {
            request: request,
            requestError: requestError,
            response: response,
            responseError: responseError
        };

        return service;

        // Called before a request is sent, capable of mutating the request object
        function request(config) {
            return config;
        }

        function requestError(config) {
            return config;
        }

        // Called when an $http request succeeds, is passed the results object
        function response(res) {
            return res;
        }

        // Called if an $http method fails
        function responseError(res) {
            if (res.status == 404) {
                $injector.get('$state').go('app.404', {
                    message: res.data.error.message
                });
            }

            return $q.reject(res);
        }
    }

})();