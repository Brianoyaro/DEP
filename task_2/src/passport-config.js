const LocalStrategy = require('passport-local').Strategy;
const bcrypt =  require('bcrypt');
const { getUserById } = require('./db-functions');

function intializePassport(passport, getUserByEmail){
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);
        if (!user) {
            return done(null, false, { message: 'Email not found!'})
        }
        try {
            //console.log("Plain text password:", password);
            //console.log("Hashed password from DB:", user[0].password);
            //console.log(user[0].name)
            //console.log('user is:', user)
            if (await bcrypt.compare(password, user[0].password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Incorrect password.'})
            }
        } catch (e) {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user[0].id))
    passport.deserializeUser(async (id, done) => done(null, await getUserById(id)))
}

module.exports = intializePassport;