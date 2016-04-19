(function() { 'use strict';

    angular
        .module('ui.header-canopy')
        .directive('uiHeaderCanopyProfile', uiHeaderCanopyProfile);

    /**
     * @returns {{restrict: string, templateUrl: string, link: link}}
     */
    function uiHeaderCanopyProfile() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/ui/header-canopy/header-canopy-profile.html',
            link: link
        };

        return directive;

        function link(scope, elem, attrs) {
            if (attrs.user) {
                var user = scope.$eval(attrs.user);

                scope.name = user.name;
                scope.bio = user.bio;
                scope.profileImage = user.profileImage;
            } else {
                console.log('Missing user attribute in header-canopy-profile directive!');
            }
        }
    }

})();