const mongoCollections = require('../config/mongoCollections');
const books = mongoCollections.books;
const uuid = require('uuid/v4');
const { ObjectID } = require('bson');
var mongodb = require('mongodb'); 

let exportedMethods = {
  async getAllBooks() {
    const bookCollection = await books();
    const bookList = await bookCollection.find({}).project( {_id: { "$toString": "$_id" },title:1}).toArray();

    console.log(typeof (bookList[0])._id)

    if (!bookList) throw 'No books in system!';
    // console.log(bookList)
    return bookList;
  },
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!
  async getBookById(id) {
    const bookCollection = await books();
    // console.log(id)
    const book = await bookCollection.findOne({  _id:mongodb.ObjectId(id) });
    // console.log(book)
    if (!book) throw 'User not found';
    return book;
  },

  async addBook(title, author, genre, datePublished, summary) {
    const bookCollection = await books();

    let newBook = {
      // _id = ObjectID,
      title: title,
      author: {authorFirstName: (Object.values(author))[0], authorLastName: (Object.values(author))[1]},
      genre: genre,
      datePublished: datePublished,
      summary: summary,
      reviews: []
    };


    const newInsertInformation = await bookCollection.insertOne(newBook);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    return await this.getBookById(newInsertInformation.insertedId);
  },

  async addReviewToBook(bookId, reviewId, newReview) {
    let currentUser = await this.getBookById(bookId);
    // console.log(bookId);
    // console.log(newReview + "reached")
    const bookCollection = await books();
    const updateInfo = await bookCollection.updateOne(
      { _id: bookId },
      { $addToSet: { reviews: newReview } }
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';

    return await this.getBookById(bookId);
  },
  async removeBook(id) {
    const bookCollection = await books();
    let temp = id
    const deletionInfo = await bookCollection.removeOne({ _id: mongodb.ObjectId(id) });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete book with id of ${id}`;
    }
    obj = { "bookID":id, "deleted":true }
    return obj;
  },
  async updateBook(id, updatedBook) {
    const book = await this.getBookById(id);
    // console.log(book);

    let userUpdateInfo = {
      title: updatedBook.title,
      author: updatedBook.author,
      genre: updatedBook.genre,
      datePublished: updatedBook.datePublished,
      summary: updatedBook.summary,
      reviews: []
    };
    const bookCollection = await books();
    const updateInfo = await bookCollection.updateOne(
      { _id: mongodb.ObjectId(id) },
      { $set: userUpdateInfo }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';
    console.log("Updated Successfully")
    return await this.getBookById(id);
  },

  async updatePatchBook(id,updatedObj) {
    oldObj = await this.getBookById(id)
    if (updatedObj.genre) {
      // console.log("Exists");
      // console.log(oldObj.genre + " old Obj")
      // console.log(updatedObj.genre + " new Obj")
      tempArr = (oldObj.genre).concat(updatedObj.genre)
      updatedObj.genre = tempArr.filter( function(val, idx, array){
          return array.indexOf(val) == idx
      })}
    const bookCollection = await books();
    const updateInfo = await bookCollection.updateOne(
      { _id: mongodb.ObjectId(id) },
      { $set: updatedObj }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';
    console.log("Updated Successfully")
    return await this.getBookById(id);
  },

  async removeReviewFromBook(reviewId) {
    const bookCollection = await books();
    // const bookList = await bookCollection.find({}).toArray();

    
    console.log("reached in removeReviewFromBook ")
    // console.log(bookCollection)
    // try{
      const bookID =  await bookCollection.findOne({reviews: {$elemMatch:  {_id: mongodb.ObjectID(reviewId)}}})
      console.log(JSON.stringify(bookID) + "book id")
      temp = bookID._id
      console.log(temp)
      // return bookID
    // } catch(e){
    //   console.log(e)
    // }
    
    // console.log(JSON.stringify(bookID) + "book id") 
    // let currentUser = await this.getBookById(userId);
    // console.log(currentUser);

    // const bookCollection = await books();
    const updateInfo = await bookCollection.updateOne(
      { _id: temp },
      { $pull: { reviews: { _id: reviewId } } }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';
    console.log("review removed from book")  
    return await this.getBookById(temp);
  }
};

module.exports = exportedMethods;