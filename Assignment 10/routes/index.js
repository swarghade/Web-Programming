const routes = require("./session")
const cookieParser = require('cookie-parser')
const path = require("path")

const constructorMethod = (app) => {
  app.use('/', routes);
  app.use('/logout', routes);
  app.use('/private', routes, cookieParser);
  app.use(cookieParser());
  app.use('*', (req, res) => {
    res.render('login'); 
  });
};

module.exports = constructorMethod;
