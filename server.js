const express = require('express');
const bodyParser = require('body-parser');

const dbconfig = require('./config/database.config');
const mongoose = require('mongoose');

const app = express();


mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbconfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

var myLogger = function (req, res, next) {
    console.log(req.body);
    next()
  }

app.use(myLogger);
require('./app/routes/user.routes.js')(app);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  

app.get('/',(req,res)=>{
    res.json({"code":"success","message":"Hello world"});
});

// listen for requests
app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});