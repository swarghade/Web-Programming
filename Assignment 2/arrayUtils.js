function CheckIsProperArray (array){
    if (!array){
        throw 'ERROR:No Input'
    }
    if (array.length == 0){
        throw `ERROR:No Values present in array`
    }
    if (!Array.isArray(array)){
        throw 'ERROR:Input Type is not an array'
    }
    for (let i = 0 ; i < array.length ; i++){
        if (typeof array[i] != "number") {
            throw `ERROR:One of the input type is not a number`
        }
    }
}
function CheckIsArray (array){
    if (!array){
        throw 'ERROR:No Input'
    }
    if (array.length == 0){
        throw `ERROR:No Values present in array`
    }
    if (!Array.isArray(array)){
        throw 'ERROR:Input Type is not an array'
    }
}
function CheckIsNumberStringArray (array) {
    if (!array){
        throw 'ERROR:No Input'
    }
    // if (array.length == 0){
    //     throw `ERROR:No Values present in array`
    // }
    if (!Array.isArray(array)){
        throw 'ERROR:Input Type is not an array'
    }
    for (let i = 0 ; i < array.length ; i++){
        if (typeof array[i] != "number" && typeof array[i] != "string" ) {
            throw `ERROR:One of the input type is not a number or string`
        }
    }
}

function fillInput (end, value) {
    if (!end){
        throw `ERROR:No Input`
    }

    if (typeof end != "number") {
        throw `ERROR:Input type is not a number`
    }

    if (end < 0) {
        throw `ERROR: Negative Input`
    }
}

module.exports = {
    description: "This is my second assignment.",
    
    mean: (array) => {
        let sum = 0
        CheckIsProperArray(array)
        array.sort()
        for (let  i = 0; i < array.length; i++){
            sum += array[i]
        }
        return sum / array.length
    },
    medianSquared: (array) => {
        CheckIsProperArray(array)
        array.sort()
        // IF ARRAY IS EVEN
        if (array.length % 2 === 0){
            median = (array[array.length/2] + array[(array.length/2) - 1])/2
        }
        // IF ARRAY IS ODD
        else{
            median = array[(array.length - 1)/2]
        }

        return median * median
    },
    maxElement: (array) => {
        CheckIsProperArray(array)
        let max = Math.max(...array)
        let maxIndex = array.indexOf(max)
        let output = {}
        // console.log(max)
        // console.log(maxIndex)
        output[max]=maxIndex
        return output
    },
    fill: (end, value = 'noVal') => {
        fillInput(end,value)
        arr = []
        if (value == 'noVal') {
            for (i = 0; i < end ; i++){
                arr.push(i)

            } 
        }
        if (end && value != 'noVal') {
            for (i = 0; i < end ; i++){
                arr.push(value)
            }
        }

        return arr
    },

    countRepeating: (array) => {
        let obj = {}
        let tmp = {}
        CheckIsNumberStringArray(array)
        for (let i = 0 ; i < array.length ; i ++) {

            if (tmp[array[i]]){
                tmp[array[i]]++
                obj[array[i]] = tmp[array[i]]
            }
            else {
                tmp[array[i]] = 1
            }
        }
        // console.log(`tmp ${JSON.stringify(tmp)}`)
        return(obj)
    },

    isEqual: (arrayOne, arrayTwo) => {
        CheckIsArray(arrayOne)
        CheckIsArray(arrayTwo)
        arrayOne.sort()
        arrayTwo.sort()
        // let x = []
        // let y = []
        if (arrayOne.length !== arrayTwo.length) {
            return false
        }
         
                for(let i = 0 ; i < arrayOne.length ; i++){
                    if (Array.isArray(arrayOne[i]) && Array.isArray(arrayTwo[i])) {
                        arrayOne[i] = arrayOne[i].sort()
                        // x[i] = arrayOne[i].sort()
                        // console.log(`x ${x[i]} - ${arrayOne[i]}`)
                        arrayTwo[i] = arrayTwo[i].sort()
                        // y[i] = arrayTwo[i].sort()
                        // console.log(`y ${y[i]} - ${arrayTwo[i]}`)
                    }
                    
                    
                }
        return JSON.stringify(arrayOne) == JSON.stringify(arrayTwo)
        
    }
}