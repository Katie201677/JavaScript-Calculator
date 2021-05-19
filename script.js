const buttons = document.querySelectorAll(".controls__button");
const numberInput = document.querySelector(".input__number");
const calcDisplay = document.querySelector(".input__display");

let totalInput1 = "";
let totalInput2 = "";
let operator = "";
let answer = "";

let isInput1 = false;
let isInput2 = false;
let isButtonsDisabled = false;
let pressedKey = "";
let inputValue = "";

const getInputValue = (event) => {
  console.log(event);
  if (event.type === "click")  {
     inputValue = event.target.innerHTML;
     console.log(inputValue);
  } else if (event.type === "keydown") {
    let key = event.key;
    if (/^[\d\.]$/.test(key)) {
      inputValue = key;
    } else {
      return;
    }
  }
  handleInputValue(inputValue);
}

const handleInputValue = (buttonValue) => {
  // let buttonValue = event.target.innerHTML;
  const regex = /\d/;
  // if input is a number or decimal place:
  if (regex.test(buttonValue) || buttonValue === ".") {
    isInput1 ? totalInput2 += buttonValue : totalInput1 += buttonValue;
    numberInput.innerHTML = isInput1 ? totalInput2 : totalInput1;
    
  // if input is an operator:
  } else if (!regex.test(buttonValue) && buttonValue !== "=" && buttonValue !== "AC") {
    if (!totalInput1) return;
    if (totalInput1 && totalInput2) return;
    operator = buttonValue;
    calcDisplay.innerHTML = `${totalInput1} ${operator} ${totalInput2}`;
    totalInput1 ? isInput1 = true : isInput1 = false;
    totalInput2 ? isInput2 = true : isInput2 = false;
    if (isButtonsDisabled) {
      isButtonsDisabled = false;
      buttons.forEach((button) => {
        button.disabled = false;
      })
    }
  
    // if input is "=":  
  } else if (buttonValue === "=") {
      if (!totalInput1 || !totalInput2) return;
      answer = runCalc(Number(totalInput1), Number(totalInput2), operator); 
      calcDisplay.innerHTML = `${totalInput1} ${operator} ${totalInput2} = ${answer}`;
      numberInput.innerHTML = answer;
      totalInput1 = answer;
      totalInput2 = "";
      isInput1 = true;
      isInput2 = false;
      operator = "";
      buttons.forEach((button) => {
        if (regex.test(button.innerHTML)) {
          button.disabled = true;
        }
        if (button.innerHTML === ".") {
          button.disabled = true;
        }
        isButtonsDisabled = true;
      });
  
  // if input is "AC":
  } else if (buttonValue === "AC") {
    totalInput1 = "";
    totalInput2 = "";
    isInput1 = false;
    isInput2 = false;
    calcDisplay.innerHTML = "";
    numberInput.innerHTML = "";
    buttonValue = "";
    answer = "";
    buttons.forEach((button) => {
      button.disabled = false;
    })
  }
}

const runCalc = (num1, num2, operator) => {
  switch(operator) {
    case "%":
      return num1 % num2;
      break;
    case "÷":
      return num1 / num2;
      break;
    case "x":
      return num1 * num2;
      break;
    case "-":
      return num1 - num2;
      break;
    case "+":
      return num1 + num2;
      break;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", getInputValue);
});

document.addEventListener("keydown", getInputValue);






