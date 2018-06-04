module.exports = (app) => {
  app.get('/', (req, res, next) => {
    return res.send({
      error: false,
      headers: req.headers
    })
  })
}
