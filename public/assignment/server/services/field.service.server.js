module.exports = function (app, formModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldForForm);
    // why do I need to use guid or node-uuid libraries?
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    app.get("/api/assignment/form/:formId", getMyForm);

    app.put("/api/assignment/form/:formId/fields1/", updateSorting);
    ///api/assignment/form/"+formId+"/fields", fields

    var q = require ("q");

    function getFieldsForForm(req, res) {
         // req.formId vs req.params.formId?
        var formId = req.params.formId;
        var fields = [];
        formModel.getFieldsForForm(formId)
            .then(
              function (fields) {
                  res.json(fields);
              },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.getFieldForForm(formId, fieldId)
            .then(
                function (field) {
                    res.json(field);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    // not sure about this, what is returned?
    function deleteFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        console.log("deleting formfield");
        formModel.deleteFieldForForm(formId, fieldId)
            .then(
                function (form) {
                    console.log("deleted field");
                    res.json(form);
                },
                function (err) {
                    console.log("I have an error for you");
                    console.log(err);
                    res.status(400).send(err);
                }
            );

    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var newField = req.body;
        //console.log("formId: "+formId);
        //console.log("newField :"+newField);
        //var deferred = q.defer();

        formModel.createFieldForForm(formId, newField)
            .then(
                function (field) {
                    
                    res.json(field);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedField = req.body;


        formModel.updateField(formId, fieldId, updatedField)
            .then(
                function (form) {
                    res.json(form);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getMyForm(req, res){
        formModel.findFormById(req.params.formId)
            .then(
                function (form) {
                    res.json(form);
            },
            function (err) {
                res.status(400).send(err);
            });

    }
// need to update this later
    function updateSorting(req, res) {
        var formId = req.params.formId;
        var fields1 = req.body;
        console.log("field.server");
        console.log(fields1);
        res.json(formModel.updateSorting(formId, fields1));
    }




};