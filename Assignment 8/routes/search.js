const express = require('express');
const router = express.Router();
const data = require('../data');
const showData = data.shows;

router.post('/', async (req, res) => {
  
    word = req.body.searchTerm
    // console.log(word)
    // console.log(word.replaceAll(/\s/g,"").length)
    let errors = [];

    if (!word) {
      errors.push('No Text provided');
    }
    if(typeof word !== 'string'){
      errors.push('Wrong Data Type');
    }
    if (word.replaceAll(/\s/g,"").length == 0) {
      console.log("yes")
      errors.push('Only Spaces Provided')
    }
  
    if (errors.length > 0) {
      const show = await showData.getShowBySearch(req.body.searchTerm);
      console.log("reach")
      res.render('shows/results', {
        errors: errors,
        hasErrors: true,
        post: word,
        show: show
      });
      return;
    }

    try {
    const show = await showData.getShowBySearch(req.body.searchTerm);
    length = show.length
    res.render('shows/results', { shows:show , searchTerm:word});
  } catch (e) {
    res.status(404).json({ message: 'Show not found for given ' + req.body.searchTerm});
  }
});

module.exports = router;