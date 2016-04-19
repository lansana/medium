(function() { 'use strict';

    angular
        .module('filters')
        .filter('shorten', shorten);

    function shorten() {
        return filter;

        function filter(value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max);

            if (!max || value.length <= max) return value;

            value = value.substr(0, max);

            if (wordwise) {
                var lastplace = value.lastIndexOf(' ');

                if (lastplace != -1)
                    value = value.substr(0, lastplace);
            }

            return value + (tail || '&hellip;');
        }
    }

})();