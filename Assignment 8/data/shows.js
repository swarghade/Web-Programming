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
  async getShowBySearch(searchTerm) {
    str = 'http://api.tvmaze.com/search/shows?q=' + searchTerm
    const { data } = await axios.get(str)
    // console.log(data.length + "reached")
    searchData = data.map(v => ({ name: v.show.name, id: v.show.id}))

    if (searchData.length > 20) {
      searchData = searchData.slice(0,20)
    }
    if (!searchData) throw 'Show not found for the search data:',searchTerm;
    return searchData;
  }
};

module.exports = exportedMethods;