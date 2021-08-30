

const constructorMethod = (app) => {

  app.get('/', (req,res) => {
    res.render('layouts/main'); 
  });
  

  app.use('*', (req, res) => {
    res.render('layouts/main'); 
  });
};

module.exports = constructorMethod;