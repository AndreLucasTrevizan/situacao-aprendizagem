const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const dbConn = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});   

passport.use(new FacebookStrategy({
  callbackURL: `http://localhost:3000/api/auth/facebook/callback`,  //same URI as registered in Google console portal
  clientID: '324148973019197', //replace with copied value from Google console
  clientSecret: 'd20d6d8a275687b38371a4bd864b1571',
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            return done(null, {token: accessToken, ...profile});
        } catch (error) {
            done(error)
        }
    }
));