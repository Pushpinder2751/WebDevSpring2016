
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController)


        function FormController($scope, $location, $rootScope, FormService){
            console.log("Hello from FormController");
            var userId = -1;
            if(!$rootScope.currentUser){
                console.log("No user yet!");
                $location.path("/login");
                return;
            }else{
                userId = $rootScope.currentUser._id;
                formsForCurrentUser();
            }

            $scope.addForm = addForm;
            $scope.updateForm = updateForm;
            $scope.deleteForm = deleteForm;
            $scope.selectForm = selectForm;
            $scope.selected = -1; // initially

            // gets all the things associated with the user in current scope and then to ng-repeat
            function formsForCurrentUser(){
               // console.log("abc");
                FormService
                    .findAllFormsForUser(userId)
                    .then(function (response) {
                        console.log("abc : ");
                        console.log(response.data);
                        $scope.forms = response.data;
                    });
                /*{
                    $scope.things = formsByUserId;
                })*/
            }

            function addForm(form){

                if(form == undefined || !form.hasOwnProperty("title") || form.title.trim() === "") {
                    console.log("user playing smart or really dumb! entered nothing!");
                    return;
                }

                //console.log("add form title :"+form.title);
                var checkExistingForms = FormService
                                            .checkExistingForm(userId, form)
                                            .then(function (response) {
                                                console.log("check ");
                                                console.log(response.data);
                                                var answer = response.data.value;
                                                if(answer == "noForm"){
                                                    console.log("this is good");
                                                    checkExistingForms = 0;
                                                }
                                                if(checkExistingForms == 0){

                                                    FormService
                                                        .createFormForUser(userId, form)
                                                        .then(function (response) {
                                                            console.log("add form : "+ response.data);
                                                            formsForCurrentUser();
                                                            $scope.selected = -1;
                                                            $scope.form = {};

                                                        })
                                                }
                                                else{
                                                    alert("Form already exits");
                                                }

                                            });




            }

            function updateForm(form){

                if(form == undefined || !form.hasOwnProperty("title") || form.title.trim() === ""){
                    console.log("user playing smart again!, pressing update without selecting a form!");
                }
                else {
                    FormService
                        .updateFormById(form._id, form)
                        .then (function(response){
                        console.log("Form updated");
                        console.log(response.data);

                        // how to change after the form is updated and not live.
                        $scope.forms[$scope.selected] = response.data;
                        $scope.selected = -1;
                        $scope.form = {};
                        // need to use this after every select form
                        $scope.hideplus = false;

                    });
                }
            }

            function deleteForm(formId){
                FormService
                    .deleteFormById(formId)
                    .then (function(updateForms){
                    console.log("Form Deleted: "+formId+" :(");
                    // not sure why
                    //$scope.form.title="";
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
