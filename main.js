const btns = document.querySelectorAll(".buttons button");
const display = document.querySelector(".display-inner");

let acceptedKeys = "0123456789.-+/*=".split("");
acceptedKeys.push("Backspace");
let displayValue = "";
let operator = "";
let shouldClearNext = false;

btns.forEach((btn) =>
  btn.addEventListener("click", (e) => takeAction(e.target.textContent))
);
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key === "F5") window.location.reload();
  if (acceptedKeys.indexOf(e.key) !== -1) {
    takeAction(e.key);
  }
});

function takeAction(e) {
  if (e === "+/-") {
    addMinusOrPlus();
    return;
  }

  if (e === "<" || e === "Backspace") {
    backspace();
    return;
  }

  if (display.textContent.includes("ERR") || e === "CE") {
    clear();
    return;
  }

  if (e === ".") {
    // make sure dot doesn't appear twice
    if (!display.textContent.includes(".")) {
      display.textContent += ".";
    }

    return;
  }

  if (e === "=") {
    evaluate();
    return;
  }

  if (e === "*" || e === "/" || e === "-" || e === "+") {
    performOperation(e);
    return;
  }

  /**** WE CLICKED ON A NUMBER */
  /**if last action was operator, we should clear displayText now */
  if (shouldClearNext || display.textContent === "0") {
    display.textContent = "";
  }

  shouldClearNext = false;

  display.textContent += e;
}

function addMinusOrPlus() {
  let out;
  if (display.textContent.includes("-")) {
    out = display.textContent.slice(1);
  } else {
    out = `-${display.textContent}`;
  }

  display.textContent = out;
}

function evaluate() {
  if (displayValue !== "" && operator !== "") {
    displayValue = operate(
      operator,
      parseFloat(displayValue),
      parseFloat(display.textContent)
    );
    if (afterDotLen(displayValue) > 8) {
      displayValue = displayValue.toFixed(8);
    }
    display.textContent = displayValue;
    operator = "";
  }
}

function performOperation(operation) {
  shouldClearNext = true;
  if (displayValue !== "" && operator !== "") {
    displayValue = operate(
      operator,
      parseFloat(displayValue),
      parseFloat(display.textContent)
    );
    if (afterDotLen(displayValue) > 8) {
      displayValue = displayValue.toFixed(8);
    }
    display.textContent = displayValue;
  } else {
    displayValue = display.textContent;
  }
  operator = operation;
}

function clear() {
  displayValue = "";
  operator = "";
  display.textContent = "0";
}

function backspace() {
  if (display.textContent === "0") {
    return;
  }

  let output = display.textContent.slice(0, -1);
  if (output === "") {
    display.textContent = "0";
    return;
  }

  display.textContent = output;
}

function afterDotLen(num) {
  if (!num.toString().includes(".")) return;

  return num.toString().split(".")[1].length || 0;
}

/*========== CORE CALCULATOR FUNCTIONS ============*/
function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if (y === 0) return "ERR: divide by zero";
  return x / y;
}

function operate(operator, x, y) {
  switch (operator) {
    case "+":
      return add(x, y);
      break;
    case "-":
      return subtract(x, y);
      break;
    case "*":
      return multiply(x, y);
      break;
    case "/":
      return divide(x, y);
      break;
    default:
      return "ERROR";
  }
}
/*========== CORE CALCULATOR FUNCTIONS ============*/
