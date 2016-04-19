(function() { 'use strict';

    angular
        .module('articles')
        .directive('editor', editor);

    /**
     * @type {string[]}
     */
    editor.$inject = ['$rootScope'];

    /**
     * @param $rootScope
     * @returns {{require: string, restrict: string, link: link}}
     */
    function editor($rootScope) {
        var directive = {
            require: '?ngModel',
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, elem, attrs, ngModel) {
            var ck = CKEDITOR.replace(elem[0], {
                language: 'en',
                extraPlugins: 'confighelper,autogrow',
                placeholder: 'Share your story...'
            });

            if (!ngModel) throw 'ng-model is missing!';

            ck.on('instanceReady', function() {
                ck.setData(ngModel.$viewValue);

                $rootScope.$broadcast('editor:ready');
            });

            ck.on('change', updateModel);
            ck.on('key', updateModel);
            ck.on('dataReady', updateModel);

            ngModel.$render = function(value) {
                ck.setData(ngModel.$viewValue);
            };

            function updateModel() {
                scope.$apply(function() {
                    ngModel.$setViewValue(ck.getData());
                });
            }
        }
    }

})();