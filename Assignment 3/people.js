const axios = require('axios')
//const peopleData = []

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
    // console.log(data)
    // console.log(typeof data)
    
    return data // this will be the array of people objects
  }

async function checkId(id) {
  if (!id){
    throw `ERROR:No Input`
  }
 
  if (typeof id != "number") {
    throw `ERROR:Input type is not a number`
  }

  if (id < 0) {
    throw `ERROR: Negative Input`
  }

  let peopleData = await getPeople()
  let x = peopleData.map(v => (v.id))
  let arr = Object.keys(x)
  let max = Math.max(...arr)
  let min = Math.min(...arr)
  if (id < min || id > max){
    throw `ERROR: ID Out of Bounds`
  }
}

async function checkIndex(index) {
  if (!index){
    throw `ERROR:No Input`
  }
 
  if (typeof index != "number") {
    throw `ERROR:Input type is not a number`
  }

  if (index < 0) {
    throw `ERROR: Negative Input`
  }

  let peopleData = await getPeople()

  let x = peopleData.map(v => (v.id))
  let arr = Object.keys(x)
  let max = Math.max(...arr)
  let min = Math.min(...arr)
  if (index < min || index > max){
    throw `ERROR: Index Out of Bounds`
  }

}

function checkState(state){
  if (!state){
    throw `ERROR:No Input`
  }
 
  if (typeof state != "string") {
    throw `ERROR:Input type is not a string`
  }
}

async function getPersonById(id){
  await checkId(id)
  let peopleData = await getPeople()
  let x = peopleData.filter( (k,i,a) => k.id === id  )
  return x[0]
}



async function howManyPerState(stateAbbrv) {
  checkState(stateAbbrv)
  let peopleData = await getPeople()
  let x = peopleData.filter ( (k,i,a) => k.address.state === stateAbbrv )
  if (x.length === 0) {
    throw `ERROR: 0 People live in the state`
  }
  return x.length
}
function calculateAge(getAge) {
  let age = (new Date()).getFullYear() - (new Date(getAge)).getFullYear()
  if (((new Date()).getMonth() - (new Date(getAge)).getMonth()) < 0 || (((new Date()).getMonth() - (new Date(getAge)).getMonth()) === 0 && (new Date()).getDate() < (new Date(getAge)).getDate())) {
    age --;
  }
  return age
}
async function personByAge(index) {
  await checkIndex(index)
  let peopleData = await getPeople()
  let x = peopleData.sort((a,b) => { 
    return new Date(a.date_of_birth) - new Date(b.date_of_birth)
  }).map(v => ({first_name:v.first_name,last_name:v.last_name,date_of_birth: v.date_of_birth, age: calculateAge(v.date_of_birth)}))
  return x[index]
}

async function peopleMetrics() {
  let peopleData = await getPeople()
  let age = peopleData.sort((a,b) => { 
    return new Date(a.date_of_birth) - new Date(b.date_of_birth)
  }).map(v => ({ age: calculateAge(v.date_of_birth)}))
  let averageAge = age.reduce((q,w) => w.age + q,0)/age.length
  // console.log(averageAge)
  function countRepeating(array) {
    let obj = {}
    let tmp = {}
    for (let i = 0 ; i < array.length ; i ++) {
        if (tmp[array[i]]){
            tmp[array[i]]++
            obj[array[i]] = tmp[array[i]]
        }
        else {
            tmp[array[i]] = 1
        }
    }
    srt = Object.fromEntries(Object.entries(obj).sort(([,a],[,b]) => b-a))
    return(Object.entries(srt)[0])
  }
  x = peopleData.map(peopleData => `${peopleData.first_name} ${peopleData.last_name}`)
  cityList = peopleData.map(peopleData => `${peopleData.address.city}`)
  // console.log(countRepeating(cityList))
  // console.log(cityList)
  y = ''
  longestName = 0
  shortestName = 100
  sName = ''
  lName = ''
  let peopleMetrics = {}
  for (i = 0; i < x.length ; i++){
    y += x[i]
    if (longestName < x[i].length) {
      lName = x[i]
      longestName = x[i].length
    }
    if (shortestName > x[i].length) {
      sName = x[i]
      shortestName = x[i].length
    }
  }
  y = y.replaceAll(' ', '').replaceAll('-','').replaceAll("'",'')
  totalLetters = [...y].length
  numVowel = 0
  numConsonent = 0
  for ( let i = 0; i <= totalLetters - 1; i++) {
    if (y.charAt(i) == 'a' || y.charAt(i) == 'e' || y.charAt(i) == 'i' || y.charAt(i) == 'o' || y.charAt(i) == 'u' || y.charAt(i) == 'A' || y.charAt(i) == 'E' || y.charAt(i) == 'I' || y.charAt(i) == 'O' || y.charAt(i) == 'U'){
    numVowel += 1;
    }
    else {
        numConsonent +=1
    }
  }
  peopleMetrics["totalLetters"] = totalLetters
  peopleMetrics["totalVowels"] = numVowel
  peopleMetrics["totalConsonants"] = numConsonent
  peopleMetrics["longestName"] = lName
  peopleMetrics["shortestName"] = sName
  peopleMetrics["mostRepeatingCity"] = countRepeating(cityList)[0]
  peopleMetrics["averageAge"] = parseInt (averageAge)
  return(peopleMetrics)
}
module.exports = { getPeople,getPersonById,howManyPerState,personByAge,peopleMetrics };
