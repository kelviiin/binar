const { Admin } = require('../models');
const { user_game } = require('../models');
const passport = require('../lib/passportAdmin');
const { user_game_biodata }= require('../models');
const moment = require('moment');


const register =  (req,res,next)=>{
    Admin.register(req.body)
    .then(()=> res.status(200).json("Succcess create admin"))
    .catch(err =>{
        console.log("ini error",err);
        next(err);
    })
}

const login = passport.authenticate("local",{
    successRedirect:"/user/list",
    failureRedirect:"/",
    failureFlash:true,
});

const loginForm = (req,res,next)=>{
    res.render("login");
}

const list = async (req,res,next) => {
    try {
        await user_game.findAll().then( users => {
            res.render("dashboard",{users})
        })
    } catch (error) {
        next(error);
    }
}


const find = async (req,res,next) => {
    try {
        await user_game.findOne({
            where:{id:req.params.id},
            include:[{
                model:user_game_biodata,
                as:"user_game_biodata",
                where:{user_id:req.params.id}
            }]
        }).then( users => {
            console.log(users,"isi datanya");
            const userBio = users.user_game_biodata;
            res.render("userBiodata",{users,userBio,moment})
        })
    } catch (error) {
        next(error);
    }
   
}

const update = async (req,res,next) => {
    try {
        const body = req.body
        await user_game_biodata.update(
        body
        ,{where:{user_id:req.params.id}}).then(data => {
        res.status(200).json(data);
    })
    } catch (error) {
        next(error);
    }
}


const deleteUser = async (req,res,next) => {
    console.log("masukkk deleteee");
    try {
        await user_game_biodata.destroy({where:{user_id:req.params.id},}).then( () => {
            user_game.destroy({
                where:{id:req.params.id}
            }).then((data) =>{
                res.status(200).json("success delete user")
            })
            console.log("isi datanya");
        })
    } catch (error) {
        next(error);
    }
    
}

module.exports = {
    register,
    login,
    loginForm,
    list,
    deleteUser,
    update,
    find,
}