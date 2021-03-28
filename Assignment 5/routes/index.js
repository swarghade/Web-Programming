const showRoutes = require('./shows');

const constructorMethod = (app) => {
  app.use('/shows', showRoutes);
  
  app.use('/aboutme', (req, res) => {
    object = {
      name: "Shubham Warghade",
      cwid: "10467133",
      biography: "My name is Shubham and I'm pursuing my masters in Information System. I'm currently working as a Teaching Assistant for Data Analytics and ML. \n I really have a knack for Data management &  Analytics and that is what my course trajectory would look like.",
      favoriteShows: ["Peaky Blinders", "Naruto", "Money Heist", "Friends"]
    }
    res.json(object)
  })

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;