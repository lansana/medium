(function () { 'use strict';

    angular
        .module('articles')
        .controller('WriteOrEditController', WriteOrEditController);

    /**
     * @type {string[]}
     */
    WriteOrEditController.$inject = ['$window', '$rootScope', '$scope', '$stateParams', '$state', '$timeout', 'writeOrEditResolver', 'articleService', 'searchService', 'modalService'];

    /**
     * @param $window
     * @param $rootScope
     * @param $scope
     * @param $stateParams
     * @param $state
     * @param $timeout
     * @param writeOrEditResolver
     * @param articleService
     * @param searchService
     * @param modalService
     * @constructor
     */
    function WriteOrEditController($window, $rootScope, $scope, $stateParams, $state, $timeout, writeOrEditResolver, articleService, searchService, modalService) {
        var vm = this,
            VM_DATA = { // Constant representing the initial untouched editor data (for comparison purposes)
                id: '',
                title: '',
                body: '',
                categoryIdList: []
            },
            EDIT_MODE = false,
            WRITE_MODE = false;
        vm.q = '';
        vm.categoriesSelected = []; // List of categories selected by user, or passed in from edit mode
        vm.categoriesFromSearch = []; // List of categories returned from server during search
        vm.data = {
            id: '',
            title: '',
            body: '',
            categoryIdList: [] // List of category ID's to send to server on submit
        };
        vm.submit = submit;
        vm.search = search;
        vm.addCategory = addCategory;
        vm.removeCategory = removeCategory;

        switch ($state.current.name) {
            case 'app.write':
                initializeWriteMode();
                break;
            case 'app.edit':
                initializeEditMode();
                break;
        }

        function initializeWriteMode() {
            WRITE_MODE = true;
        }

        function initializeEditMode() {
            EDIT_MODE = true;

            setViewModelData(writeOrEditResolver.article);
        }

        // Save if user closes browser/navigates away from app
        $window.onbeforeunload = function () {
            save();

            return null; // Prevents alert box in browser from showing
        };

        // Create a constant string value of the vm.data for comparison later.
        $scope.$on('editor:ready', function () {
            VM_DATA = JSON.stringify(vm.data);
        });

        // Watch state change and handle unsaved changes
        $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var isEditorUnchanged = (VM_DATA === JSON.stringify(vm.data));

            // User has made updates to the data being edited,
            // or the empty editor is now dirty
            if (!isEditorUnchanged) {
                event.preventDefault();

                var modalOptions = {
                    actionButtonText: 'Save',
                    closeButtonText: "Don't save",
                    headerText: 'Save',
                    bodyText: "You've made some changes. Do you want to save?"
                };

                modalService
                    .showModal({}, modalOptions)
                    .then(function () {
                        save();

                        goToLeavingState();
                    })
                    .catch(goToLeavingState);
            }

            function goToLeavingState() {
                $state
                    .go(toState.name, toParams, {
                        notify: false
                    })
                    .then(function () {
                        $rootScope.$broadcast('$stateChangeSuccess', toState, toParams, fromState, fromParams);
                    });
            }
        });

        // Search for categories as the user types
        $scope.$watch('vm.q', function (newVal) {
            if (!newVal || newVal.length <= 1) return;

            $timeout(function () {
                // If search string is still the same, retrieve data.
                if (newVal === vm.q) vm.search();
            }, 1000);
        });

        function setViewModelData(data) {
            vm.data.id = data.id;
            vm.data.title = data.title;
            vm.data.body = data.body;

            if (data.categories) {
                for (var i = 0; i < data.categories.length; i++) {
                    addCategory(data.categories[i]);
                }
            }
        }

        function addCategory(category) {
            // Only add category id to categoryIdList array if not yet existing
            if (vm.data.categoryIdList.indexOf(category.id) === -1) {
                vm.data.categoryIdList.push(category.id);
            }

            // Only add category object to categoriesSelected array if not yet existing
            var categoryDoesNotExist = true;
            for (var i = 0; i < vm.categoriesSelected.length; i++) {
                if (vm.categoriesSelected[i].id === category.id) {
                    categoryDoesNotExist = false;
                    break;
                }
            }
            if (categoryDoesNotExist) {
                vm.categoriesSelected.push(category);
            }
        }

        function removeCategory(categoryId) {
            // Remove category id from categoryIdList array
            var listIndex = vm.data.categoryIdList.indexOf(categoryId);
            if (listIndex > -1) {
                vm.data.categoryIdList.splice(listIndex, 1);
            }

            // Remove category object from categoriesSelected array
            for (var i = 0; i < vm.categoriesSelected.length; i++) {
                if (vm.categoriesSelected[i].id === categoryId) {
                    vm.categoriesSelected.splice(i, 1);
                }
            }
        }

        function search() {
            searchService
                .findCategories(vm.q)
                .then(function (res) {
                    vm.categoriesFromSearch = res.categories;
                })
                .catch(function (res) {
                    console.log('Error searching for categories: ', res);
                });
        }

        function save() {
            // On write mode
            if (WRITE_MODE) {
                saveDraft();
            }
            // On edit mode
            else if (EDIT_MODE) {
                // Editing a draft
                if ($stateParams.draft === 'true') {
                    saveDraft();
                }
                // Editing a public story
                else if ($stateParams.draft === 'false') {
                    savePublic();
                }
            }
        }

        function saveDraft() {
            articleService
                .saveDraft(vm.data)
                .then(function(res) {
                    $rootScope.$broadcast('message', {
                        message: res.message
                    });
                })
                .catch(function (res) {
                    console.log("Error saving draft: ", res);
                });
        }

        function savePublic() {
            articleService
                .edit(vm.data, $stateParams.articleSlug)
                .then(function(res) {
                    $rootScope.$broadcast('message', {
                        message: res.message
                    });
                })
                .catch(function (res) {
                    console.log('Error editing article: ', res);
                });
        }

        function submit() {
            // Editor is not empty, continue publishing
            if (vm.data.title.length > 0 || vm.data.body.length > 0 || vm.data.categoryIdList.length > 0) {

                // On write mode OR on edit mode editing a draft
                if ($state.current.name === 'app.write' || $stateParams.draft === 'true') {
                    articleService
                        .createPublic(vm.data)
                        .then(function(res) {
                            goToArticle(res.article);
                        })
                        .catch(function (res) {
                            console.log('Error creating article: ', res);
                        });
                }
                // On edit mode (editing a published story)
                else if ($state.current.name === 'app.edit' && $stateParams.draft === 'false') {
                    articleService
                        .edit(vm.data, $stateParams.articleSlug)
                        .then(function(res) {
                            goToArticle(res.article);

                            $rootScope.$broadcast('message', {
                                message: res.message
                            });
                        })
                        .catch(function (res) {
                            console.log('Error editing article: ', res);
                        });
                }

            }
            // Editor is empty, do not publish, show errors
            else {
                vm.errors = {
                    title: true,
                    body: true
                };

                // Wait a second and then reset the errors
                //
                // This removes the 'shake' class from the div's so that when the form is
                // submitted again the class can be re-added and the elements will shake again.
                $timeout(function () {
                    vm.errors = {};
                }, 1000);
            }
        }

        function goToArticle(article) {
            $state
                .go('app.article', {
                    username: article.author.username,
                    articleSlug: article.slug
                }, {
                    notify: false // Notify false to ignore $stateChangeStart event that watches editor
                })
                .then(function() {
                    $rootScope.$broadcast('$stateChangeSuccess');
                });
        }
    }

})();