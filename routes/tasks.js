var express = require('express');
var router = express.Router();
var taskCtl = require('./../controllers/taskController');

router.post('/addtask',taskCtl.addNewTask);
router.post('/gettask',taskCtl.getUserTasksById);
router.post('/updatetask',taskCtl.updateTasksById);
router.post('/deletetask',taskCtl.deleteTasksById);
router.get('/fetchAllTasks', taskCtl.fetchAllTasks);
module.exports = router;
