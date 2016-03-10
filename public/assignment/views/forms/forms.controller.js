
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController)


        function FormController($scope, $location, $rootScope, FormService){
            console.log("Hello from FormController");
            var userId = -1;
            if(!$rootScope.user){
                console.log("No user yet!");
                $location.path("/login");
                return;
            }else{
                userId = $rootScope.user._id;
                formsForCurrentUser();
            }

            $scope.addForm = addForm;
            $scope.updateForm = updateForm;
            $scope.deleteForm = deleteForm;
            $scope.selectForm = selectForm;
            $scope.selected = -1; // initially

            // gets all the forms associated with the user in current scope and then to ng-repeat
            function formsForCurrentUser(){
                FormService.findAllFormsForUser(userId, function(formsByUserId){
                    $scope.forms = formsByUserId;
                })
            }

            function addForm(form){

                if(form == undefined || !form.hasOwnProperty("title") || form.title.trim() === "") {
                    console.log("user playing smart or really dumb! entered nothing!");
                    return;
                }


                var checkExistingForms = FormService.checkExistingForm(userId, form);
                //for debugging
                //console.log("check existing forms "+checkExistingForms);

                if(!checkExistingForms){
                    FormService.createFormForUser(userId, form, function(newForm){
                        // not sure why
                        $scope.selected = -1;
                        $scope.form = {};
                        formsForCurrentUser();
                    });
                }
            }

            function updateForm(form){

                if(form == undefined || !form.hasOwnProperty("title") || form.title.trim() === ""){
                    console.log("user playing smart again!, pressing update without selecting a form!");
                }
                else {
                    FormService.updateFormById(form._id, form, function(newForm){
                        console.log("Form updated");
                        console.log(form);
                        // I think this is to update the new form
                        $scope.forms[$scope.selected] = newForm;
                        $scope.selected = -1;
                        $scope.form = {};
                        // need to use this after every select form
                        $scope.hideplus = false;

                    });
                }
            }

            function deleteForm(formId){
                FormService.deleteFormById(formId, function(updateForms){
                    console.log("Form Deleted: "+formId+" :(");
                    // not sure why
                    $scope.form.title="";
                    $scope.hideplus = false;
                    formsForCurrentUser();
                });
            }

            function selectForm(index){
                var editForm = $scope.forms[index];
                console.log("selected form = "+ editForm);

                $scope.form = editForm;
                $scope.selected = index;
                $scope.hideplus = true;
            }


        }

})();
