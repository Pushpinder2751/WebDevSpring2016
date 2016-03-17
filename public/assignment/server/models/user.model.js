
// where is function(app) used?
module.exports = function(app){

    var api = {
        // generic data model requirements which all models must follow
        createUser: createUser,
        findAlluser: findAllUser,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        // requirements specific to user model
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
        // add more if you need to
    };
    return api;

    // Create of CRUD
    function createUser (user) {
        var newUser = {
            _id: (new Date).getTime(),
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            password: user.password
        };
        mock.push(newUser);
    }

    function findAlluser () {
        return mock;
    }

    function findUserById (userId) {
        userId = parseInt(userId);
        for(var i in mock){
            if(mock[i].id === userId){
                return mock[i];
            }
        }
        // if no user is found
        console.log("No user by this userId!");
        return null;
    }

    // Update of CRUD
    function updateUser (userId, user) {
        userId = parseInt(userId);
        for(var i in mock){
            // it might be _id here
            if(mock[i].id === userId){
                mock[i].username = user.username;
                mock[i].firstname = user.firstname;
                mock[i].lastname = user.lastname;
                mock[i].password = user.password;

                return mock;
            }
        }

    }

    function deleteUser (userId){
        userId = parseInt(userId);
        for(var i in mock){
            if(mock[i]._id == userId){
                mock.splice(i, 1);
                return mock;
            }
        }
    }

    function findUserByUsername(username){
        for(var i in mock){
            if(mock[i].username === username){
                return mock[i];
            }
        }
        // if user is not found
        console.log("no user by this username");
        return null;
    }

    function findUserByCredentials(credentials) {
        for (var u in mock){
            if( mock[u].username === credentials.username &&
                mock[u].password === credentials.password){
                return mock[u];
            }
        }
        // if no user is found;
        console.log("no user found by credentials");
        return null;
    }



};