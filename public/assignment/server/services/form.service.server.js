module.exports = function(app, formModel){
    app.get("/api/assignment/form/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    // How to use guid or node-uuid libraries here and why?
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);
    
    app.get("/api/assignment/check/:userId/:formName", checkExistingForm);

    function findAllFormsForUser(req, res){
        // not sure if params is to be used here
        //console.log("I reach things in server");
        var userId = req.params.userId;
        //console.log(userId);
        res.json(formModel.findAllFormsForUser(userId));

    }

    function findFormById(req , res){
        var formId = req.params.formId;
        res.json(formModel.findFormById(formId));
    }

    function deleteFormById(req, res){
        var formId = req.params.formId;
        res.json(formModel.deleteFormById(formId));
    }

    function createForm(req, res){
        var userId = req.params.userId;
        var form = req.body;
        console.log("body: "+form);
        res.json(formModel.createForm(userId, form));
    }

    function updateFormById(req, res){
        var formId = req.params.formId;
        var newForm = req.body;
        res.json(formModel.updateFormById(formId, newForm));
    }

    function checkExistingForm(req, res) {
        var userId = req.params.userId;
        var form = req.params.formName;
        //console.log("1111 "+ form);
        res.send(formModel.checkExistingForm(userId, form));
    }

    
}
