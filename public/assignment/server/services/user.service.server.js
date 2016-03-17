
module.exports = function(app, userModel){
    // generic web service requirement first
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUser);
    app.get("/api/assignment/user/:userId", findUserById);
    app.put("/api/assignment/user/:userId", updateUser);
    app.delete("/api/assignment/user/:userId", deleteUser);

    //user service specific requirements
    // might need to update this
    // api/assignment/user?username=username
    // this is what is asked in the assignment, so not sure
    app.get("/api/assignment/user/:username", findUserByUserName);
    // GET /api/assignment/user?username=alice&password=wonderland
    // do I user "?"
    app.get("/api/assignment/user/:username/:password", findUserByCredentials);



//"cleverly" named same as the model function names


// post to Create new User
     function createUser (req, res){
        var newUser = req.body;
        console.log(newUser);
        // this is pretty cool
        res.json(userModel.createUser(newUser));
     }

// to find/return all users
    function findAllUser (req, res){
        res.json(userModel.findAllUsers());
    }

//FindUserById: takes an Id and returns corresponding user

    function findUserById(req, res){
        var userId = req.params.userId;
        console.log(userId);
        res.json(userModel.findUserById(userId));
    }

// to Update the user
    function updateUser (req, res){
        var userId = req.param.userId;
        // how does this work?
        var user = req.body;
        res.json(userModel.updateUser(userId, user));
    }

// to Delete a user
    function deleteUser (req, res){
        var userId = req.params.userId;
        res.json(userModel.deleteUser(userId));
    }


    // findUserByUserName
    function findUserByUsername(req, res){
        var username = req.params.username;
        res.json(userModel.findUserByUsername(username));
    }


    function findUserByCredentials(req, res){
        var credentials = {
            username: req.params.username,
            password: req.params.password
        }
        res.json(userModel.findUserByCredentials(credentials));
    }




}

