  
const reviewRoutes = require('./reviews');
const bookRoutes = require('./books');

const constructorMethod = (app) => {
  app.use('/reviews', reviewRoutes);
  app.use('/books', bookRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;