const axios = require('axios')

async function getShows(){
  const { data } = await axios.get('http://api.tvmaze.com/shows')
  return data // this will be the array of people objects
}

let exportedMethods = { 
  
  async getAllShows() {
    const showData = await getShows();
    return showData
  },
  async getShowById(id) {
    str = 'http://api.tvmaze.com/shows/' + id 
    const { data } = await axios.get(str)
    show = data
    if (!show) throw 'Show not found for the given id:',id;
    return show;
  },
};

module.exports = exportedMethods;