var express = require('express');
var app = express();
var db = require('./auth/auth');


const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


var UserController = require("./Models/userController");


app.use('/api/auth', UserController);

// app.listen(3001,function(){
//     console.log("server started successfullty at port 3001");
// })

module.exports = app;
