var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('./users');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');


  const authenticate = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (!token) return res.send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.send({ auth: false, message: 'Failed to authenticate token.' });
      
      User.findById(decoded.id, 
        { password: 0 }, 
        function (err, user) {
          if (err) return res.send("There was a problem finding the user.");
          if (!user) return res.send("No user found.");
          
          // res.send({user,message:"Authenticated"});
          next();
      });
    });
};

router.get("/me", authenticate, (req,res) => {
  return res.send({messages:"Authenticated"});
});

router.post('/register', function(req, res) {
  
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var userEmail=req.body.email;
    User.findOne({email:req.body.email},function(err,result){
        // if(result.email===userEmail) return res.send({message: "User already exists."});

        User.create({
          name : req.body.name,
          email : req.body.email,
          address : req.body.address,
          phone : req.body.phone,
          bloodGroup : req.body.bloodGroup,
          password : hashedPassword,
          isDonor: req.body.isDonor
          
        },
        function (err, user) {
          if (err) return res.send({message: "There was a problem registering the user."})
          
          var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400
          });
          res.send({ auth: true, token: token });
        }); 

    });
    
  });

  router.post('/login', function(req, res) {

    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.send({message:'Error on the server.'});
      if (!user) return res.send({message: 'No user found.'});
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.send({message:"Invalid email/password comination", auth: false, token: null });
      
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400
      });
      
      res.send({ auth: true, token: token });
    });
    
  });

  router.get('/logout', function(req, res) {
    res.send({ auth: false, token: null });
  });
  module.exports = router;