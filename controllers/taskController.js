//Task controller file

var mongoose = require('mongoose');
const mongoURL = "mongodb://smartadmin:tiger123@ds257077.mlab.com:57077/smart-task-db";
mongoose.connect(mongoURL);
var mongoDatabase = mongoose.connection;
var Tasks = require('./../models/tasks');

module.exports.addNewTask = function (req, res) {
  console.log("In addNewTask", req.body.priorityoption, " taskcolor", req.body.taskcolor, " req.body ", req.body);
  console.log("In req.body.description", req.body.description, " req.body.owner", req.body.owner, " assinee ", req.body.assignee);
  console.log("(req.body.owner === req.body.assignee)", (req.session.user === req.body.assignee), "req.session.user", req.session.user)
  let cDate = new Date().toISOString().slice(0, 10)
  let acceptancestatus = "pending";
  if (req.body.owner) {
    acceptancestatus = (req.body.owner === req.body.assignee) ? "accepted" : "pending";
  } else {
    acceptancestatus = (req.session.user === req.body.assignee) ? "accepted" : "pending";
  }

  var taskdetail = {
    description: req.body.description,
    owner: (req.body.owner ? req.body.owner : req.session.user),
    assignee: req.body.assignee,
    taskacceptancestatus: acceptancestatus,
    priority: req.body.priorityoption,
    status: "new",
    startdate: cDate,
    duedate: req.body.duedate
  }
  Tasks.addNewTask(taskdetail, function (err, result) {
    if (err) {
      console.log("Failed to add new task");
      res.status(401).json({ status: 401, error: "Failed to retrieve tasks, error: " + err });
    } else {
      // Here we are searching tasks where owner=req.body.owner or assignee=req.body.owner
      Tasks.getTasksByEmail(taskdetail.owner, function (err, taskResult) {
        console.log("list of tasks:", taskResult);
        res.status(200).json({ status: 200, result: { tasks: taskResult } });
      });
    }
  });
};

module.exports.getUserTasksById = function (req, res) {
  let task_id = req.body.task_id;
  Tasks.getTaskById(task_id, function (err, result_tasks) {
    if (err) {

    } else {
      console.log("task: " + JSON.stringify(result_tasks));
      res.status(200).json({ status: 200, result: { tasks: result_tasks } });
    }
  });
};

module.exports.deleteTasksById = function (req, res) {

  let task_id = req.body.task_id;
  let user_email = req.session.user;
  Tasks.deleteTask({ _id: task_id }, function (error, result) {
    if (error) {
      res.status(500).json({ status: 500, error: "Failed to delete task !!!" });
    } else {
      // Here we are searching tasks where owner=req.body.owner or assignee=req.body.owner
      Tasks.getTasksByEmail(user_email, function (err, taskResult) {
        console.log("list of tasks:", taskResult);
        res.status(200).json({ status: 200, msg: "Task deleted successfully :)", result: { tasks: taskResult } });

      });
    }


  });

};

module.exports.updateTasksById = function (req, res) {
  let taskdetail = req.body.taskdetail;
  let task_id = req.body.task_id;
  let user_email = req.session.user;
  console.log("user_email", user_email);
  console.log(taskdetail);
  Tasks.updateTask(task_id, taskdetail, function (err, result_tasks) {
    if (err) {

    } else {
      // Here we are searching tasks where owner=req.body.owner or assignee=req.body.owner
      Tasks.getTasksByEmail(user_email, function (err, taskResult) {
        console.log("list of tasks:", taskResult);
        res.status(200).json({ status: 200, result: { tasks: taskResult } });
      });

    }
  });
};

module.exports.fetchAllTasks = function (req, res) {
  Tasks.fetchAll(function (err, taskResult) {
    let tasks = [];
    for (let i = 0; i < taskResult.length; i++) {
      tasks.push({
        owner: taskResult[i].owner,
        assignee: taskResult[i].assignee,
        status: taskResult[i].status,
        startdate: taskResult[i].startdate,
        duedate: taskResult[i].duedate,
      });
    }
    res.status(200).json({ status: 200, tasks: tasks });
  });
};