const arrayUtils = require('./arrayUtils')
const stringUtils = require('./stringUtils')
const objUtils = require('./objUtils')

try {
    // Should Pass
    const result = arrayUtils.mean([2, 3, 4]);
    console.log('mean passed successfully ' + ' Result:' + result);
} catch (e) {
    console.error('mean failed test case');
}

try {
    // Should Fail
    const result = arrayUtils.mean(1234);
    console.error('mean did not error');
}  catch (e) {
    console.log('mean failed successfully');
}

try {
    // Should Pass
    const result = arrayUtils.medianSquared([1, 2, 4]);
    console.log('medianSquared passed successfully' + ' Result:' + result);
} catch (e) {
    console.error('medianSquared failed test case');
}

try {
    // Should Fail
    const result = arrayUtils.medianSquared(["guitar", 1, 3, "apple"]); // throws an error
    console.error('medianSquared did not error');
}  catch (e) {
    console.log('medianSquared failed successfully');
}

try {
    // Should Pass
    const result = arrayUtils.maxElement([5, 6, 7]); // Returns: {'7': 2}
    console.log('maxElement passed successfully' + ' Result:' +  JSON.stringify(result));
    console.log(result)
} catch (e) {
    console.error('maxElement failed test case');
}

try {
    // Should Fail
    const result = arrayUtils.maxElement([1,2,"nope"]); // throws error
    console.error('maxElement did not error');
}  catch (e) {
    console.log('maxElement failed successfully');
}

try {
    // Should Pass
    const result = arrayUtils.fill(6); // Returns: [0, 1, 2, 3, 4, 5]
    console.log('fill passed successfully' + ' Result:' + result);
} catch (e) {
    console.error('fill failed test case');
}

try {
    // Should Fail
    const result = arrayUtils.fill(-4); // Throws Error
    console.error('fill did not error');
}  catch (e) {
    console.log('fill failed successfully');
}

try {
    // Should Pass
    const result = arrayUtils.countRepeating([7, '7', 13, "Hello","Hello", "hello"]); //Returns {'7': 2, Hello: 2}
    console.log('countRepeating passed successfully' + ' Result:' +  JSON.stringify(result));
    console.log(result)
} catch (e) {
    console.error('countRepeating failed test case');
}

try {
    // Should Fail
    const result = arrayUtils.countRepeating([(message)=>message, true, undefined, null]); //Throws error
    console.error('countRepeating did not error');
}  catch (e) {
    console.log('countRepeating failed successfully');
}

try {
    // Should Pass
    const result = arrayUtils.isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]]); // Returns: true
    console.log('isEqual passed successfully' + ' Result:' + result);
} catch (e) {
    console.error('isEqual failed test case');
}

try {
    // Should Fail
    const result = arrayUtils.isEqual(); 
    console.error('isEqual did not error');
}  catch (e) {
    console.log('isEqual failed successfully');
}

try {
    // Should Pass
    const result = stringUtils.camelCase('my function rocks'); // Returns: "myFunctionRocks"
    console.log('camelCase passed successfully' + ' Result:' + result);
} catch (e) {
    console.error('camelCase failed test case',e);
}

try {
    // Should Fail
    const result = stringUtils.camelCase(["Hello", "World"]); // Throws Error 
    console.error('camelCase did not error');
}  catch (e) {
    console.log('camelCase failed successfully');
}

try {
    // Should Pass
    const result = stringUtils.replaceChar("Hello, How are you? I hope you are well"); // Returns: "Hello, *ow are you? I $ope you are well"
    console.log('replaceChar passed successfully' + ' Result:' + result);
} catch (e) {
    console.error('replaceChar failed test case');
}

try {
    // Should Fail
    const result = stringUtils.replaceChar(123); // Throws Error 
    console.error('replaceChar did not error');
}  catch (e) {
    console.log('replaceChar failed successfully');
}

try {
    // Should Pass
    const result = stringUtils.mashUp("Patrick", "Hill"); //Returns "Hitrick Pall"
    console.log('mashUp passed successfully' + ' Result:' + result);
} catch (e) {
    console.error('mashUp failed test case');
}

try {
    // Should Fail
    const result = stringUtils.mashUp ("h","e"); // Throws Error 
    console.error('mashUp did not error');
}  catch (e) {
    console.log('mashUp failed successfully');
}

try {
    // Should Pass
    const first = { x: 2, y: 3};
    const second = { a: 70, x: 4, z: 5 };
    const third = { x: 0, y: 9, q: 10 };
    const result = objUtils.makeArrays([first, second, third]);
    console.log('makeArrays passed successfully');
    console.log(result)
} catch (e) {
    console.error('makeArrays failed test case');
}

try {
    // Should Fail
    const first = { x: 2, y: 3};
    const second = { a: 70, x: 4, z: 5 };
    const third = {};
    const result = objUtils.makeArrays([first, second, third]); 
    console.error('makeArrays did not error');
}  catch (e) {
    console.log('makeArrays failed successfully');
}

try {
    // Should Pass
    const first = {a: 2, b: 3};
    const second = {a: 2, b: 4};
    const third = {a: 2, b: 3};
    const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
    const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
    const result = objUtils.isDeepEqual(first, second);
    console.log('isDeepEqual passed successfully ' + ' Result:' + result);
} catch (e) {
    console.error('isDeepEqual failed test case');
}

try {
    // Should Fail
    const first = {a: 2, b: 3};
    const second = [];
    const third = {a: 2, b: 3};
    const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
    const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
    const result = objUtils.isDeepEqual(first, second); // false
    console.error('isDeepEqual did not error ');
}  catch (e) {
    console.log('isDeepEqual failed successfully');
}

try {
    // Should Pass
    const result = objUtils.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2);
    console.log('computeObject passed successfully ' + ' Result:' + JSON.stringify(result));
    console.log(result)
} catch (e) {
    console.error('computeObject failed test case');
}

try {
    // Should Fail
    const result = objUtils.computeObject([], n => n * 2);
    console.error('computeObject did not error ');
}  catch (e) {
    console.log('computeObject failed successfully');
}



