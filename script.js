// Logic...
// 1. Store number on screen.
// 2. When operator button is pressed, store operation, clear screen for second number.
// 3. When second number is entered, and user hits enter or “=“, run operate function on (operator, firstNum, secondNum)
// 4. Round answer to two decimal points.

// TO-DO:
// ADD CLASS OF SELECTED WHEN OOPERATOR ISN'T NULL
// ADD CLASS OF SELECTED WHEN KEY PRESSES DOWN
// When you hit enter with just one operator it still operates...
// GET A CHAIN OF OPERATORS TO WORK: 1 + 1 - 2 + 6 

// Figure out how to clear the solution if you start typing a new number,
// rather than just adding that number to the solution's string...

// Stop appendNumber after 17 characters

// VARIABLES TO HOLD BUTTONS & SCREEN VALUE
let numberButtons = document.querySelectorAll(".number");
let pointButton = document.querySelector(".decimal");
let operatorButtons = document.querySelectorAll(".operand");
let equalsButton = document.querySelector(".equal");
let clearButton = document.querySelector("button.clear");
let screen = document.querySelector("#screen");

let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let blankForNext = false;

// EVENT LISTENERS
window.addEventListener("keydown", keyInput);
equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clearToZero);
pointButton.addEventListener("click", appendPoint);

numberButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);

// KEYBOARD INPUT FUNCTIONS
function keyInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendPoint();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Escape") clearToZero();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperation(convertOperator(e.key));
}

function convertOperator(keyOperator) {
  if (keyOperator === "/") return "÷";
  else if (keyOperator === "*") return "*";
  else if (keyOperator === "-") return "−";
  else if (keyOperator === "+") return "+";
}



// SCREEN DISPLAY FUNCTIONS

// IF SCREEN DISPLAYS ZERO, OR FIRST NUMBER AFTER OPERATOR IS SELECTED, RESET SCREEN FOR NEW NUMBER.
function appendNumber(number) {
  if (screen.textContent === "0" || blankForNext) blankScreen();
  else if (screen.textContent.length === 17) return;
  screen.textContent += number;
}

// CLEARS SCREEN TO DISPLAY ZERO VALUE
function clearToZero() {
  screen.textContent = "0";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}

// CLEARS SCREEN ENTIRELY, NO CHARACTERS
function blankScreen() {
  screen.textContent = "";
  blankForNext = false;
}

function appendPoint() {
  if (blankForNext) blankScreen();
  else if (screen.textContent === "") screen.textContent = "0";
  else if (screen.textContent.includes(".")) return;
  screen.textContent += ".";
}

function deleteNumber() {
    screen.textContent = screen.textContent.toString().slice(0, -1);
}

// OPERATION FUNCTIONS
function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstOperand = screen.textContent;
  currentOperation = operator;
  blankForNext = true;
}

function evaluate() {
  if (currentOperation === null || blankForNext) return;
  else if (currentOperation === "÷" && screen.textContent === "0") {
    alert("A number cannot be divided by 0");
    clearToZero();
    return;
  }
  secondOperand = screen.textContent;
  screen.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  currentOperation = null;
}

function roundResult(number) {
  return Math.round(number * 10) / 10;
}

function operate(operator, a, b) {
  a = parseInt(a);
  b = parseInt(b);
  switch (operator) {
    case "+":
      return a + b;
    case "−":
      return a - b;
    case "*":
      return a * b;
    case "÷":
      if (b === 0) return null;
      return a / b;
    default:
      return null;
  }
}

// function add(a, b) {
//   return a + b;
// }

// function subtract(a, b) {
//   return a - b;
// }

// function multiply(a, b) {
//   return a * b;
// }

// function divide(a, b) {
//   return a / b;
// }