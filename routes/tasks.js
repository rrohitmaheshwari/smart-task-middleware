var express = require('express');
var router = express.Router();
var taskCtl = require('./../controllers/taskController');

/* task controller */
/*router.get('/addtask', function (req, res) {
    console.log("inside add task " + req.session.user);

});*/

router.post('/addtask',taskCtl.addNewTask);
router.post('/gettask',taskCtl.getUserTasksById);
router.post('/updatetask',taskCtl.updateTasksById);
router.post('/deletetask',taskCtl.deleteTasksById);
module.exports = router;
