const btns = document.querySelectorAll(".buttons button");
const display = document.querySelector(".display");

btns.forEach(btn => btn.addEventListener("click", takeAction));

function takeAction(e) {
  let action = e.target.textContent;
  if (action === "=") {
    return;
  }
  if (action === "CE") {
    clear();
    return;
  }


  if (display.textContent === "0") {
    display.textContent = "";
  }

  display.textContent += e.target.textContent;
}

function clear() {
  display.textContent = "0";
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