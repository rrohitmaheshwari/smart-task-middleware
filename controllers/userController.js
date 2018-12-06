//User controller file
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var Users = require('./../models/users');
var Tasks = require('./../models/tasks');
var util = require('./../utils/util');

const mongoURL = "mongodb://smartadmin:tiger123@ds257077.mlab.com:57077/smart-task-db";
mongoose.connect(mongoURL);
var mongoDatabase = mongoose.connection;


module.exports.signUpUser = function(req, res){
  var usertetail = {
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    email:req.body.email,
    password:req.body.password,
    phone:req.body.phone
  }
  Users.getUserByEmail(usertetail.email, function(err, userdetail){
    if(err){
        res.status(500).json({status:500,error:err});
    }else{
      if(userdetail){
          res.status(409).json({status:409,error:"User already exists !!!"});
      }else{
        Users.addNewUser(usertetail,function(err, result){
          if(err){
            console.log("[User Controller] Error while adding new user !!!");
            res.status(500).json({status:500,error:err});
          }else{
            console.log("[User Controller] Added new user successfully");
            req.session.user = req.body.email;
            res.status(201).json({status:201,user:usertetail});
          }
        });
      }
    }
  })
};


module.exports.signInUser = function (req, res) {

    var email = req.body.email;
    Users.getUserByEmail(email, function (err, userdetail) {
        console.log("[UserController] error : ", err, "user query result", userdetail);
        if (err) {
            res.status(500).json({status: 500, error: "Error while retrieving user tasks" + err});
        } else {
            console.log("userdetail", userdetail);
            if (userdetail == null) {
                res.status(404).json({status: 404, user: {}, tasks: [], error: "User not found !!!: " + err})
            } else if (userdetail.password === req.body.password) {
                Tasks.getTasksByEmail(email, function (err, tasks) {
                    console.log("result:", tasks);
                    if (err) {
                        res.status(500).json({status: 500, error: "Error while retrieving tasks error: " + err})
                    } else {
                        req.session.user = req.body.email;
                        console.log("after setting session " + req.session.user);
                        let resResult = {user: userdetail, tasks: tasks}
                        res.status(200).json({status: 200, result: resResult});
                    }
                });
            } else {
                res.status(401).json({status: 401, error: "username or password is incorrect !!!"});
            }
        }
    });
};

module.exports.getUserTasksByEmail = function (req, res) {

    let email = req.session.user;
    console.log("[UserController] getUserTasksByEmail() email:",email);
    if(email){
        Users.getUserByEmail(email, function (err, userdetail) {
            if (err) {

            } else {
                console.log("[UserController] getUserTasksByEmail() userdetail:",userdetail);
                Tasks.getTasksByEmail(email, function (err, result_tasks) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            result: {user: userdetail, tasks: []},
                            error: "Error while finding tasks !!!"
                        });
                    } else {
                        let resResult = {user: userdetail, tasks: result_tasks}
                        res.status(200).json({status: 200, result: resResult});
                    }
                });
            }
        });

    }else{
        res.status(401).json({status: 401, error:"Error user not logged in !!!",result: {user: {}, tasks: []}});
    }

};

module.exports.editUserProfile = function (req, res, next) {
    let email = req.session.user;
    let userInfo = req.body;
    console.log("[userController] editUserProfile :", userInfo);
    Users.editUser(email, userInfo, function (err, userResult) {
        if (err) {
            res.status(500).json({status: 500, error: "Failed to edit user detail !!!"});
        } else {
            res.status(200).json({status: 200, result: {user: userResult}});
        }
    });
};

module.exports.validateSession = function (req, res, next) {
    let email = req.session.user;
    console.log("[userController user: ", email);
    Users.getUserByEmail(email, function (err, userdetail) {
        if (err) {
            res.status(500).json({status: 402, result: {user: null, error: "Internal Server error !!!"}})
        } else {
            if (userdetail) {
                res.status(200).json({status: 200, result: {user: userdetail}})
            } else {
                res.status(401).json({status: 401, result: {user: null}})
            }
        }
    });

}

module.exports.logout = function (req, res, next) {
    req.session.destroy();
    res.status(200).json({status: 200, result: {msg: 'User Logged out Successfully!'}})
}

module.exports.renderSignup = function (req, res) {
    res.render('register');
};

module.exports.renderSignin = function (req, res) {
    res.render('register');
};
