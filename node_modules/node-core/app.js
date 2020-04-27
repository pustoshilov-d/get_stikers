module.exports = app => {
  require('./app/core/initialize')(app)

  app.Controller = require('./app/core/constroller')(app)
  app.Service = require('./app/core/service')(app)
}
