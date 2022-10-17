require('dotenv').config();
const express = require('express');
const app = express();
const admin = require('./routes/auth'); 
const create = require('./routes/create');
const view = require('./routes/view');
const room = require('./routes/room');

const currentUser = require('./login.json');
const session = require('express-session');
const flash = require('express-flash');

const memoryStore = session.MemoryStore();
const passport = require('./lib/passport');
const restrict = require('./middleware/restrict');
app.use(session({
  secret:"secret",
  resave:false,
  saveUninitialized:false,
  store:memoryStore
}));


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
app.use(create);
app.use(view);
app.use(logger);
app.use(admin);
app.use(room);
app.set("view engine","ejs")
app.get("/", (req,res) =>{
        res.render("home");
})

app.get("/play" ,restrict, (req,res) =>{
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