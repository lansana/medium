(function () { 'use strict';

    angular
        .module('ui.profile-card')
        .directive('uiProfileCardSm', uiProfileCardSm);

    /**
     * @returns {{restrict: string, templateUrl: string, link: link}}
     */
    function uiProfileCardSm() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/ui/profile-card/profile-card-sm.html',
            link: link
        };

        return directive;

        function link(scope, elem, attrs) {
            if (attrs.user) {
                var user = scope.$eval(attrs.user);
                var articleDate = attrs.articleDate;
                var viewCount = attrs.viewCount;

                scope.profileImage = user.profileImage;
                scope.username = user.username;
                scope.name = user.name;
                scope.bio = user.bio;
                scope.date = articleDate;
                scope.viewCount = viewCount;
                scope.hoverTemplate = '<div class="profile-card-hover">' +
                                            '<div class="profile-card-hover--content">' +
                                                '<a href="/@' + scope.username + '">' +
                                                    '<h1>' + scope.name + '</h1>' +
                                                '</a>' +
                                                '<p>' + scope.bio + '</p>' +
                                            '</div>' +
                                            '<div class="profile-card-hover--image">' +
                                                '<a href="/@' + scope.username + '" title="View the profile of ' + scope.name + '">' +
                                                    '<img class="avatar md" src="' + scope.profileImage + '">' +
                                                '</a>' +
                                            '</div>' +
                                            '<div class="clearfix"></div>' +
                                            '<div class="profile-card-hover--footer">' +
                                                '<a class="btn btn-primary text-center" href="/@' + scope.username + '">Visit profile</a>' +
                                            '</div>' +
                                        '</div>';
            }
        }
    }

})();