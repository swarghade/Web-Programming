const mongoCollections = require('../config/mongoCollections');
const reviews = mongoCollections.reviews;
const books = require('./books');
const uuid = require('uuid/v4');
const { ObjectID } = require('bson');
var mongodb = require('mongodb'); 

const exportedMethods = {
  async getAllReviews() {
    const reviewCollection = await reviews();
    return await reviewCollection.find({}).toArray();
  },
  async getReviewsByTag(tag) {
    if (!tag) throw 'No tag provided';

    const reviewCollection = await reviews();
    return await reviewCollection.find({ tags: tag }).toArray();
  },
  async getReviewById(id) {
    const reviewCollection = await reviews();
    const review = await reviewCollection.findOne({ _id: mongodb.ObjectId(id) });
    console.log(review)
    if (!review) throw 'Review not found';
    return review;
  },
  
  async addReview(title, reviewer, rating, dateOfReview, review, bookId) {

    
    const reviewCollection = await reviews();


    const newReview = {
      // _id: ObjectID,
      title: title,
      reviewer: reviewer,
      rating: rating,
      dateOfReview: dateOfReview,
      review: review
    };
    bookId = mongodb.ObjectId(bookId)

    const newInsertInformation = await reviewCollection.insertOne(newReview);
    const newId = newInsertInformation.insertedId;
    await books.addReviewToBook(bookId, newId, newReview);
    console.log("Added Review")
    return await this.getReviewById(newId);
  },
  async removeReview(id) {
    const reviewCollection = await reviews();
    let temp = id
    let post = null;
    try {
      review = await this.getReviewById(id);
    } catch (e) {
      console.log(e);
      return;
    }
    console.log("assigned")
    const deletionInfo = await reviewCollection.removeOne({ _id: mongodb.ObjectId(id) });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete post with id of ${id}`;
    }
    console.log(review._id)
    await books.removeReviewFromBook(review._id);

    console.log("REmoved ")
    obj = { "reviewId":review._id, "deleted":true }
    return obj;
  },
};

module.exports = exportedMethods;