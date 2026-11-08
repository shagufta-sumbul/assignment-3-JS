
// Bonus Challenge: Callback-Based Menu Calculator
// Run using: node bonus.js

// ---------- Helper Functions ----------

function processArray(numbers, operation) {
    let output = [];

    for (let num of numbers) {
        let value = operation(num);

        if (value !== undefined) {
            output.push(value);
        }
    }

    return output;
}

function calculate(num1, num2, operation) {
    return operation(num1, num2);
}


// ---------- Input Setup ----------

const readline = require("readline");

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getInput(message, callback) {
    input.question(message, callback);
}


// ---------- Arithmetic Calculator ----------

function arithmeticMenu(goBack) {
    console.log("\n===== Arithmetic Calculator =====");
    console.log("1. Addition");
    console.log("2. Subtraction");
    console.log("3. Multiplication");
    console.log("4. Division");
    console.log("5. Return to Main Menu");

    getInput("Select an operation: ", function(option) {

        if (option === "5") {
            goBack();
            return;
        }

        if (!["1", "2", "3", "4"].includes(option)) {
            console.log("Invalid option. Please select again.");
            arithmeticMenu(goBack);
            return;
        }

        getInput("Enter first value: ", function(first) {
            getInput("Enter second value: ", function(second) {

                let x = Number(first);
                let y = Number(second);

                if (
                    first.trim() === "" ||
                    second.trim() === "" ||
                    !Number.isFinite(x) ||
                    !Number.isFinite(y)
                ) {
                    console.log("Invalid input! Enter numeric values.");
                    arithmeticMenu(goBack);
                    return;
                }

                let result;

                switch (option) {
                    case "1":
                        result = calculate(x, y, (a, b) => a + b);
                        break;

                    case "2":
                        result = calculate(x, y, (a, b) => a - b);
                        break;

                    case "3":
                        result = calculate(x, y, (a, b) => a * b);
                        break;

                    case "4":
                        result = calculate(x, y, function(a, b) {
                            return b === 0
                                ? "Division by zero is not allowed"
                                : a / b;
                        });
                        break;
                }

                console.log("Calculated Answer:", result);

                arithmeticMenu(goBack);
            });
        });
    });
}


// ---------- Array Analysis ----------

function arrayMenu(goBack) {

    console.log("\n===== Array Analysis =====");

    getInput("Enter numbers separated by spaces (or type back): ",
        function(userInput) {

            if (userInput.trim().toLowerCase() === "back") {
                goBack();
                return;
            }

            let entries = userInput.trim().split(/\s+/);

            // Convert valid entries into numbers
            let numbers = processArray(entries, function(value) {
                let converted = Number(value);

                if (value !== "" && Number.isFinite(converted)) {
                    return converted;
                }
            });

            if (numbers.length === 0) {
                console.log("No valid numbers entered. Try again.");
                arrayMenu(goBack);
                return;
            }

            console.log("\nEntered Numbers:", numbers);

            // Calculate sum
            let sum = 0;

            for (let n of numbers) {
                sum += n;
            }

            console.log("Total Sum:", sum);

            // Calculate average
            let average = sum / numbers.length;
            console.log("Average:", average);

            // Find maximum and minimum
            let maximum = numbers[0];
            let minimum = numbers[0];

            processArray(numbers, function(n) {

                if (n > maximum) {
                    maximum = n;
                }

                if (n < minimum) {
                    minimum = n;
                }
            });

            console.log("Largest Number:", maximum);
            console.log("Smallest Number:", minimum);

            // Square every element
            let squaredNumbers = processArray(numbers, function(n) {
                return n ** 2;
            });

            console.log("Squared Numbers:", squaredNumbers);

            // Extract even numbers
            let evenNumbers = processArray(numbers, function(n) {
                if (n % 2 === 0) {
                    return n;
                }
            });

            console.log("Even Numbers:", evenNumbers);

            arrayMenu(goBack);
        }
    );
}


// ---------- Main Menu ----------

function mainMenu() {

    console.log("\n========== MAIN MENU ==========");
    console.log("1. Arithmetic Calculator");
    console.log("2. Array Analysis");
    console.log("3. Exit Program");

    getInput("Enter your choice: ", function(choice) {

        switch (choice) {

            case "1":
                arithmeticMenu(mainMenu);
                break;

            case "2":
                arrayMenu(mainMenu);
                break;

            case "3":
                console.log("Thank you for using the calculator!");
                input.close();
                break;

            default:
                console.log("Invalid selection. Please try again.");
                mainMenu();
        }
    });
}


// ---------- Close Program ----------

input.on("close", function() {
    process.exit(0);
});

// Start application
mainMenu();