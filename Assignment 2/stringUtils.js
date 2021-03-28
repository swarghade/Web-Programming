
function CheckIsProperString (string){
    if (!string){
        throw 'ERROR:No Input'
    }
    if (string.length == 0){
        throw `ERROR:No Values present in string`
    }
    if (typeof string != "string") {
        throw `ERROR: Not a string`
    }
    if (string.length < 2) {
        throw `ERROR: Length is not sufficient`
    }
}

module.exports = {
    camelCase: (string) => {
        CheckIsProperString(string)
        string = string.toLowerCase()
        let x = string.split(" ")
        // console.log(x)
        let y = []
        
        for (let i = 0 ; i < x.length ; i++) {
            y[i] = x[i].charAt(0).toUpperCase() + x[i].slice(1)
        }
        let z = y.join("")
        z = z.charAt(0).toLowerCase() + z.slice(1)
        return z
    },
    replaceChar: (string) => {
        CheckIsProperString(string)
        x = string.charAt(0)
        let a = 0
        let b = 0
        let replaceChar = ''
        for (let i = 0 ; i < string.length ; i++) {
            temp = string[i]
            if(temp.toLowerCase() == x.toLowerCase() && b > 0){
                a++
                if (a%2 == 0){
                    replaceChar += '$'
                }
                else
                {
                    replaceChar += '*'
                }
            }
            else {replaceChar += string[i]}
            b++
        }
        return replaceChar
    },
    mashUp: (string1, string2) => {
        CheckIsProperString(string1)
        CheckIsProperString(string2)
        mashUp = string2.charAt(0) + string2.charAt(1) + string1.slice(2) + ' ' + string1.charAt(0) + string1.charAt(1) + string2.slice(2)
        return mashUp
    }

    
}