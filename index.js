const express = require('express');
const app = express();
const user = require('./user'); 
const currentUser = require('./login.json');
app.use(express.json());
app.use(express.static(__dirname));
const logger = (req,res,next) => {
    console.log(`Incoming request ${req.method} ${req.url},`);
    next();
};

app.use((err,req,res,next) => {
    console.log(err);
    res.status(500).json({
        status:"fail",
        message:"server error"
    })
});

app.use(logger);
app.use(user.router);
app.set("view engine","ejs")
app.get("/", (req,res) =>{
    console.log("app get")
        res.render("home");
})

app.get("/play" ,user.isAuthenticated, (req,res) =>{
    // console.log("play",user.isAuthenticated);
    const name = currentUser.name;
    console.log("ini name",name)
    if(currentUser){
        res.render("play",{
            name
        });
        return;
    }
    res.status(401).json({
        message:`You need to login first`
    });
})



app.listen(8080, () => console.log("App listenin at port 8080"));