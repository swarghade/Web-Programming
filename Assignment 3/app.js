const people = require('./people');
const work = require('./work');

async function main() {
    try{
        const getPersonById = await people.getPersonById(43);
        console.log (getPersonById);
    }catch(e){
        console.log (e);
    }

    try{
        const getPersonById = await people.howManyPerState("NY");
        console.log (getPersonById);
    }catch(e){
        console.log (e);
    }
    try{
        const getPersonById = await people.personByAge(999);
        console.log (getPersonById);
    }catch(e){
        console.log (e);
    }
    try{
        const getPersonById = await people.peopleMetrics();
        console.log (getPersonById);
    }catch(e){
        console.log (e);
    }
    try{
        const getPersonById = await work.listEmployees();
        console.log (getPersonById);
    }catch(e){
        console.log (e);
    }
    try{
        const getPersonById = await work.fourOneOne('240-144-7553');
        console.log (getPersonById);
    }catch(e){
        console.log (e);
    }
    try{
        const getPersonById = await work.whereDoTheyWork('299-63-8866');
        console.log (getPersonById);
    }catch(e){
        console.log (e);
    }

}


main()