const express = require('express');
const router = express.Router();
const data = require('../data');
const bookData = data.books;

router.get('/:id', async (req, res) => {
  try {
    let book = await bookData.getBookById(req.params.id);
    res.json(book);
  } catch (e) {
    res.status(404).json({ error: 'book not found' });
  }
});

router.get('/', async (req, res) => {
  try {
    console.log('reached /books')
    let bookList = await bookData.getAllBooks();
    // console.log(bookList)
    res.json(bookList);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  let bookInfo = req.body;
  if (!bookInfo) {
    res.status(400).json({ error: 'You must provide data to create a book' });
    return;
  }
  if (!bookInfo.title) {
    res.status(400).json({ error: 'You must provide a title' });
    return;
  }
  if (typeof bookInfo.title != "string" && (bookInfo.title).replace(/\s/g,"").length == 0) {
    res.status(400).json({  error: 'Input type is not a string' });
    return;
  }
  if (!bookInfo.author) {
    res.status(400).json({ error: 'You must provide a author' });
    return;
  }

  if (typeof((bookInfo.author).authorFirstName) != "string" && ((bookInfo.author).authorFirstName).replace(/\s/g,"").length == 0) {
    res.status(400).json({  error: 'firstname type is not a string' });
    return;
  }

  if (typeof((bookInfo.author).authorLastName) != "string" && ((bookInfo.author).authorLastName).replace(/\s/g,"").length == 0) {
    res.status(400).json({  error: 'Lastname type is not a string' });
    return;
  }
  if (!bookInfo.genre) {
    res.status(400).json({ error: 'You must provide a genre' });
    return;
  }
  if (!Array.isArray(bookInfo.genre) || (bookInfo.genre).length === 0) {
    res.status(400).json({ error: 'genre is not array or empty' });
    return;
  }
  if (!bookInfo.datePublished) {
    res.status(400).json({ error: 'You must provide a datePublished' });
    return;
  }
  let reg = /^\d{1,2}\/\d{2}\/\d{4}$/ ;
  if (!reg.test(bookInfo.datePublished)){
    res.status(400).json({ error: 'datePublished format wrong' });
    return;
  }
  if (!bookInfo.summary) {
    res.status(400).json({ error: 'You must provide a summary' });
    return;
  }
  if (typeof bookInfo.summary != "string" && (bookInfo.title).replace(/\s/g,"").length == 0) {
    res.status(400).json({  error: 'Input type is not a string' });
    return;
  }

  try {
    const newBook = await bookData.addBook(
      bookInfo.title,
      bookInfo.author,
      bookInfo.genre,
      bookInfo.datePublished,
      bookInfo.summary
    );
    res.json(newBook);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  let bookInfo = req.body;

  if (!bookInfo) {
    res.status(400).json({ error: 'You must provide data to create a book' });
    return;
  }
  if (!bookInfo.title) {
    res.status(400).json({ error: 'You must provide a title' });
    return;
  }
  if (typeof bookInfo.title != "string" && (bookInfo.title).replace(/\s/g,"").length == 0) {
    res.status(400).json({  error: 'Input type is not a string' });
    return;
  }
  if (!bookInfo.author) {
    res.status(400).json({ error: 'You must provide a author' });
    return;
  }

  if (typeof((bookInfo.author).authorFirstName) != "string"  && ((bookInfo.author).authorFirstName).replace(/\s/g,"").length == 0) {
    res.status(400).json({  error: 'firstname type is not a string' });
    return;
  }

  if (typeof((bookInfo.author).authorLastName) != "string"  && ((bookInfo.author).authorLastName).replace(/\s/g,"").length == 0) {
    res.status(400).json({  error: 'Lastname type is not a string' });
    return;
  }
  if (!bookInfo.genre) {
    res.status(400).json({ error: 'You must provide a genre' });
    return;
  }
  if (!Array.isArray(bookInfo.genre) || (bookInfo.genre).length === 0) {
    res.status(400).json({ error: 'genre is not array or empty' });
    return;
  }
  if (!bookInfo.datePublished) {
    res.status(400).json({ error: 'You must provide a datePublished' });
    return;
  }
  let reg = /^\d{1,2}\/\d{2}\/\d{4}$/ ;
  if (!reg.test(bookInfo.datePublished)){
    res.status(400).json({ error: 'datePublished format wrong' });
    return;
  }
  if (!bookInfo.summary) {
    res.status(400).json({ error: 'You must provide a summary' });
    return;
  }
  if (typeof bookInfo.summary != "string" && (bookInfo.summary).replace(/\s/g,"").length == 0) {
    res.status(400).json({  error: 'Input type is not a string' });
    return;
  }
  try {
    await bookData.getBookById(req.params.id);
    // console.log(req.params.id + "n1")
  } catch (e) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
  try {
    const updatedBook = await bookData.updateBook(req.params.id, bookInfo);
    // console.log("after update")
    res.json(updatedBook);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.patch('/:id', async (req, res) =>{
  let bookInfo = req.body;
  // console.log(bookInfo)
  if (bookInfo.title && typeof bookInfo.title != "string" ) {
    res.status(400).json({  error: 'title type is not a string' });
    return;
  }
  console.log("reached")
  if (bookInfo.author && typeof((bookInfo.author).authorFirstName) != "string") {
    res.status(400).json({  error: 'firstname type is not a string' });
    return;
  }

  if (bookInfo.author && typeof((bookInfo.author).authorLastName) != "string") {
    res.status(400).json({  error: 'Lastname type is not a string' });
    return;
  }

  if (bookInfo.genre &&!Array.isArray(bookInfo.genre) || (bookInfo.genre).length === 0) {
    res.status(400).json({ error: 'genre is not array or empty' });
    return;
  }

  let reg = /^\d{1,2}\/\d{2}\/\d{4}$/ ;
  if (!reg.test(bookInfo.datePublished)){
    res.status(400).json({ error: 'datePublished format wrong' });
    return;
  }
  if (bookInfo.summary && typeof bookInfo.summary != "string") {
    res.status(400).json({  error: 'Input type is not a string' });
    return;
  }

  try {
    await bookData.getBookById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }

  try {
    const updatedBook = await bookData.updatePatchBook(req.params.id,bookInfo);
    res.json(updatedBook);
  } catch (e) {
    res.status(404).json({ error: 'Error Updating' });
    return;
  } 


});

router.delete('/:id', async (req, res) => {
  if (!req.params.id) throw 'You must specify an ID to delete';
  try {
    await bookData.getBookById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }

  try {
    const deleteData = await bookData.removeBook(req.params.id);
    res.json(deleteData);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;