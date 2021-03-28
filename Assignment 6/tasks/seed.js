const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const { getAllbooks } = require('../data/books');
const books = data.books;
const reviews = data.reviews;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  try{
    const book = await books.addBook('SHubham', {authorFirstName: "first name", authorLastName: "last name"} , ["genre1", "genre2"],'05/07/97','lololololol',[]);
    const id = book._id;
    await reviews.addReview('This book scared me to death!!', "scaredycat", 5 ,"10/7/2020", "This book was creepy!!! It had me at the edge of my seat.  One of Stephan King's best works!", id)
    await reviews.addReview('This book scared me to death!!', "scaredycat", 5 ,"10/7/2020", "This book was creepy!!! It had me at the edge of my seat.  One of Stephan King's best works!", id)
    await reviews.addReview('This book scared me to death!!', "scaredycat", 5 ,"10/7/2020", "This book was creepy!!! It had me at the edge of my seat.  One of Stephan King's best works!", id)
    
    const booksById = await books.getBookById(id);
    // console.log(booksById);
  }catch(e){
    console.log (e);
  }

  try{
    const book = await books.addBook('TFIOS', {authorFirstName: "LOL", authorLastName: "hahaha"} , ["genre3", "genre2"],'05/07/97','lololololol',[]);
    const id = book._id;
    await reviews.addReview('FUn to read ', "scaredycat", 5 ,"10/7/2020", "This book was creepy!!! It had me at the edge of my seat.  One of Stephan King's best works!", id)
    await reviews.addReview('FUn to read !!', "lolzipu", 5 ,"10/7/2020", "This book was creepy!!! It had me at the edge of my seat.  One of Stephan King's best works!", id)
    await reviews.addReview('FUn to read !!', "scaredycat", 5 ,"10/7/2020", "This book was creepy!!! It had me at the edge of my seat.  One of Stephan King's best works!", id)
    
    const booksById = await books.getBookById(id);
    // console.log(booksById);
  }catch(e){
    console.log (e);
  }
  
  try{
    const allBooks = await books.getAllBooks();
    // console.log(allBooks);
  }catch(e){
    console.log (e);
  }






  // const id = patrick._id;
  // await posts.addPost('Hello, class!', 'Today we are creating a blog!', [], id);
  // await posts.addPost(
  //   'Using the seed',
  //   'We use the seed to have some initial data so we can just focus on servers this week',
  //   [],
  //   id
  // );

  // await posts.addPost(
  //   'Using routes',
  //   'The purpose of today is to simply look at some GET routes',
  //   [],
  //   id
  // );

  console.log('Done seeding database');

  await db.serverConfig.close();
}

main();