const express = require('express');
const router = express.Router();
const { user_game } = require('./models');
const { user_game_biodata }= require('./models');
const user = require('./user');
const moment = require('moment');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(express.json());


router.post('/user' ,user.isAuthenticated, async ( req,res ) => {
    const { username,password } = req.body;
    console.log(req.body,"BODY")
     await user_game.create({ username,password}).then( user => {
        try {
            user_game_biodata.create({
                user_id:user.id,
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                birthday:req.body.birthday,
                gender:req.body.gender,
                location:req.body.location,
                phone:req.body.phone
            })
        } catch (error) {
            res.status(500).json("cant create user biodata")
        }
        
        console.log(user);
        res.status(200).json(user);
    }).catch(err =>{
        res.status(500).json("cant create user")
    })
    
})

router.get('/user/create' , (req,res) => {
    res.render("createUser");
})


router.get('/user/list' ,user.isAuthenticated, (req,res) => {
    user_game.findAll().then( users => {
        res.render("dashboard",{users})
    })
})

router.get('/user/:id', user.isAuthenticated, (req,res) => {
    user_game.findOne({
        where:{id:req.params.id},
        include:[{
            model:user_game_biodata,
            as:"user_game_biodata",
            where:{user_id:req.params.id}
        }]
    }).then( users => {
        console.log(user,"isi datanya");
        const userBio = users.user_game_biodata;
        res.render("userBiodata",{users,userBio,moment})
    })
})

router.post('/user/:id', user.isAuthenticated, (req,res) => {
    const body = req.body
    user_game_biodata.update(
        body
        ,{where:{user_id:req.params.id}}).then(data => {
        res.status(200).json(data);
    })
})

router.get('/user-biodata' , (req,res) => {
    user_game_biodata.findAll().then(users => {
        res.status(200).json(users);
    })
});


router.post('/user/delete/:id' ,user.isAuthenticated, async (req,res) => {
    console.log("masukkk deleteee");
    await user_game_biodata.destroy({where:{user_id:req.params.id},}).then( () => {
        user_game.destroy({
            where:{id:req.params.id}
        }).then((data) =>{
            res.status(200).json("success delete user")
        })
        console.log("isi datanya");
    })
})



module.exports = router;