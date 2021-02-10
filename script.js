// VARIABLES TO HOLD BUTTONS & SCREEN VALUE
let numberButtons = document.querySelectorAll(".number");
let pointButton = document.querySelector(".decimal");
let operatorButtons = document.querySelectorAll("button.operator");
let equalsButton = document.querySelector(".equal");
let clearButton = document.querySelector("button.clear");
let screen = document.querySelector("#screen");

let firstOperand = "";
let secondOperand = "";
let currentSetOperator = null;
let blankForNext = false;
let solutionViewing = false;



// EVENT LISTENERS
window.addEventListener("keydown", keyInput);
numberButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);
pointButton.addEventListener("click", appendPoint);
operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperator(button.textContent))
);
equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clearToZero);



// KEYBOARD INPUT FUNCTIONS . . .
function keyInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendPoint();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Escape") clearToZero();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") 
    setOperator(convertOperatorKey(e.key));
}

function convertOperatorKey(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "*";
  if (keyboardOperator === "-") return "-";
  if (keyboardOperator === "+") return "+";
}



// SCREEN DISPLAY FUNCTIONS . . .

// IF SCREEN DISPLAYS ZERO, OR FIRST NUMBER AFTER OPERATOR IS SELECTED, RESET SCREEN FOR NEW NUMBER.
function appendNumber(number) {
  if (screen.textContent === "0" || blankForNext || solutionViewing) blankScreen();
  if (screen.textContent.length === 17) return;
  screen.textContent += number;
}

// CLEARS SCREEN TO DISPLAY ZERO VALUE .. problem area... when this is accessed by physical button.
function clearToZero() {
  screen.textContent = "0";
  firstOperand = "";
  secondOperand = "";
  currentSetOperator = null;
  blankForNext = false;
}

// CLEARS SCREEN ENTIRELY, NO CHARACTERS
function blankScreen() {
  screen.textContent = "";
  blankForNext = false;
  solutionViewing = false;
}

function appendPoint() {
  if (blankForNext) blankScreen();
  if (screen.textContent === "") screen.textContent = "0";
  if (screen.textContent.includes(".")) return;
  screen.textContent += ".";
}

function deleteNumber() {
    screen.textContent = screen.textContent.toString().slice(0, -1);
    if (screen.textContent === "") screen.textContent = "0";
}



// OPERATION FUNCTIONS . . .
function setOperator(operator) {
// IF YOU'VE ALREADY GOT AN OPERATION GOING, EVALUATE, AND CONTINUE.
  if (currentSetOperator !== null) evaluate();
  firstOperand = screen.textContent;
  currentSetOperator = operator;
  blankForNext = true;
}

function evaluate() {
  if (currentSetOperator === null || blankForNext) return;
  if (currentSetOperator === "÷" && screen.textContent === "0") {
    alert("A number cannot be divided by 0");
    clearToZero();
    return;
  }
  secondOperand = screen.textContent;
  screen.textContent = roundNumber(
    operate(currentSetOperator, firstOperand, secondOperand)
  );
  currentSetOperator = null;
  firstOperand = ""
  secondOperand = ""
  solutionViewing = true;
}

function roundNumber(number) {
  return Math.round(number * 100) / 100;
}

function operate(operator, a, b) {
  a = parseInt(a);
  b = parseInt(b);
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "÷":
      if (b === 0) return null;
      else return a / b;
    default:
      return null;
  }
}


// TO-DO:
// ADD CLASS OF SELECTED WHEN OPERATOR ISN'T NULL
// ADD CLASS OF SELECTED WHEN KEY PRESSES DOWN
// When you hit enter with just one operand it still operates...

