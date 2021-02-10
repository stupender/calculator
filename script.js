// VARRIABLES TO HOLD SCREEN VALUE
let numberButtons = document.querySelectorAll('.number');
let pointButton = document.querySelector('.decimal');
let operatorButtons = document.querySelectorAll('.operand');
let equalsButton = document.querySelector('.equal');
let clearButton = document.querySelector('button.clear');
let screen = document.querySelector('#screen');
// let deleteButton = document.querySelector('.backspace');

let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;
let clearForSecondNum = false;
let solutionIsViewing = false;
// Figure out how to clear the solution if you start typing a new number,
// rather than just adding that number to the solution's string...


// EVENT LISTENERS
window.addEventListener("keydown", setInput);
equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
// deleteButton.addEventListener("click", deleteNumber);
pointButton.addEventListener("click", appendPoint);

numberButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);

// SCREEN DISPLAY FUNCTIONS
function appendNumber(number) {
  if (screen.textContent === "0" || shouldResetScreen) resetScreen();
  screen.textContent += number;
}

function resetScreen() {
  screen.textContent = "";
  shouldResetScreen = false;
}

function clear() {
  screen.textContent = "0";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}

function appendPoint() {
  if (shouldResetScreen) resetScreen();
  if (screen.textContent === "") screen.textContent = "0";
  if (screen.textContent.includes(".")) return;
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
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperation === "÷" && screen.textContent === "0") {
    alert("A number cannot be divided by 0");
    clear();
    return;
  }
  secondOperand = screen.textContent;
  screen.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  currentOperation = null;
  solutionIsViewing = true;
}

function roundResult(number) {
  return Math.round(number * 10) / 10;
}

function setInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendPoint();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Escape") clear();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "*";
  if (keyboardOperator === "-") return "−";
  if (keyboardOperator === "+") return "+";
}

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "−":
      return substract(a, b);
    case "*":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}