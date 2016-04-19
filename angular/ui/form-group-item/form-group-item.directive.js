(function() { 'use strict';

    angular
        .module('ui.form-group-item')
        .controller('FormGroupItemController', FormGroupItemController)
        .directive('uiFormGroupItem', uiFormGroupItem);

    /**
     * @constructor
     */
    function FormGroupItemController(){}

    /**
     * @returns {{restrict: string, scope: {model: string, errors: string, submit: string}, bindToController: boolean, controller: string, templateUrl: string, link: link}}
     */
    function uiFormGroupItem() {
        var directive = {
            restrict: 'A',
            scope: {
                model: '=',
                errors: '=',
                submit: '='
            },
            bindToController: true,
            controller: 'FormGroupItemController as vm',
            templateUrl: 'app/ui/form-group-item/form-group-item.html',
            link: link
        };

        return directive;

        function link(scope, elem, attrs) {
            scope.input = attrs.input || false;
            scope.textarea = attrs.textarea || false;
            scope.type = attrs.type || 'text';
            scope.label = attrs.label;
            scope.id = attrs.id;
        }
    }

})();