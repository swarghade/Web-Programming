const express = require('express');
const app = express();
const configRoutes = require('./routes');
const data = require('./data/index');
const showData = data.shows;
// const { shows } = require('../data/shows');

async function main(){
    const x = await showData.getAllShows()
    console.log("x")

}

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
//   main()
});