const express = require('express');
const router = express.Router();
const fs = require('fs');
const restrict = require('../middleware/restrictAdmin');
const auth = require('../controller/authController');
let currentUser = require('../login.json');



router.post('/admin/register',auth.register);
router.get('/admin/login',auth.loginForm);
router.post('/admin/login',auth.login);
router.get('/admin/list' ,restrict, auth.list);
router.get('/find/:id', restrict, auth.find);
router.post('/user/delete/:id' ,restrict, auth.deleteUser);
router.post('/update/:id', restrict, auth.update);
router.post('/api/v1/logout', (req,res)=> {
    if(currentUser.name){
        console.log("masuk")
        currentUser = {};
        fs.writeFileSync("./login.json",JSON.stringify(currentUser))
        res.status(200).json({
            message:`Succesfully logout`
        })
        return;
    }
    console.log("jalan")
    res.status(400).json({
        message:`Cannot logout you need to login first`
    })
})

module.exports = router;