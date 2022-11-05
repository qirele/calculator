const btns = document.querySelectorAll(".buttons button");
const display = document.querySelector(".display-inner");

btns.forEach((btn) => btn.addEventListener("click", takeAction));

let displayValue = "";
let operator = "";
let shouldClearNext = false;

function takeAction(e) {
  let action = e.target.textContent;

  if (action === "<") {
    backspace();
    return;
  }

  if (display.textContent.includes("ERR") || action === "CE") {
    clear();
    return;
  }

  if (action === ".") {
    // check if a dot already appears in value
    if (!display.textContent.includes(".")) {
      display.textContent += ".";
    }

    return;
  }

  if (action === "=") {
    if (displayValue !== "" && operator !== "") {
      displayValue = operate( operator, parseFloat(displayValue), parseFloat(display.textContent) );
      if (afterDotLen(displayValue) > 8) {
        displayValue = displayValue.toFixed(8);
      }
      display.textContent = displayValue;
      operator = "";
    }
    return;
  }

  if (e.target.className.includes("operator")) {
    shouldClearNext = true;
    if (displayValue !== "" && operator !== "") {
      displayValue = operate( operator, parseFloat(displayValue), parseFloat(display.textContent) );
      if (afterDotLen(displayValue) > 8) {
        displayValue = displayValue.toFixed(8);
      }
      display.textContent = displayValue;
    } else {
      displayValue = display.textContent;
    }
    operator = action;
    return;
  }

  /**** WE CLICKED ON A NUMBER */
  /**if last action was operator, we should clear displayText now */
  if (shouldClearNext || display.textContent === "0") {
    display.textContent = "";
  }

  shouldClearNext = false;

  display.textContent += e.target.textContent;
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
// 23653.600000000002

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
