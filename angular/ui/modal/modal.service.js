(function() { 'use strict';

    angular
        .module('ui.modal')
        .factory('modalService', modalService);

    /**
     * @type {string[]}
     */
    modalService.$inject = ['$uibModal'];

    /**
     * @param $uibModal
     * @returns {{showModal: showModal, show: show}}
     */
    function modalService($uibModal) {
        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            animation: false,
            templateUrl: 'app/ui/modal/modal.html'
        }, modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Continue',
            headerText: 'Are you sure?',
            bodyText: 'This action may be irreversible.'
        }, service = {
            showModal: showModal,
            show: show
        };

        return service;

        function showModal(customModalDefaults, customModalOptions) {
            if (!customModalDefaults) customModalDefaults = {};

            customModalDefaults.backdrop = 'static';

            return service.show(customModalDefaults, customModalOptions);
        }

        function show(customModalDefaults, customModalOptions) {
            // Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            // Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            // Map modal.html $scope custom properties to defaults define in service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = tempModalDefaultsCtrl;
            }

            tempModalDefaultsCtrl.$inject = ['$scope', '$uibModalInstance'];

            function tempModalDefaultsCtrl($scope, $uibModalInstance) {
                $scope.modalOptions = tempModalOptions;

                $scope.modalOptions.ok = function (res) {
                    $uibModalInstance.close(res);
                };

                $scope.modalOptions.close = function (res) {
                    $uibModalInstance.dismiss('cancel');
                };
            }

            return $uibModal.open(tempModalDefaults).result;
        }
    }

})();