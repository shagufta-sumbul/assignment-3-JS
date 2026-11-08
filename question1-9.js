// Assignment 3: Callback-Based Utility System

// 1. Function to process array elements using callback
function processArray(arr, callback, mode = "map") {
    let result = [];

    for (let element of arr) {
        let value = callback(element);

        if (mode === "filter") {
            if (value) {
                result.push(element);
            }
        } else {
            result.push(value);
        }
    }

    return result;
}

// 2. Square every number in an array
let numbers = [1, 2, 3, 4];

let squaredNumbers = processArray(numbers, function(n) {
    return n * n;
});

console.log("Squared Numbers:", squaredNumbers);


// 3. Return only even numbers
let evenNumbers = processArray(numbers, function(n) {
    return n % 2 === 0;
}, "filter");

console.log("Even Numbers:", evenNumbers);


// 4. Function to process a string using callback
function processString(str, callback) {
    return callback(str);
}


// 5. Convert string into uppercase
let upperCaseString = processString("hello world", function(str) {
    return str.toUpperCase();
});

console.log("Uppercase String:", upperCaseString);


// 6. Count the number of words in a sentence
let sentence = "JavaScript is an interesting language";

let wordCount = processString(sentence, function(str) {
    if (str.trim() === "") {
        return 0;
    }
    return str.trim().split(/\s+/).length;
});

console.log("Word Count:", wordCount);


// 7. Function to perform calculations using callback
function calculate(a, b, callback) {
    return callback(a, b);
}


// 8. Arithmetic operations using callbacks

let addition = calculate(10, 5, function(a, b) {
    return a + b;
});

let subtraction = calculate(10, 5, function(a, b) {
    return a - b;
});

let multiplication = calculate(10, 5, function(a, b) {
    return a * b;
});

let division = calculate(10, 5, function(a, b) {
    if (b === 0) {
        return "Cannot divide by zero";
    }
    return a / b;
});

console.log("Addition:", addition);
console.log("Subtraction:", subtraction);
console.log("Multiplication:", multiplication);
console.log("Division:", division);


// 9. Find the first element satisfying a condition
function findElement(arr, callback) {
    for (let element of arr) {
        if (callback(element)) {
            return element;
        }
    }

    return undefined;
}

let firstEven = findElement(numbers, function(n) {
    return n % 2 === 0;
});

console.log("First Even Element:", firstEven);

let firstGreater = findElement(numbers, function(n) {
    return n > 10;
});

console.log("Element Greater Than 10:", firstGreater);
