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

//function to get input value:
const getInputValue = (event) => {
  console.log(event);
  //button key pad:
  if (event.type === "click")  {
     inputValue = event.target.innerHTML;
    //keyboard input:
  } else if (event.type === "keydown") {
    let key = event.key;
    // if (/^[\d\.+=\-x%\/\*]$/.test(key)) {
      if (/^[\d\.+\-x%]$/.test(key)) {
      inputValue = key;
    } else if (key === "Enter") {
      inputValue = "=";
    } else if (key === "/") {
      inputValue = "÷";
    } else if (key === "*") {
      inputValue = "x";
    } else {
      return;
    }
  }
  handleInputValue(inputValue);
}

const handleInputValue = (buttonValue) => {
  const regex = /\d/;
  // if input is a number or decimal place:
  if (regex.test(buttonValue) || buttonValue === ".") {
    //set max input length to 8:
    if (isInput1) {
      if (totalInput2.length < 8) {
        totalInput2 += buttonValue;
      } else return;
    } else if (!isInput1) {
      if (totalInput1.length < 8) {
        totalInput1 += buttonValue;
      } else return;
    }
  //prevent leading zeros in front of the input number:  
  if (totalInput1.length >=2 && totalInput1[0] === "0" && totalInput1[1]  !== ".") {
    totalInput1 = totalInput1.substring(1);
  } 
  if (totalInput2.length >=2 && totalInput2[0] === "0" && totalInput2[1]  !== ".") {
    totalInput2 = totalInput2.substring(1);
  }
  numberInput.innerHTML = isInput1 ? totalInput2 : totalInput1;
    
  // if input is an operator:
  } else if (!regex.test(buttonValue) && buttonValue !== "=" && buttonValue !== "AC" && buttonValue !== "Enter") {
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
  } else if (buttonValue === "=" || buttonValue === "Enter") {
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
    operator = "";
    calcDisplay.innerHTML = "";
    numberInput.innerHTML = "";
    buttonValue = "";
    inputValue = "";
    answer = "";
    buttons.forEach((button) => {
      button.disabled = false;
    });
  }
}

const runCalc = (num1, num2, operator) => {
  switch(operator) {
    case "%":
      return (num1 % num2).toFixed(2);
      break;
    case "÷":
    case "/":
      return (num1 / num2).toFixed(2);
      break;
    case "x":
    case "*":
      return (num1 * num2).toFixed(2);
      break;
    case "-":
      return (num1 - num2).toFixed(2);
      break;
    case "+":
      return (num1 + num2).toFixed(2);
      break;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", getInputValue);
});

document.addEventListener("keydown", getInputValue);






