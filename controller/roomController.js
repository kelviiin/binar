const { Room, sequelize } = require('../models');
const { user_game_history } = require('../models');
const moment = require('moment')


const createRoom = async (req,res,next) =>{
    console.log("Ini user",req.user.dataValues);
    console.log("ini body",req.body);
    await Room.create({
        name:req.body.name,
        player_1_id:req.user.dataValues.id
    }).then(room =>{
        console.log("room created",room);
        res.sendStatus(200);
    })
}

function checkUser(player,room,hand,res,next){
    console.log("masukk");
    let playerHand = [];
    let tempHand = [];

    if(room.player_1_id == player.id){
        Object.assign(playerHand,room.player_1_hands);
        Object.assign(tempHand,room.player_2_hands);
        console.log("playerhand",playerHand)
        try {
            if(playerHand.length < 3){
                playerHand.push(hand);
                // Room.update({player_1_hands:playerHand},{where:{id:room.id}}).then(data=>res.status(200));
                Room.update({
                    player_1_hands:sequelize.fn('array_append',sequelize.col('player_1_hands'),hand)
                },
                {where:{id:room.id}}).then(()=>{
                    res.sendStatus(200);
                })
            }else if(tempHand.length < 3){
                res.send("waiting for your opponent");
            }else if(tempHand.length >= 3){
                res.send("Fight over please cek result");
            }
        } catch (error) {
            next(error)
        }
        
    }
    else if(room.player_1_id != player.id && (room.player_2_id == null || room.player_2_id == player.id) ){
        console.log("plyaer 2");
        Object.assign(playerHand,room.player_2_hands);
        Object.assign(tempHand,room.player_1_hands);
         try {
            if(playerHand.length < 3){
                playerHand.push(hand);
                Room.update({
                    player_2_hands:sequelize.fn('array_append',sequelize.col('player_2_hands'),hand),
                    player_2_id:player.id
                },
                {where:{id:room.id}}).then(()=>{
                    res.sendStatus(200);
                })
            }else if(tempHand.length < 3){
                res.send("waiting for your opponent");
            }else if(tempHand.length >= 3){
                res.send("Fight over please cek result");
            }
        } catch (error) {
            next(error)
        }
    }
}

const duelRoom = (req,res,next) => {
    console.log("masuk",req.user.dataValues.id);
    const user = req.user.dataValues;
    const hand = req.body.hand;
    Room.findOne({
        where:{id:req.params.id}
    }).then(data =>{
        const room = data.dataValues;
        console.log("room player");
        checkUser(user,room,hand,res,next);
    }).catch(error => {
        console.log("room doesn't exist")
        next(error);
    })
}

function calculateResult(player1,player2,result){

    if(result.length < 3){
        for (let i = 0; i < player1.length; i++) {
            if(player1[i] === player2[i]){
                console.log("DRAW");
                result.push("Draw");
            }
            else if(player1[i] == 'rock'){
                if(player2[i] == 'paper'){
                    console.log("COM WIN");
                    result.push("Player 2 win");
                }else{
                    console.log("PLAYER WIN");
                    result.push("Player 1 win");
                }
            }else if(player1[i] == 'paper'){
                if(player2[i] == 'scissor'){
                    console.log("COM WIN");
                    result.push("Player 2 win");
        
                }else{
                    result.push("Player 1 win");
                    console.log("PLAYER WIN");
                }
            }else if(player1[i] == 'scissor'){
                if(player2[i] == 'rock'){
                    console.log("COM WIN");     
                    result.push("Player 2 win");
        
                }else{
                    result.push("Player 1 win");
                    console.log("PLAYER WIN");
                }
            }
            
        }
    }
    return result;
}

const result = (req,res,next) => {
    Room.findOne({
        where:{id:req.params.id}
    }).then(data => {
        const room = data.dataValues;
        let result = [];
        let player1 = [];
        let player2 = [];
        let scorePlayer1,scorePlayer2 = 0;
        Object.assign(result,room.result);
        Object.assign(player1,room.player_1_hands);
        Object.assign(player2,room.player_2_hands);
        console.log("ini data room", room);
        if(player1.length < 3 || player2.length < 3){
            res.status(200).json("player pick hand first");
        }else{
            result = calculateResult(player1,player2,result);
            Room.update({result:result},{where:{id:req.params.id}}).then(data=>{
                res.status(200).json(result);
                for(let i=0;i<result.length;i++){
                    if(result[i] == "Player 1 win"){
                        scorePlayer1 = scorePlayer1 + 1;
                    }else if(result[i] == "Player 2 win"){
                        scorePlayer2 = scorePlayer2 + 1;
                    }
                }
                console.log("ini score 1",scorePlayer1);
                console.log("ini score 2",scorePlayer2);
                if(scorePlayer1 == null){
                    scorePlayer1 = 0;
                }
                if(scorePlayer2 == null){
                    scorePlayer2 = 0;
                }
                if(scorePlayer1 > scorePlayer2){
                    user_game_history.create({
                        user_id:room.player_1_id,
                        score:scorePlayer1,
                    }).then(data => {
                        console.log(data);
                        res.status(200)
                    }).catch(err => next(err))
                }else if( scorePlayer2 > scorePlayer1){
                    console.log("masuk ke create player 2 id",room);
                    user_game_history.create({
                        user_id:room.player_2_id,
                        score:scorePlayer2,
                        date:moment().toDate()
                    }).then(data => {
                        console.log(data);
                        res.status(200)
                    }).catch(err => next(err))
                }
                
            })
        }
        console.log("isi result",result);
    }).catch(error => next(error))
}

module.exports = {
    createRoom,
    duelRoom,
    result
}