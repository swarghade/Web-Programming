const express = require('express');
const router = express.Router();
const data = require('../data');
const showData = data.shows;



router.get('/:id', async (req, res) => {

    errors = [];
    idIs = req.params.id
    if (req.params.id == 0) {
      errors.push('Show not found for given id');
    }
    if (!Number(req.params.id)) {
      errors.push('Bad Request');
    }

    if ( Number(req.params.id) <= 0) {
      errors.push('Bad Request');
    }

    failed = 0 
    try {
    const show = await showData.getShowById(req.params.id);
    if (!show){
      failed = false
    }
    show.summary = (show.summary).replace(/<[^>]*>/g, '')
    res.render('shows/single', { show: show })
  } catch (e) {
    failed = true
    errors.push('Show not Found with the given id')
  }
  if(failed == true) {
    res.render('shows/results', {
      errors: errors,
      hasErrors: true,
      searchTerm: idIs 
    });
  }
  
});

router.get('/', async (req, res) => {
  try {

    res.render('shows/search'); 
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;