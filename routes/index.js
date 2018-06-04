const passport = require('passport')

const Authentication = require('../controllers/Authentication')
const passportService = require('../services/passport')

const requireAuth = passport.authenticate('jwt', {
  session: false
})

const requireSignin = passport.authenticate('local', {
  session: false
})

module.exports = (app) => {
  app.post('/', requireAuth, (req, res) => {
    return res.send({
      error: false,
      message: 'Welcome to the Server Api'
    })
  })
  app.post('/signin', requireSignin, Authentication.signin)
  app.post('/signup', Authentication.signup)
}
