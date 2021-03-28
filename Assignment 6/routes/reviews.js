const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews;
const bookData = data.books;

router.get('/:id', async (req, res) => {
  try {
    const book = await bookData.getBookById(req.params.id);
    console.log(book.review)
    res.json(book.reviews);
  } catch (e) {
    res.status(404).json({ error: 'Review not found' });
  }
});
router.get('/review/:id', async (req, res) => {
  try {
    console.log("reached")
    const review = await reviewData.getReviewById(req.params.id);
    // console.log(book.review)
    res.json(review);
  } catch (e) {
    res.status(404).json({ error: 'Review not found' });
  }
});

// router.get('/', async (req, res) => {
//   try {
//     const reviewList = await reviewData.getAllReviews();
//     res.json(reviewList);
//   } catch (e) {
//     res.status(500).json({ error: e });
//   }
// });

router.post('/:id', async (req, res) => {
  const reviewsData = req.body;

  if (!reviewsData) {
    res.status(400).json({ error: 'You must provide data to create a book' });
    return;
  }
  if (!reviewsData.title) {
    res.status(400).json({ error: 'You must provide a title' });
    return;
  }
  if (typeof reviewsData.title != "string" && (reviewsData.title).replace(/\s/g,"").length == 0) {
    res.status(400).json({  error: 'Input type is not a string' });
    return;
  }

  if (!reviewsData.reviewer) {
    res.status(400).json({ error: 'You must provide a reviewer' });
    return;
  }
  if (typeof reviewsData.reviewer != "string" && (reviewsData.reviewer).replace(/\s/g,"").length == 0) {
    res.status(400).json({  error: 'reviewer is not a string' });
    return;
  }
  
  if (typeof reviewsData.rating != "number"){
    res.status(400).json({  error: 'rating is not a number' });
    return;
  }

  if (!reviewsData.dateOfReview) {
    res.status(400).json({ error: 'You must provide a dateOfReview' });
    return;
  }

  let reg = /^\d{1,2}\/\d{1,2}\/\d{4}$/ ;
  if (!reg.test(reviewsData.dateOfReview)){
    res.status(400).json({ error: 'dateOfReview format wrong' });
    return;
  }
  if (!reviewsData.review) {
    res.status(400).json({ error: 'You must provide a review' });
    return;
  }
  if (typeof reviewsData.review != "string" && (reviewsData.review).replace(/\s/g,"").length == 0) {
    res.status(400).json({  error: 'Input type is not a string' });
    return;
  }


  const id = req.params.id

  try {
    const newReview = await reviewData.addReview(
      reviewsData.title,
      reviewsData.reviewer,
      reviewsData.rating,
      reviewsData.dateOfReview,
      reviewsData.review,
      id
    );
    console.log("Reached post route")
    res.json(newReview);
  } catch (e) {
    res.status(500).json({ error: "Update failed" });
  }
});


router.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'You must Supply and ID to delete' });
    return;
  }
  try {
    await reviewData.getReviewById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }
  try {
    const deleteData = await reviewData.removeReview(req.params.id);
    res.json(deleteData);
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete.' });
  }
});

module.exports = router;