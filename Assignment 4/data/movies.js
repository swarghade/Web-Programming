const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
var mongodb = require('mongodb');
const mongoConnection = require('../config/mongoConnection');
// const dogs = require('./movies.js');


function checkString(str){
  if(typeof str !== 'string' || ( typeof str === 'string' && str.replace(/\s/g,"").length == 0 ) )
    return false

  return true

}

function checkId(id){
  try {
    mongodb.ObjectId(id)
    return true
  }
  catch(e){
    return false
  }
}

function checkCast(arr)
{
  if(arr.length == 0)
    throw 'Invalid Cast'
  else
    for ( i of arr ){
      if(!checkString(i))
        return false
    }
  
  return true
}

function checkYear(year){
  if(typeof year !== 'number' || ( typeof year == 'number' && ( 1000 >  year || year > 9999 ) ) )
    return false
  
  return true
}

function checkInfo(info){


  if(!checkString(info.director) || !checkYear(info.yearReleased))
    return false

  return true
}



/* 
  TESTS

  const dirtyStr = [ '', '$', '11', 99999999, 11, null,  , '123847ur8912iuwfrijsxnc;-0p=42' ]
  const dirtyYear = ['', -1254, 0, 1221, 84128348124, true, false, 123]
  const dirtyCast = [ ['124asd','asdf'], ['asdas',''], ['  '], [5,5] ]
  const dirtyInfo = [ { director: 'tyest', yearReleased: 2010 }, { director: 'asda', yearReleased: 20101 }, { director: true, yearReleased: 2010 } ]

 
  for( i of dirtyStr )
  {
    console.log(` Testing ${i} : ${typeof i}  ---- ${checkString(i)} `)

  }

  for( i of dirtyYear )
  {
    console.log(` Testing Year ${i} : ${typeof i}  ---- ${checkYear(i)} `)

  }

  for( i of dirtyCast )
  {
    console.log(` Testing Cast ${i} : ${typeof i}  ---- ${checkCast(i)} `)

  }

  for( i of dirtyInfo ){
    console.log(` Testing Info ${JSON.stringify(i)} : ${typeof i}  ---- ${checkInfo(i)} `)

  }
*/
  

module.exports = {

    async get(id) {

        if(!checkId(id))
          throw 'Invalid id'

        const movieCollection = await movies();
        // console.log(movieCollection)
        const movieById = await movieCollection.findOne({ _id:mongodb.ObjectId(id)});
        // console.log(movieById)
        if (movieById === null) throw 'No movies with that id';
    
        return movieById;
      },

    async create(title, plot, rating, runtime, genre, cast, info) {
        if (!checkString(title)) throw 'You must provide a title';
        if (!checkString(plot)) throw 'You must provide a plot';
        if (!checkString(rating)) throw 'You must specify a rating';
        if (!checkString(runtime)) throw 'You must provide a runtime';
        if (!checkString(genre)) throw 'You must provide a genre';
        if (!checkCast(cast)) throw 'You must specify a cast';
        if (!checkInfo(info)) throw 'You must specify a info';

        const movieCollection = await movies();
        // console.log((Object.values(info))[0])
        let newMovie = {
            title: title,
            plot: plot,
            rating: rating,
            runtime: runtime,
            genre: genre,
            cast: [cast],
            info: {director: (Object.values(info))[0], yearReleased: (Object.values(info))[1]}
        }
    
        const insertInfo = await movieCollection.insertOne(newMovie);
        if (insertInfo.insertedCount === 0) throw 'Could not add Movie';

        const newId = insertInfo.insertedId;
        // console.log(newId)
        const movie = await this.get(newId.toString());
        return movie;
    },
    async remove(id) {
        if (!checkId(id)) throw 'Invalid id';
    
        const movieCollection = await movies();
        const data = await movieCollection.findOne({ _id: mongodb.ObjectId(id)});
        const deletionInfo = await movieCollection.deleteOne({ _id: mongodb.ObjectId(id) });
    
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete movie with id of ${id}`;
        }
        return data;
      },

    async getAll() {
        const movieCollection = await movies();
    
        const movieList = await movieCollection.find({}).toArray();
    
        return movieList;
      },

      async rename(id, newTitle) {
        if (!checkId(id)) throw 'Invalid id';
    
        if (!checkString(newTitle)) throw 'You must pass proper rename value';
    
    
    
        const movieCollection = await movies();
        const updatedMovie = {
            title: newTitle
        };
        const updatedInfo = await movieCollection.updateOne(
            { _id: mongodb.ObjectId(id) },
            { $set: updatedMovie }
          );
          if (updatedInfo.modifiedCount === 0) {
            throw 'could not update movie successfully';
          }
      
          return await this.get(id);
        }

}