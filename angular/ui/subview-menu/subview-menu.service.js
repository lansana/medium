(function () { 'use strict';

    angular
        .module('ui.subview-menu')
        .factory('subviewMenuService', subviewMenuService);

    /**
     * @returns {{getMenu: getMenu}}
     */
    function subviewMenuService() {
        var allMenus = {
                'settings': [
                    {'state': 'app.me.settings.account', 'label': 'Account', selected: false},
                    {'state': 'app.me.settings.password', 'label': 'Password', selected: false}
                ],
                'stories': [
                    {'state': 'app.me.stories.drafts', 'label': 'Drafts', selected: false},
                    {'state': 'app.me.stories.published', 'label': 'Published', selected: false},
                    {'state': 'app.me.stories.unpublished', 'label': 'Unpublished', selected: false}
                ]
            },
            service = {
                getMenu: getMenu
            };

        return service;

        function getMenu(currentMenu) {
            return allMenus[currentMenu];
        }
    }

})();