const { user_game } = require('../models');
const { user_game_biodata }= require('../models');



const login = (req,res,next) => {
    console.log("masuk");
    user_game.authenticate(req.body)
    .then(user => {
        res.json({
            id: user.id,
            username: user.username,
            accessToken: user.generateToken(),
        });
    }).catch(err => {
        console.log(err);
        next(err)
    });
}

const whoami = (req,res,next)=>{
    // res.render("profile",req.user.dataValues);
    const currentUser = req.user;
    console.log("ini user",req.user);
    res.json({
        id:currentUser.id,
        username:currentUser.username,
    });
}

const register = async (req,res,next)=>{
        const { username,password } = req.body;
        console.log(req.body,"BODY")
         await user_game.register({ username,password}).then( user => {
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
        
}

const registerForm = (req,res,next) => {
    res.render("createUser");
}


const bio = async (req,res) => {
    try {
    await user_game_biodata.findAll().then(users => {
        res.status(200).json(users);
    })
    } catch (error) {
        next(error);
    }
}

const loginForm = (req,res,next)=>{
    res.render("loginUser");
}


module.exports = {
    register,
    registerForm,
    bio,
    login,
    whoami,
    loginForm
}