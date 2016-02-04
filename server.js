var express = require('express');
var app = express();

// where to fetch the static content
// __dirname = directory name
// '/public' from public direcory
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/hello', function(req, res){
    res.send('hello world');
});

app.get('/api/users',function(req,res){
    var users = [
        {username: 'Pushpinder', first: 'Pushpinder', last: 'Singh'},
        {username: 'Mavez', first: 'Mavez', last: 'Singh'},
        {username: 'Rahul', first: 'Rahul', last: 'Bahal'},
        {username: 'Parth', first: 'Parth', last: 'Ahluwalia'}, // Correcting my last name! - Parth Ahluwalia
    ];
    res.json(users);
    //can also write res.send(users);
    // send automatically detects json
});



app.listen(port, ipaddress);
