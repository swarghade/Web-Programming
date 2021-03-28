

function CheckIsObject (array){
    if (!array){
        throw 'ERROR:No Input'
    }
    if (array.length == 0){
        throw `ERROR:No Values present in array`
    }
    if (!Array.isArray(array)){
        throw 'ERROR:Input Type is not an array'
    }
    for (i = 0 ; i < array.length ; i++) {
        if (typeof array[i] != "object"){
            throw 'ERROR:No Object'
        }
        if (Object.keys(array[i]).length === 0){
            throw `ERROR: Object is Empty`
        }
    }
}
function CheckIsIsObject(object) {
    if (typeof object != "object"){
        throw 'ERROR:No Object'
    }
    if (Object.keys(object).length === 0){
        throw `ERROR: Object is Empty`
    }
}

module.exports = {
    makeArrays: (objects) => {
        CheckIsObject(objects)
        x = []
        for (i = 0 ; i < objects.length ; i++) {
            x.push(...Object.entries(objects[i]))
        }
        return x
    },
    isDeepEqual: (obj1,obj2) => {        
        CheckIsIsObject(obj1)
        CheckIsIsObject(obj2)
        for (const temp in obj2) {
           
            if (typeof obj2[temp] == "object"){
                obj2[temp] = Object.entries(obj2[temp]).sort()
            }
        }
        for (const temp in obj1) {           
            if (typeof obj1[temp] == "object"){
                obj1[temp] = Object.entries(obj1[temp]).sort()
            }
        }  
        x = Object.entries(obj1).sort()
        y = Object.entries(obj2).sort()
        isDeepEqual = JSON.stringify(x) === JSON.stringify(y)
        return isDeepEqual
    },
    computeObject: (object,func) => {
        CheckIsIsObject(object)

        let a = Object.keys(object)
        let tmp = {}

        a.forEach( (k) => {
            tmp[k] = func(object[k])
        } )

        return tmp
    }
}