const express = require('express');
const router = express.Router();
const { user_game } = require('../models');


router.use(express.json());

router.get('/user' , ( req,res ) => {
    user_game.findAll().then( user => {
        console.log(user);
        res.status(200).json(user);
    })
})

router.get('/user/:id', ( req,res ) => {
    user_game.findOne({
        where:{id:req.params.id}
    }).then( user =>{
        res.status(200).json(user);
    })
})




module.exports = router;