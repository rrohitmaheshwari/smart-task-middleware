//User Model
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  firstname:{
    type:String
  },
  lastname:{
    type:String
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  phone:{
    type:String
  }
});

const Users = mongoose.model('users',userSchema);


function addNewUser(userinfo, callback){
    console.log("[User_Model] addNewUser() userinfo : ",userinfo);
    var userdetail = new Users({
      firstname:userinfo.firstname,
      lastname:userinfo.lastname,
      email:userinfo.email,
      password:userinfo.password,
      phone:userinfo.phone
    });
    userdetail.save(callback);
}

function getUserByEmail(email, callback){
  console.log("[User_Model] getUserByEmail() email : ",email);
  var query = {email: email};
	Users.findOne(query, callback);
}

function editUser(email,updatedinfo, callback){
  console.log("editUser User model: ",updatedinfo);
  Users.findOne({email: email}, function(err,user){
    if(err){
      console.log("updateTask task model: error",err);
      callback(err,user);
    }else{
      
      user.set(updatedinfo);
      user.save(callback)
    }
  });

}


module.exports.addNewUser = addNewUser;
module.exports.getUserByEmail = getUserByEmail;
module.exports.editUser = editUser;
module.exports.Users = Users;
