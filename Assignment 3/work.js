const axios = require('axios');
// const people = require('./people');

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
    
    return data // this will be the array of people objects
  }


async function getWorkData() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json')
  
    return data
}

function checkFourOneOne(phoneNumber){
    if (!phoneNumber){
        throw `ERROR:No Input`
    }
     
    if (typeof phoneNumber != "string") {
        throw `ERROR:Input type is not a string`
    }
    x = phoneNumber.split("-")
    if (!(x[0]) || !(x[1]) || !(x[2])){
        throw  `ERROR: Incorrect format`
    }
    if (x[0].length != 3 && x[1].length != 3 && x[2].length != 4){
        throw `ERROR:Incorrect Phone Number `
    }
    let pattern = /\d{3}-\d{3}-\d{4}/g
    if (!(phoneNumber.match(pattern))){
        throw `ERROR: Input has a string value inside`
    }
    
    
}
function checkSsn(ssn){
    if (!ssn){
      throw `ERROR:No Input`
    }
   
    if (typeof ssn != "string") {
      throw `ERROR:Input type is not a string`
    }

    x = ssn.split("-")
    if (!(x[0]) || !(x[1]) || !(x[2])){
        throw  `ERROR: Incorrect format`
    }
    if (x[0].length != 3 && x[1].length != 2 && x[2].length != 4){
        throw `ERROR:Incorrect SSN Format `
    }
    let pattern = /\d{3}-\d{2}-\d{3}/g
    if (!(ssn.match(pattern))){
        throw `ERROR: Input has a string value inside`
    }
  }
function getPersonById(id, arr){
    
    
    let x = arr.filter( (k,i,a) => k.id === id  ).map(v=> ({first_name:v.first_name,last_name:v.last_name}))
    
    if(x.length == 0)
      return false
    else
      return x[0]
}

function cloneArr(arr){
    return JSON.parse(JSON.stringify(arr))
}

async function listEmployees() {
    let workData = await getWorkData()
    let peopleData = await getPeople()
    let x = workData.map(v => ({company_name:v.company_name,employees:v.employees}))
    let cloneX = cloneArr(x)


    for (i = 0; i < cloneX.length ; i++) {

        let tmp = cloneX[i].employees

        for (j=0;j < tmp.length ; j++){
            temp = await getPersonById(tmp[j], peopleData)
            tmp[j] = JSON.stringify(temp)
        }
    }
    return cloneX
}
async function fourOneOne(phoneNumber) {
    checkFourOneOne(phoneNumber)
    let workData =  await getWorkData()
    let x = workData.filter( (k,i,a) => k.company_phone == phoneNumber).map(v => ({company_name:v.company_name,company_address:v.company_address}))
    if (x[0] == undefined){
        throw `ERROR: No Data Found`
    }
    return(x[0])
}

async function whereDoTheyWork(ssn) {
    let peopleData = await getPeople()
    let workData = await getWorkData()
    checkSsn(ssn)
    let x = peopleData.filter(  (k,i,a) => k.ssn === ssn ).map(v=> ({id:v.id,full_name: v.first_name + ' ' +v.last_name }))
    if (x.length == 0){
        throw `ERROR: No Data Found`
    }
    
    idVal = x[0].id
    

    //console.log(` employees ${JSON.stringify(workData[0])} ` )
    
    //console.log(idVal)
    let y = workData.filter( k => k.employees.includes(idVal) ).map(v => (v.company_name))
    //console.log(y)
    let whereDoTheyWork = x[0].full_name + " works at " + y[0]
    // console.log(typeof whereDoTheyWork)
    
    return whereDoTheyWork
}
module.exports = { getWorkData,getPeople,listEmployees,fourOneOne,whereDoTheyWork };
