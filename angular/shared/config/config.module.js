(function() { 'use strict';

    angular
        .module('config', [])
        .config(config);

    /**
     * @type {string[]}
     */
    config.$inject = ['tooltipsConfProvider', 'cfpLoadingBarProvider'];

    /**
     * @param tooltipsConfProvider
     * @param cfpLoadingBarProvider
     */
    function config(tooltipsConfProvider, cfpLoadingBarProvider) {
        tooltipsConfProvider.configure({
            'smart': true,
            'tooltip-hide-trigger': 'mouseleave',
            'speed': 'fast'
        });

        cfpLoadingBarProvider.includeSpinner = false;
    }

})();