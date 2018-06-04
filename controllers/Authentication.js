const jwt = require('jwt-simple')

const config = require('../config')
const User = require('../models/User')

const createTokenForUser = user => {
  const timestamp = new Date().getTime()
  return jwt.encode({
    sub: user._id,
    iat: timestamp
  }, config.secret)
}

exports.signin = (req, res, next) => {
  console.log(req)
  res.send({
    token: createTokenForUser(req.user)
  })
}

exports.signup = (req, res, next) => {
  const { email, password } = req.body
  if (!email) return res.status(422).send({
    success: false,
    message: 'Please provide email'
  })
  if (!password) return res.status(422).send({
    success: false,
    message: 'Please provide password'
  })
  User.findOne({ email }, (error, user) => {
      if (error) return res.json({
        success: false,
        message: error.message
      })
      if (user) {
        return res.status(422).json({
          success: true,
          isNewUser: false
        })
      } else {
        const newUser = new User({ email, password })
        newUser.save((error) => {
          if (error) return res.json({
            success: false,
            message: error.message
          })
          return res.json({
            success: true,
            isNewUser: true,
            result: {
              user: newUser,
              token: createTokenForUser(newUser)
            }
          })
        })
      }
    })
}
