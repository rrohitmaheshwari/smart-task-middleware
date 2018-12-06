// Task Model
var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
  description:{
    type:String
  },
  owner:{
    type:String
  },
  assignee:{
    type:String
  },
  priority:{
    type:String
  },
  taskacceptancestatus:{
    type:String
  },
  duedate:{
    type:String
  },
  startdate:{
    type:String
  },
  status:{
    type:String
  }
});

const Tasks = mongoose.model('tasks',taskSchema);


function addNewTask(taskinfo, callback){
    console.log("[Task_Model] addNewTask() task : ",taskinfo);
    var taskdetail = new Tasks({
      description:taskinfo.description,
      owner:taskinfo.owner,
      assignee:taskinfo.assignee,
      priority:taskinfo.priority,
      status:taskinfo.status,
      status:taskinfo.status,
      taskacceptancestatus:taskinfo.taskacceptancestatus,
      startdate:taskinfo.startdate,
      duedate:taskinfo.duedate
    });
    taskdetail.save(callback);
}

function getTasksByEmail(email, callback){
  var query = {$or:[{owner:email}, {assignee:email}]};
	Tasks.find(query, callback);
}

function getTaskById(task_id, callback){
  Tasks.findById(task_id,callback);
}

function set(email, path, status, callback){
	var query = {email: email, path:path};
	Tasks.update(query, { $set: { isFav: status }}, callback);
}

function updateTask(task_id,updatedinfo, callback){
  console.log("updateTask task model: ",updatedinfo);
  console.log("id: ",task_id);

  Tasks.findById(task_id,function(err,task){
    if(err){
      console.log("updateTask task model: error",err);
      callback(err,task);
    }else{
      task.set(updatedinfo);
      task.save(callback)
    }
  });

}

function deleteTask(condition, callback){
  Tasks.deleteOne(condition, callback);
}

function fetchAll(callback){
	Tasks.find({},callback);
}

module.exports.addNewTask = addNewTask;
module.exports.getTaskById = getTaskById;
module.exports.getTasksByEmail = getTasksByEmail;
module.exports.updateTask = updateTask;
module.exports.deleteTask = deleteTask;
module.exports.fetchAll = fetchAll;
module.exports.Tasks = Tasks;
