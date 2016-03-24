"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController)

    function FieldsController( $rootScope, $routeParams, FormService, FieldService ){




        console.log("Hello from FeildsController");
        // this is instead of $Scope
        var vm = this;

        vm.addField = addField;
        vm.removeField = removeField;
        vm.editField = editField;
        vm.updateField = updateField;
        vm.check = check;

        var formId;

        vm.currentForm = $rootScope.form;
        console.log("check : "+vm.currentForm);

        var currentUser = $rootScope.user;
        console.log("user :"+currentUser);



        if($routeParams.formId){
            formId = $routeParams.formId;
            console.log("formId: "+formId);
        }

        var fieldTypes =
            [
                {
                    fieldOption: "singleText",
                    template:
                    {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"}
                },
                {
                    fieldOption: "paragraphTextField",
                    template:
                    {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"}
                },
                {
                    fieldOption: "date",
                    template:{"_id": null, "label": "New Date Field", "type": "DATE"}
                },
                {
                    fieldOption: "dropDown",
                    template:
                    {"_id": null, "label": "New Dropdown", "type": "OPTIONS",
                        "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    }
                },
                {
                    fieldOption: "checkBoxes",
                    template:
                    {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES",
                        "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    }
                },
                {
                    fieldOption: "radioButtons",
                    template:
                    {"_id": null, "label": "New Radio Buttons", "type": "RADIOS",
                        "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    }
                }
            ];

        function init() {

            FieldService
                .getMyForm(formId)
                .then(function (response) {
                    vm.currentForm = response.data;
                    console.log("current form :"+vm.currentForm.title);
                    FieldService
                        .getFieldsForForm(formId)
                        .then(function (response) {
                            vm.fields = response.data;
                            console.log("field ");
                            console.log(vm.fields);
                        });
                });
            

        }init();

        function addField(fieldType) {
            var newFieldTemplate = findTemplateForFieldType(fieldType);
            console.log("newFieldTemplate: "+newFieldTemplate);
            FieldService
                .createFieldForForm(vm.currentForm._id, newFieldTemplate)
                .then(function (response) {
                    console.log(" response :"+response.data);
                    vm.fields = response.data;
                })
        }
        
        function findTemplateForFieldType(fieldType) {
            //console.log("fieldType "+fieldType);
            for(var index in fieldTypes){
                if(fieldTypes[index].fieldOption === fieldType){
                    //console.log("match");
                    return fieldTypes[index].template;
                }
            }
        }

        function removeField(field) {
            FieldService
                .deleteFieldForForm(vm.currentForm._id, field._id)
                .then(function (response) {
                    vm.fields = response.data;
                })
        }

        function editField(field) {
            vm.field = field;
            console.log("edit field : ");
            console.log(field);
            if(vm.field.type == "OPTIONS"
                || vm.field.type == "CHECKBOXES"
                || vm.field.type == "RADIOS"){

                var editedOptions = [];
                var opts = [];
                opts = vm.field.options;
                for (var index in opts) {
                    editedOptions.push(opts[index].label + ":" + opts[index].value);
                }
                console.log("edited Options");
                console.log(editedOptions);
               // vm.newOptions = editedOptions.join("\n");
                vm.newOptions = editedOptions;
                console.log("vm.newOptions is");
                console.log(vm.newOptions);
                //vm.field.options = vm.newOptions;

            }
        }

        function updateField(field) {
            vm.field = field;
            console.log("Updatefield : ");
            console.log(field);
            console.log("newOptions :");
            console.log(vm.newOptions);
            if (vm.field.type == "OPTIONS"
                || vm.field.type == "CHECKBOXES"
                || vm.field.type == "RADIOS") {
                console.log("I am here");
                console.log(field.options);
                var newOptions=[];
                var enteredOptions = vm.newOptions;

                for(var index in enteredOptions){



                    newOptions.push
                    ({
                        "label": enteredOptions[index].split(":")[0],
                        "value": enteredOptions[index].split(":")[1],
                    });
                }
                vm.field.options = newOptions;
                console.log("updated Field options: ");
                console.log(vm.field.options);
            }
            FieldService
                .updateField(vm.currentForm._id, vm.field._id, vm.field)
                .then(function (response) {
                    vm.fields = response.data;
                    console.log("updated fields ");
                    console.log(vm.fields);
                })
        }

        function check(fields1){
            //console.log("Fields Incoming: ");
            console.log( fields1);
            //vm.fields = fields1;
            console.log("formIDDJFDKJF: "+formId);
            FieldService
                .updateSorting(vm.currentForm._id, fields1)
                .then(function (response) {
                    console.log("I am back");
                    console.log(response.data);
                })
            // will see then later if needed
        }
    }
})();
