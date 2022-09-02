const express = require('express');
const router = express.Router();
const fs = require('fs');
let currentUser = require('./login.json');
let account = require('./user.json');
const logger = (req,res,next) => {
    console.log(`From user data`);
    next();
};
router.use(express.json())
router.use(logger)


router.post('/api/v1/register', (req,res) => {
    let exist = account.find(i => i.username == req.body.username);
    console.log("ini exist",exist);
    if(exist){
        res.status(409).json({
            message:`Account already exist`
        })
        return;
    }
    if(!req.body.username || !req.body.password || !req.body.name ){
        res.status(400).json({
            message:`Username or password or name must be fill`
        })
        return;
    }
    account.push(req.body)
    fs.writeFileSync("./user.json",JSON.stringify(account))
    res.status(200).json({
        message:`Account succesfully registered!`,
        account:account
    })
    
    
})

const isAuthenticated = (req,res,next) => {
    console.log("ini current user",currentUser);
    if(currentUser.username){
        console.log("masuk current user",currentUser)
        next();
    }else{
        res.sendStatus(401)
    }
}



router.post('/api/v1/login', (req,res)=> {
    if(!req.body.username || !req.body.password ){
        res.status(400).json({
            message:`Username/password must be fill`
        })
        return;
    }
    let exist = account.find(i => i.username == req.body.username);
    if(exist){
        if(exist.username == req.body.username && exist.password == req.body.password){
            res.status(200).json({
                message:`Succesfully logged in`,
                name:`${exist.name}`
            })
            currentUser = exist;
            
            console.log("islogin",currentUser);
            fs.writeFileSync("./login.json",JSON.stringify(currentUser))

            return;
        }
    }
    res.status(401).json({
        message : `Account is not registered!!`
    })

    
})

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

module.exports.router = router;
module.exports.isAuthenticated = isAuthenticated;