const express = require('express');
const router = express.Router();
const data = require('../data');
const showData = data.shows;

router.get('/:id', async (req, res) => {
  
    if (req.params.id == 0) return res.status(400).json({ message: `Show not found for given id` })
    if (!Number(req.params.id))  return res.status(400).json({ message: `Bad Request` })
    else if ( Number(req.params.id) <= 0) {
      return res.status(400).json({ message: `Bad Request` })
    }
    try {
    const show = await showData.getShowById(req.params.id);
    res.json(show);
  } catch (e) {
    res.status(404).json({ message: 'Show not found for given id'});
  }
});

router.get('/', async (req, res) => {
  try {
    const showList = await showData.getAllShows();
    res.json(showList);
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/', async (req, res) => {
  // Not implemented
  res.status(501).send();
});

router.delete('/', async (req, res) => {
  // Not implemented
  res.status(501).send();
});

module.exports = router;