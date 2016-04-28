var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());


var light_value = 'a';

app.get('/edison', function (req, res) {
    var x = {
        led: "on"
    };
    res.json(x);
});

app.post("/edison1", function (req, res) {
    light_value = req.body;
    console.log("light value: ");
    console.log(req.body);
    res.send("receiving data!"+req.body);
})

app.listen(8080);