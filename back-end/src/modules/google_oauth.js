const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const dbConn = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

passport.use(new GoogleStrategy({
  callbackURL: `http://localhost:3000/api/auth/google/redirect`,  //same URI as registered in Google console portal
  clientID: '829403040362-dce9oa70kogetd1igmm2mfsmjc4fco8f.apps.googleusercontent.com', //replace with copied value from Google console
  clientSecret: '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',
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      return done(null, profile);      
    } catch (error) {
      done(error)
    }
  }
));