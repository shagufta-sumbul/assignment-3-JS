
// Assignment 3: Callback-Based Utility System
// Tasks 1 to 9

// ---------- Task 1: Array Processor ----------

function processArray(arr, action) {
    let output = [];

    for (let item of arr) {
        let result = action(item);

        if (result !== undefined) {
            output.push(result);
        }
    }

    return output;
}

let result1 = processArray([5, 10, 15], function(num) {
    return num + 2;
});

console.log("Task 1 - Added 2:", result1);


// ---------- Task 2: Square Numbers ----------

let values = [2, 3, 4, 5];

let squareResult = processArray(values, function(num) {
    return num ** 2;
});

console.log("Task 2 - Squared values:", squareResult);


// ---------- Task 3: Filter Even Numbers ----------

let data = [11, 12, 13, 14, 15, 16, 17, 18];

let evenResult = processArray(data, function(num) {
    if (num % 2 === 0) {
        return num;
    }
});

console.log("Task 3 - Even values:", evenResult);


// ---------- Task 4: String Processor ----------

function processString(text, action) {
    return action(text);
}

let lengthResult = processString("JavaScript callbacks", function(str) {
    return str.length + " characters";
});

console.log("Task 4 - String length:", lengthResult);


// ---------- Task 5: Convert to Uppercase ----------

let capitalText = processString("learning javascript", function(str) {
    return str.toUpperCase();
});

console.log("Task 5 - Uppercase text:", capitalText);


// ---------- Task 6: Word Counter ----------

let sentence = "I enjoy learning programming concepts";

let totalWords = processString(sentence, function(str) {
    let cleanedText = str.trim();

    if (cleanedText.length === 0) {
        return 0;
    }

    return cleanedText.split(/\s+/).length;
});

console.log("Task 6 - Total words:", totalWords);


// ---------- Task 7: Custom Calculator ----------

function calculate(x, y, operation) {
    return operation(x, y);
}

let powerResult = calculate(3, 4, function(a, b) {
    return a ** b;
});

console.log("Task 7 - Power result:", powerResult);


// ---------- Task 8: Arithmetic Operations ----------

let addition = calculate(20, 4, function(a, b) {
    return a + b;
});

let subtraction = calculate(20, 4, function(a, b) {
    return a - b;
});

let multiplication = calculate(20, 4, function(a, b) {
    return a * b;
});

let division = calculate(20, 4, function(a, b) {
    if (b === 0) {
        return "Division by zero is not possible";
    }

    return a / b;
});

console.log("Task 8 - Addition:", addition);
console.log("Task 8 - Subtraction:", subtraction);
console.log("Task 8 - Multiplication:", multiplication);
console.log("Task 8 - Division:", division);


// ---------- Task 9: Find Matching Element ----------

function findElement(arr, condition) {
    for (let element of arr) {
        if (condition(element)) {
            return element;
        }
    }

    return undefined;
}

let numbersList = [4, 7, 15, 22, 9];

let foundNumber = findElement(numbersList, function(num) {
    return num > 10;
});

console.log("Task 9 - First number greater than 10:", foundNumber);

let missingNumber = findElement([2, 4, 6], function(num) {
    return num > 50;
});

console.log("Task 9 - No matching number:", missingNumber);


// ---------- Sample Outputs ----------

console.log("----- Sample Testing -----");

console.log(processArray([1, 2, 3, 4], function(num) {
    return num * num;
}));

console.log(calculate(10, 5, function(a, b) {
    return a + b;
}));

console.log(processString("hello world", function(str) {
    return str.toUpperCase();
}));
