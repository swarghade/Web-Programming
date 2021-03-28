const movies = require('./data/movies')
const connection = require('./config/mongoConnection');
// const mongodb = require('mongodb')

const main = async () => {
  let shutterIsland
  let interstellar
  try{
     shutterIsland = await movies.create("Shutter Island","In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.","R", "2h 18min"," Mystery, Thriller ",["Leonardo DiCaprio","Emily Mortimer"],{director: "Martin Scorsese", yearReleased: 2010});
    console.log(shutterIsland);
  }catch(e){
      console.log (e);
  }

  try{
    interstellar  = await movies.create("Interstellar","A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.","PG-13", "2h 49min"," Adventure, Drama, Sci-Fi",[" Matthew McConaughey","Anne Hathaway"],{director: "Christopher Nolan", yearReleased: 2014});
    console.log(interstellar);
  }catch(e){
      console.log (e);
  }

  try{
    const allMovies = await movies.getAll();
    console.log(allMovies);
  }catch(e){
      console.log (e);
  }

  try{
    const endgame = await movies.create("Avengers: Endgame","After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.","PG-13", "3h 1min","Action, Adventure, Drama",["Robert Downey Jr.","Chris Evans"],{director: "Anthony Russo", yearReleased: 2019});
    console.log(endgame);
  }catch(e){
      console.log (e);
  }

  try{
    const renamedMovie = await movies.rename(shutterIsland._id, "Shubham");
    console.log(renamedMovie);
  }catch(e){
      console.log (e);
  }

  try{
    const removeInterstellar = await movies.remove(interstellar._id);
    // console.log(removeInterstellar);
  }catch(e){
      console.log (e);
  }

  try{
    const allMovies = await movies.getAll();
    console.log(allMovies);
  }catch(e){
      console.log (e);
  }

  try{
    const endgame = await movies.create(123,"After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.","PG-13", "3h 1min","Action, Adventure, Drama",["Robert Downey Jr.","Chris Evans"],{director: "Anthony Russo", yearReleased: 2019});
    console.log(endgame);
  }catch(e){
      console.log (e);
  }

  try{
    const removeUndefined = await movies.remove("604062458ca630a4557877");
    // console.log(removeUndefined);
  }catch(e){
      console.log (e);
  }

  try{
    const renamedMovie = await movies.rename("604062458ca630a4557877", "Shubham");
    console.log(renamedMovie);
  }catch(e){
      console.log (e);
  }

  try{
    const renamedMovie = await movies.rename(shutterIsland._id, true);
    console.log(renamedMovie);
  }catch(e){
      console.log (e);
  }

  try{
    const wrongId = await movies.get("603dae965d19424140ea7469");
    console.log(wrongId);
  }catch(e){
      console.log (e);
  }

  




    // const billAndTed = await movies.create("Bill and Ted Face the Music","Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.","PG-13", "1hr 31min","Comedy",["Keanu Reeves","Alex Winter"],{director: "Dean Parisot", yearReleased: 2020});
    // console.log(billAndTed);

    // const allMovies = await movies.getAll();
    // console.log(allMovies);

    // const renamedBillAndTed = await movies.rename("6040196d387dd66bc022847c", "Patrick and Ted Face the Music");
    // console.log(renamedBillAndTed);

    // const billAndTed = await movies.get("603dae965d19424140ea7469");
    // console.log(billAndTed); 

    // const removeBillAndTed = await movies.remove("6040199ed0728f0b6423597c");
    // console.log(removeBillAndTed);
//   const sasha = await dogs.addDog('Sasha', ['Cheagle', 'Chihuaha', 'Beagle']);
//   console.log('Sasha the dog has been added, now she will blog!');
//   console.log(sasha);

//   const max = await dogs.addDog('Max', ['Mastiff']);
//   console.log(max);
//   console.log(
//     'Max enters the playing field; he is a grizzled ex-cop with a heart of gold.'
//   );
//   const maxPost = await posts.addPost(
//     'The Case of the Stolen Bone',
//     "It was 2015 when it happened. Someone stole the bone, and hid it in a hole outside. It's a good thing that I hide all my bones in holes outside, or I would have never found. I then realized that, all along, it was me who hid the bone.",
//     max._id
//   );

//   const porkChop = await dogs.addDog('Pork Chop', [
//     'Golden Retriever',
//     'Labrador'
//   ]);
//   const porkChopPost = await posts.addPost(
//     'Who Am I?',
//     "They call me Pork Chop. I don't like Pork! I only eat Turkey! I DON'T KNOW WHO I AM!",
//     porkChop._id
//   );
//   const post = await posts.addPost(
//     "A Review of Bleu d'Auvergne",
//     "It was 2014 when I was born, and it was 2014 when I received my first taste of Bleu d'Auvergne. I dined upon the delicacy at the home of my grand-papa, known as The Cheese Man for the great varieties of cheese he kept in his abode. I still do not know if the Bleu d'Auvergne was what ignited my love of cheese, or if it was the strange diet of my papa whom kept away from the starches and sugars and replaced them with cheeses and legumes. But truly, I will never forget the strange world of the first taste of Bleu d'Auvergne, to this day the greatest cheese I have ever tasted. It paired very nicely with the cheeseburger I stole from my papa's four year old cousin. No one believed him. It was the perfect crime.",
//     sasha._id
//   );

//   console.log(post);
//   console.log("Let's change the title...");

//   const updatedPost = await posts.updatePost(
//     post._id,
//     "For Love of Bleu d'Auvergne",
//     post.body,
//     post.poster.id
//   );

//   console.log('Now, the post is:');
//   console.log(updatedPost);

//   await posts.removePost(updatedPost._id);

//   console.log("Let's update a dog");

//   const updatedSashasName = await dogs.updateDog(sasha._id, 'Dharma', [
//     'Husky',
//     'American Eskimo'
//   ]);
//   console.log("Now Sasha's name is:");
//   console.log(updatedSashasName);
//   const removeSasha = await dogs.removeDog(updatedSashasName._id);

  const db = await connection();
  await db.serverConfig.close();

  // console.log('Done!');
};

main().catch((error) => {
  console.log(error);
});