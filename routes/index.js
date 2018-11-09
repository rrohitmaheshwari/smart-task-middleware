var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var mongoose = require('mongoose');
const mongoURL = "mongodb://smartadmin:tiger123@ds257077.mlab.com:57077/smart-task-db";
mongoose.connect(mongoURL);
var mongoDatabase = mongoose.connection;
var Tasks = require('./../models/tasks');

var mailHelper = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'do.not.reply.rohit@gmail.com',
    pass: 'Zxcvbn~!2017'
  }
});

var mailDetail = {
  from: 'youremail@gmail.com',
  to: '',
  subject: '',
  text: ''
};

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sendemail', function(req, res, next) {
  mailDetail.to = req.body.email;
  mailDetail.subject = req.body.subject;
  mailDetail.text = req.body.text;

  mailHelper.sendMail(mailDetail, function(error, result){
    if (error) {
      console.log(error);
    } else {
      console.log('Successfully Sent Message: ' + result.response);
      res.status(200).json({status:200})
    }
  });

});

router.get('/stats', function(req, res, next){
  let user_email = req.session.user;
  // Here we are searching tasks where owner=req.body.owner or assignee=req.body.owner
  Tasks.getTasksByEmail(user_email, function(err, taskResult){
    console.log("list of tasks:", taskResult);
    if(err){

    }else{
      if(taskResult){
        let monthlyTaskStats = new Array(12);
        for (i=0; i<12 ;i++)
          monthlyTaskStats[i] = {totaltask:0,todo:0,pending:0,completed:0};
        let cumalative_data = [0,0,0]//todo:0,pending:0,completed:0}
        taskResult.map((task)=>{
          let cDate = new Date();

          let dueDate = new Date(task.duedate);
          if(cDate.getYear() === dueDate.getYear() ){
            monthlyTaskStats[dueDate.getMonth()].totaltask +=1;
            if(task.status === "new"){
              cumalative_data[0] += 1;
              monthlyTaskStats[dueDate.getMonth()].todo += 1;
            }else if(task.status === "inprogress"){
              cumalative_data[1] += 1;
              monthlyTaskStats[dueDate.getMonth()].pending += 1;
            }else if(task.status === "completed"){
              cumalative_data[2] += 1;
              monthlyTaskStats[dueDate.getMonth()].completed += 1;
            }
          }

        });
        res.status(200).json({status:200,result:{cumalative_data:cumalative_data,monthlyTaskStats:monthlyTaskStats}})
      }
    }


  });
});






module.exports = router;
