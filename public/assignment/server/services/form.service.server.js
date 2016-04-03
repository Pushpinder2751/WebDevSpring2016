module.exports = function(app, formModel){
    app.get("/api/assignment/form/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    // How to use guid or node-uuid libraries here and why?
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);
    
    app.get("/api/assignment/check/:userId/:formName", checkExistingForm);

    // updated for db
    function findAllFormsForUser(req, res){
        // not sure if params is to be used here
        //console.log("I reach things in server");
        var userId = req.params.userId;
        //console.log(userId);
        formModel.findAllFormsForUser(userId)
            .then(function (form) {
                res.json(form);
            },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function findFormById(req , res){
        var formId = req.params.formId;
        formModel.findFormById(formId)
            .then(
                function (form) {
                    res.json(form)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
// returns all forms for user
    function deleteFormById(req, res){
        var formId = req.params.formId;
        formModel.deleteFormById(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createForm(req, res){
        var userId = req.params.userId;
        var form = req.body;
        console.log("body: "+form);
        formModel.createForm(userId, form)
            .then(
                function (form) {
                    res.json(form);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
// returns form
    function updateFormById(req, res){
        var formId = req.params.formId;
        var newForm = req.body;
        formModel.updateFormById(formId, newForm)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    // might need fixing
    function checkExistingForm(req, res) {
        var userId = req.params.userId;
        var form = req.params.formName;
       // console.log("1111 "+ form);
        formModel.checkExistingForm(userId, form)
            .then(
                function (doc) {
                    // need to return 1
                    if(doc.length == 0){
                        console.log("this is good, there's no existing form!");
                        res.json({"value" : "noForm"});
                    }else{
                        res.json({"value" : "form"});
                    }

                },
                function (err) {
                    var value = 1;
                    res.send(value);
                }
            );
    }

    
}
