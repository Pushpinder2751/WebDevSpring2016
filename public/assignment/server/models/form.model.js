var mock = require("./form.mock.json");
// will remove mock data soon
var q = require ("q");

// don't know if I require app here or not
module.exports = function(db, mongoose) {

    var FormSchema = require("./form.schema.server")(mongoose);

    var FieldSchema = require("./field.schema.server.js")(mongoose);


    // model for schema
    var formModel = mongoose.model('formModel', FormSchema);

    var fieldModel = mongoose.model('fieldModel', FieldSchema);

    var api = {
        //generic model requirements
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById,

        // form model specific requirements
        findFormByTitle: findFormByTitle,

        // extra needed
        findAllFormsForUser: findAllFormsForUser,

        checkExistingForm: checkExistingForm,

        // functions for field.service.server.js
        getFieldsForForm: getFieldsForForm,
        getFieldForForm: getFieldForForm,
        deleteFieldForForm: deleteFieldForForm,
        createFieldForForm: createFieldForForm,
        updateField: updateField,

        updateSorting: updateSorting

    };
    return api;

    // Create of CRUD
    function createForm (userId, form) {
        console.log("create form title : "+form.title);
        /*var newForm = {
            _id: (new Date).getTime(),
            // keeping it simple for now, I don't know
            // if i need to add things such as title, userid, fields
            title: form.title,
            userId: userId

        };
        console.log(newForm);
        mock.push(newForm);
        return mock;*/
        var deferred = q.defer();

        form["userId"] = userId;

        formModel.create(form,function (err, doc) {
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
// updated for db, not tested
    function findAllForms () {
        /*if (forms) {
            return forms;
        }*/
        var deferred = q.defer();

        formModel.find(function (err, doc) {
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFormById (formId) {
      //  console.log("formId :"+formId);
       // old method
        /* for(var i in mock){
            if(mock[i]._id == formId){
                return mock[i];
            }
        }
        // if no form is found
        console.log("No form by this formId!");
        return null;*/
        var deferred = q.defer();
        formModel.findById(formId,function (err, doc) {
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    // Update of CRUD
    // updated for db
    function updateFormById (formId, newForm) {

        console.log("update formId: "+formId);
        console.log("update form: "+newForm );
        /*for(var i in mock){
            // might have to update this
            if(mock[i]._id == formId){
                mock[i].title = newForm.title;
                mock[i].userId = newForm.userId;
                mock[i].fields = newForm.fields;
                return mock[i];
            }
        }
        return null;*/
        var deferred = q.defer();
        formModel.update(
            {_id: formId},
            {$set: newForm},
            function (err, stats) {
                if(err) {
                    deferred.reject(err)
                }else {
                    // this does not return form
                    // find and return form again
                    findFormById(formId)
                        .then(
                        function (doc, err) {
                            if(err){
                                console.log("update form: there was an error");
                                console.log(err);
                                deferred.reject(err);
                            }else{
                                deferred.resolve(doc);
                            }
                        });
                }
            }
        );
       return deferred.promise;

    }

    function deleteFormById (formId) {
        //formId = parseInt(formId);
        // old method
        /*for(var i in mock){
            if(mock[i]._id == formId){
                mock.splice(i, 1);
                return mock;
            }
        }
        return mock;*/

        var deferred = q.defer();
        formModel.remove(
            {_id: formId},
            function (err, stats) {
                if(err){
                    deferred.reject(err);
                }else{
                    // not sure if this works
                    deferred.resolve(findAllFormsForUser);
                }
            });
        return deferred.promise;
    }
// updated for db, not tested
    function findFormByTitle(title){
        /*for(var i in mock){
            if(mock[i].title === title){
                return mock[i];
            }
        }
        // if form is not found
        console.log("no form by this title");
        return null;*/
        var deferred = q.defer();
        formModel.find({"title" : title},
        function (err, doc) {
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    // updated for db, not tested
    function findAllFormsForUser(userId){
        // old method
        /*var userForms = [];
        for( var i in mock){
            if(mock[i].userId == userId){
                userForms.push(mock[i])
            }
        }
        //console.log(userForms);
        return userForms;*/

        var deferred = q.defer();

        formModel.find({ "userId" : userId},
            function (err, doc) {
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }


    // updated for db, not tested
    function getFieldsForForm(formId) {
      /*  var fields = [];
        for (var i in mock){
            if(mock[i]._id === formId){
                fields = mock[i].fields;
                return fields;
            }
        }*/
        var deferred = q.defer();

        formModel.findById(formId,
            function (err, form) {
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(form.fields);
                }
            });
        return deferred.promise;
    }

    // this function id not being used anywhere for now
    // not sure if this will work
    function getFieldForForm(formId, fieldId) {
        var field
        var form = findFormById(formId)
            .then(function (form) {
                return form.fields.id(fieldId);
            });

        /*for(var i in form.fields){
            if(form.fields[i] === fieldId){
                field = form.fields[i];
                return field;
                // do I need to break here? return ends the program is'nt it?
            }
        }

        // field not present in form
        console.log("field not present in this form");
        return null;*/
    }

    // I think this can be better implemented
    // is there a need to use q promise here? as that has already been done
    // while getting the form.
    function deleteFieldForForm(formId, fieldId) {
        console.log("fieldID "+fieldId);
        var deferred = q.defer();
        var form = findFormById(formId)
            .then(function (form) {
                if(form){
                    for(var i in form.fields){
                        if(form.fields[i]._id == fieldId){
                            console.log("found field");
                            form.fields.splice(i,1);
                            break;
                        }
                    }
                    var form1 = form.save();
                    console.log("deleted feild form");
                    console.log(form1);
                    deferred.resolve(form1);
                }



            });

        return deferred.promise;
        // old method
        /*console.log("form is: "+form.title);
        console.log("fieldId is: "+fieldId);
        for( var i in form.fields){
            if(form.fields[i]._id == fieldId){
                // might need to update this
                form.fields.splice(i, 1);
                return form.fields;
            }
        }*/

    }

    function createFieldForForm(formId, newField) {

        var newField1 = new fieldModel({
            label: newField.label,
            type: newField.type,
            placeholder: newField.placeholder,
            options: newField.options
        });


        var deferred = q.defer();
        findFormById(formId)
            .then(function (form) {
                if(form){
                    form.fields.push(newField1)
                    form.save(function (err, doc) {
                        if(err){
                           // console.log("there was an error");
                            //console.log(err);
                            deferred.reject(err);
                        }else{
                            console.log("done");
                            console.log(doc);
                            deferred.resolve(doc);

                        }
                    })
                }

            });
        return deferred.promise;

    }

    // could there be a better implementation?
    function updateField(formId, fieldId, updatedField) {
        var deferred = q.defer();
        var ObjectId = mongoose.Types.ObjectId;
        var newField = new fieldModel({
            label: updatedField.label,
            type: updatedField.type,
            placeholder: updatedField.placeholder,
            options: updatedField.options
        });

        formModel.findOneAndUpdate(
            {_id: formId, 'fields._id': new ObjectId(fieldId)},
            {$set: {'fields.$': newField}},
            {new: true},
            function(err, doc) {
                if (!err) {
                    deferred.resolve(doc);
                }
                else {
                    deferred.reject(err);
                }
            }
        );


        return deferred.promise;
        /*for(var i in form.fields){
            if(form.fields[i]._id == fieldId){
                console.log("field match");
                form.fields[i] = updatedField;
                // does this need to return something!?
                return form.fields;
            }
        }*/
    }

    function checkExistingForm(userId, form1){
        // this is form title
        console.log("form1 "+form1);
        console.log("userid: "+userId);
        /*var check_forms = mock.filter(function(form, index, arr){
            return (form.userId == userId && form.title == form1);
        });

        //console.log("Check_forms ="+check_forms.length);
        if(check_forms.length == 0){
            console.log("no similar form exists");
            //console.log(userId);
            //var x = 0;
            return "0";
        }
        else{
            console.log("Form already exists!");
            return "1";
        }*/
        var deferred = q.defer();
        // not sure about this, might need fixing
        // how to return specific value say 0 or 1 instead of doc?
        formModel.find({userId: userId, title: form1},
            function (err, doc) {
                if(err){
                    console.log("got rejected");
                    deferred.reject();
                }else{
                    console.log("got resolved");
                    deferred.resolve(doc);
                }
            });
            return deferred.promise;

    }
    
    function updateSorting(formId, fields1) {
        console.log(fields1);
        var form = findFormById(formId);
        form.fields = fields1;
        return form.fields;
    }


};