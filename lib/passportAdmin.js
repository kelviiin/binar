const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Admin } = require("../models");

const authenticate = async (username,password,done) => {
    try {
        const user = await Admin.authenticate({username,password});

        return done(null, user);
    } catch (error) {
        return done(null,false,{message: error});
    }
    

}

passport.use(
    new LocalStrategy({
        usernameField:"username",
        passwordField:"password",
    },authenticate)
);

passport.serializeUser((user,done) => done(null,user.id));

passport.deserializeUser( async (id,done) => done(null,await Admin.findByPk(id)));

module.exports = passport;
