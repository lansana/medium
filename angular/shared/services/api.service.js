(function () { 'use strict';

    angular
        .module('services')
        .factory('apiService', apiService);

    /**
     * @type {string[]}
     */
    apiService.$inject = ['$q'];

    /**
     * @param $q
     * @returns {{handleSuccess: handleSuccess, handleError: handleError}}
     */
    function apiService($q) {
        var service = {
            handleSuccess: handleSuccess,
            handleError: handleError
        };

        return service;

        function handleSuccess(res) {
            if (typeof res.data === 'object')
                return res.data;

            handleError(res);
        }

        function handleError(res) {
            return $q.reject(res);
        }
    }

})();