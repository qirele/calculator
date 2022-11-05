const btns = document.querySelectorAll(".buttons button");
const display = document.querySelector(".display-inner");

btns.forEach(btn => btn.addEventListener("click", takeAction));

let displayValue = "";
let operator = "";
let shouldClearNext = false;

function takeAction(e) {
  let action = e.target.textContent;
  if (action === "=") {
    return;
  }
  if (action === "CE") {
    displayValue = "";
    operator = "";
    clear();
    return;
  }

  if (e.target.className.includes("operator")) {

    shouldClearNext = true;
    if (displayValue !== "") {
      displayValue = operate(operator, parseFloat(displayValue), parseInt(display.textContent))
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
    clear();
  }

  shouldClearNext = false;

  display.textContent+= e.target.textContent;
}

function clear() {

  display.textContent= "";
}



/*========== CORE CALCULATOR FUNCTIONS ============*/
function add(x,y) {
  return x + y;
}

function subtract(x,y) {
  return x - y;
}

function multiply(x,y) {
  return x * y;
}

function divide(x,y) {
  return x / y;
}


function operate(operator, x,y) {
  switch(operator) {
    case "+":
      return add(x,y);
      break;
    case "-":
      return subtract(x,y);
      break;
    case "*":
      return multiply(x,y);
      break;
    case "/":
      return divide(x,y);
      break;
    default: 
      return "ERROR";
  }
}
/*========== CORE CALCULATOR FUNCTIONS ============*/