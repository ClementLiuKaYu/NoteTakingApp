const LocalStrategy = require('passport-local').Strategy
// const passport = require('passport')
const bcrypt = require('bcrypt')

const initialize = (passport,getUserByEmail,getUserById) => {
    const userAuthentication = async (email,password,done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null,false,{message:'No user with that email'})
        }

        try{
            if(await bcrypt.compare(password,user.password)){
                return done(null,user)
            }else{
                return done(null,false,{message:'Password incorrect'})
            }
        }catch(e){
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField:'email'},userAuthentication))
    passport.serializeUser((user,done) => done(null,user.id))
    passport.deserializeUser((id,done) => done(null,getUserById(id)))
    
}

const checkAuth = (req,res,next) => {
    if (req.isAuthenticated()){
        console.log('checkauth ok')
        return next()
    }
    res.redirect('/login')
}

const checkNotAuth = (req,res,next) => {
    if (req.isAuthenticated()){
        return res.redirect('/')
    }
    console.log('checknotauth ok')
    next()
    return
}

module.exports = {
    initialize,
    checkAuth,
    checkNotAuth
}