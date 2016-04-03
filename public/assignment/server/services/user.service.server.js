



module.exports = function(app, userModel){
    // generic web service requirement first
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", reroute);
    app.get("/api/assignment/user/:userId", findUserById);
    app.put("/api/assignment/user/:userId", updateUser);
    app.delete("/api/assignment/user/:userId", deleteUser);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);

    //user service specific requirements
    // might need to update this
    // api/assignment/user?username=username
    // this is what is asked in the assignment, so not sure
    //app.get("/api/assignment/user/:username", findUserByUsername);
    // GET /api/assignment/user?username=alice&password=wonderland
    // do I user "?"
    //app.get("/api/assignment/user?username=username&password=password", findUserByCredentials);



//"cleverly" named same as the model function names

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }


// post to Create new User
// updated for databases
     function createUser (req, res){
         var newUser = req.body;
         console.log(newUser);
         
        // is there a better design for putting user in session ?
        newUser = userModel.createUser(newUser)
            // handle model promise
            .then(
                // login user if promise resolved
                function (doc) {
                    req.session.currentUser = doc;
                    console.log("sending back new user data");
                    console.log(doc)
                    // this is pretty cool
                    res.json(newUser);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );

     }


    function reroute(req, res) {
        console.log(req.query.username);
        console.log(req.query.password);
        console.log("entered reroute");
        if(req.query.username && req.query.password){
            console.log("finding user by credentials");
            findUserByCredentials(req, res);
        }
        else if(req.query.username){
            findAllUser(req, res);
        }
        else if (req.params.userId) {
            updateUser(req, res);
        }
        else {
            findAllUser(req, res);
        }

    }
// to find/return all users
// updated with promise for db.
    function findAllUser (req, res){
        console.log(req.query.username);
       // res.json(userModel.findAllUser());
        var users = userModel.findAllUser()
            .then(
                //return users if promise if resolved
                function (doc) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

//FindUserById: takes an Id and returns corresponding user

    function findUserById(req, res){
        var userId = req.params.userId;
        //console.log(userId);
        //res.json(userModel.findUserById(userId))
        var user = userModel.findUserById(userId)
            .then(
                //return user if promise if resolved
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

// to Update the user
// updated with db
    function updateUser (req, res){
        var userId = req.params.userId;
        // how does this work?
        var user = req.body;
        //console.log("update");
        //console.log(user);
        //res.json(userModel.updateUser(userId, user));
        var updatedUser = userModel.updateUser(userId, user)
            .then(
                function (doc) {
                    //console.log("sending updated user");
                    //console.log(doc);
                    req.session.currentUser = doc;
                    res.json(doc);

                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

// to Delete a user
// not tested
    function deleteUser (req, res){
        var userId = req.params.userId;
        //res.json(userModel.deleteUser(userId));
        userModel.deleteUser(userId)
            .then(
                function (doc) {
                    // returns all users
                    console.log(doc);
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }


    // findUserByUserName
    // not tested
    function findUserByUsername(req, res){
        var username = req.params.username;
        //res.json(userModel.findUserByUsername(username));
        userModel.findUserByUsername(username)
            .then(function (doc) {
                console.log("found user");
                console.log(doc);
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            })
    }

// updated with promise for db. 
    function findUserByCredentials(req, res){
        //console.log("user.service.server : I reached server");
        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        //console.log("credentials "+credentials);
        var user = userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    console.log("sending back user: ");
                    console.log(doc);
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
        
    }

    // to be used later , remove the comment when you start using this.
    function loggedin(req, res) {
        console.log("in Logged in function");
        console.log(req.session.currentUser);
        res.json(req.session.currentUser);
    }




};

