const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

const localOptions = {
  usernameField: 'email'
}
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({ email }, (err, user) => {
    if (err) done(err, false)
    if (!user) {
      return done(null, false)
    } else {
      // Compare passwords - is `password` === user.password ?
      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err)
        if (!isMatch) return done(null, false)
        return done(null, user)
      })
    }
  })
})

const User = require('../models/User')
const config = require('../config')

// Setup options for JWT JwtStrategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

// Create JWT JwtStrategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user ID in the payload exists in the database
  // If it does, call 'done' with that user object
  // Otherwise, call 'done' without user object
  User.findById(payload.sub, (err, user) => {
    if (err) return done(err, false)
    if (user) return done(null, user)
    if (!user) return done(null, false)
  })
})

passport.use(jwtLogin)
passport.use(localLogin)
