const showRoutes = require('./shows');
const searchRoutes = require('./search')
const path = require('path');

const constructorMethod = (app) => {
  app.use('/shows', showRoutes);
  app.use('/search', searchRoutes);
  

  app.get('/', (req,res) => {
    res.render('shows/search'); 
  });
  

  app.use('*', (req, res) => {
    res.sendFile(path.resolve('static/error.html')); 
  });
};

module.exports = constructorMethod;