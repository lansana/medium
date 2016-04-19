(function() { 'use strict';

    angular
        .module('ui.profile-card')
        .directive('uiProfileCard', uiProfileCard);

    /**
     * @returns {{restrict: string, templateUrl: string, link: link}}
     */
    function uiProfileCard() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/ui/profile-card/profile-card.html',
            link: link
        };

        return directive;

        function link(scope, elem, attrs) {
            if (attrs.user) {
                var user = scope.$eval(attrs.user);

                scope.profileImage = user.profileImage;
                scope.username = user.username;
                scope.name = user.name;
                scope.bio = user.bio;
            }
        }
    }

})();