const express = require('express');
const router = express.Router();
const user = require('../controller/userController');
const restrict = require('../middleware/restrict');


router.post('/user', user.register);
router.get('/user/create' , user.registerForm);
router.get('/user-biodata' ,restrict, user.bio);
router.post('/user/login',user.login);
router.get('/user/whoami',restrict,user.whoami);
router.get('/user/login',user.loginForm);




module.exports = router;