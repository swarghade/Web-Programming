const apiRoutes = require('./api');

const constructorMethod = (app) => {
  app.use('/api', apiRoutes);

  app.get('/', function (req,res) {
    res.render('layouts/main');
  });

  app.get('/shows', function (req,res) {
    res.render('shows');
  })


  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
