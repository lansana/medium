(function() { 'use strict';

    angular
        .module('filters')
        .filter('escapeHtml', escapeHtml);

    /**
     * @returns {filter}
     */
    function escapeHtml() {
        var entityMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        };

        return filter;

        function filter(html) {
            return String(html).replace(/[&<>"'\/]/g, function (s) {
                return entityMap[s];
            });
        }
    }

})();