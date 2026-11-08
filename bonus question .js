// ---------- BONUS : menu driven calculator ----------
// run with:  node assignment3.js
// (the menu starts after all the tasks above are printed)
var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question, done) {
  rl.question(question, done);
}

// arithmetic part
function arithmeticMenu(back) {
  console.log("\n--- Arithmetic ---");
  console.log("1. Add");
  console.log("2. Subtract");
  console.log("3. Multiply");
  console.log("4. Divide");
  console.log("5. Back");

  ask("Choose: ", function (choice) {
    if (choice === "5") {
      back();
      return;
    }
    if (choice !== "1" && choice !== "2" && choice !== "3" && choice !== "4") {
      console.log("Invalid choice, try again.");
      arithmeticMenu(back);
      return;
    }

    ask("First number: ", function (x) {
      ask("Second number: ", function (y) {
        var a = Number(x);
        var b = Number(y);

        if (isNaN(a) || isNaN(b) || x.trim() === "" || y.trim() === "") {
          console.log("Please enter valid numbers!");
          arithmeticMenu(back);
          return;
        }

        var answer;
        if (choice === "1") {
          answer = calculate(a, b, function (p, q) { return p + q; });
        } else if (choice === "2") {
          answer = calculate(a, b, function (p, q) { return p - q; });
        } else if (choice === "3") {
          answer = calculate(a, b, function (p, q) { return p * q; });
        } else {
          answer = calculate(a, b, function (p, q) {
            if (q === 0) {
              return "Cannot divide by zero";
            }
            return p / q;
          });
        }
        console.log("Result:", answer);
        arithmeticMenu(back);
      });
    });
  });
}

// array analysis part
function arrayMenu(back) {
  console.log("\n--- Array Analysis ---");
  ask("Enter numbers separated by spaces (or type back): ", function (line) {
    if (line.trim().toLowerCase() === "back") {
      back();
      return;
    }

    // convert input to numbers, using processArray with a callback
    // anything that is not a number gets skipped
    var parts = line.trim().split(/\s+/);
    var nums = processArray(parts, function (p) {
      var n = Number(p);
      if (p !== "" && !isNaN(n)) {
        return n;
      }
    });

    if (nums.length === 0) {
      console.log("No valid numbers found, try again.");
      arrayMenu(back);
      return;
    }

    console.log("Numbers:", nums);

    var total = 0;
    processArray(nums, function (n) {
      total += n;
    });
    console.log("Sum:", total);
    console.log("Average:", total / nums.length);

    var biggest = nums[0];
    var smallest = nums[0];
    processArray(nums, function (n) {
      if (n > biggest) {
        biggest = n;
      }
      if (n < smallest) {
        smallest = n;
      }
    });
    console.log("Max:", biggest);
    console.log("Min:", smallest);

    console.log("Squares:", processArray(nums, function (n) { return n * n; }));
    console.log("Even numbers:", processArray(nums, function (n) {
      if (n % 2 === 0) {
        return n;
      }
    }));

    arrayMenu(back);
  });
}

function mainMenu() {
  console.log("\n===== Calculator Menu =====");
  console.log("1. Arithmetic calculations");
  console.log("2. Array analysis");
  console.log("3. Exit");

  ask("Choose: ", function (choice) {
    if (choice === "1") {
      arithmeticMenu(mainMenu);
    } else if (choice === "2") {
      arrayMenu(mainMenu);
    } else if (choice === "3") {
      console.log("Bye!");
      rl.close();
    } else {
      console.log("Invalid choice, try again.");
      mainMenu();
    }
  });
}

// if input ends (like ctrl+d) just close quietly
rl.on("close", function () {
  process.exit(0);
});

mainMenu();