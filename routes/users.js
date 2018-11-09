var express = require('express');
var router = express.Router();
var userCtl = require('./../controllers/userController');


router.post('/signup',userCtl.signUpUser);
router.post('/signin',userCtl.signInUser);
router.post('/edituser',userCtl.editUserProfile);
router.get('/getusertasks',userCtl.getUserTasksByEmail);
router.get('/validatesession',userCtl.validateSession);
router.get('/logout',userCtl.logout);
module.exports = router;
