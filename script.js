const aboutText = document.querySelectorAll(".header__about");
const buttons = document.querySelectorAll(".controls__button");
const calcDisplay = document.querySelector(".input__display");
const headerButton = document.querySelector(".header__button");
const numberInput = document.querySelector(".input__number");

let answer = "";
let inputValue = "";
let isButtonsDisabled = false;
let isInput1 = false;
let isInput2 = false;
let operator = "";
let pressedKey = "";
let totalInput1 = "";
let totalInput2 = "";

//function to get input value:
const getInputValue = (event) => {
  //button key pad:
  if (event.type === "click")  {
     inputValue = event.target.innerHTML;
     event.target.blur();
  //keyboard input:
  } else if (event.type === "keydown") {
    let key = event.key;
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

//function to add button value to total input and set max input length to 8:
const addTotalInput = (buttonValue) => {
  if (isInput1) {
    if (totalInput2.length < 8) {
      totalInput2 += buttonValue;
    } return;
  }  
  if (!isInput1) {
    if (totalInput1.length < 8) {
      totalInput1 += buttonValue;
    } return;
  }
}

//function to prevent leading zeros in front of the input number:
const checkLeadingZeros = () => {
  if (totalInput1.length >=2 && totalInput1[0] === "0" && totalInput1[1]  !== ".") {
    totalInput1 = totalInput1.substring(1);
  } 
  if (totalInput2.length >=2 && totalInput2[0] === "0" && totalInput2[1]  !== ".") {
    totalInput2 = totalInput2.substring(1);
  }
}

//function to set operator value:
const setOperatorValue = (buttonValue) => {
  if (!totalInput1) return;
  if (totalInput1 && totalInput2) return;
  operator = buttonValue;
  isInput1 = totalInput1 ? true : false;
  isInput2 = totalInput2 ? true : false;
  if (isButtonsDisabled) {
    isButtonsDisabled = false;
    buttons.forEach((button) => {
      button.disabled = false;
    })
  }
}

//function to reset: // change just to common things for = as well:
const reset = () => {
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

//function to perform calculation:
const runCalc = (num1, num2, operator) => {
  let sum;
  switch(operator) {
    case "%":
      return Number((num1 % num2).toFixed(2));
      break;
    case "÷":
    case "/":
      return Number((num1 / num2).toFixed(2));
      break;
    case "x":
    case "*":
      return Number((num1 * num2).toFixed(2));
      break;
    case "-":
      return Number((num1 - num2).toFixed(2));
      break;
    case "+":
      return Number((num1 + num2).toFixed(2));
      break;
      // default:
  }
}

const handleInputValue = (buttonValue) => {
  const regex = /\d/;
  // if input is a number or decimal place:
  if (regex.test(buttonValue) || buttonValue === ".") {
    addTotalInput(buttonValue);
  //prevent leading zeros in front of the input number:  
    checkLeadingZeros();
  //update display with relevant input:  
  numberInput.innerHTML = isInput1 ? totalInput2 : totalInput1;
    
  // if input is an operator:
  } if (!regex.test(buttonValue) && buttonValue !== "=" && buttonValue !== "AC" && buttonValue !== "Enter") {
    setOperatorValue(buttonValue);
    calcDisplay.innerHTML = `${totalInput1} ${operator} ${totalInput2}`;
  
  // if input is "=":  
  } if (buttonValue === "=" || buttonValue === "Enter") {
      if (!totalInput1 || !totalInput2) return;
      answer = runCalc(Number(totalInput1), Number(totalInput2), operator); 
      calcDisplay.innerHTML = `${totalInput1} ${operator} ${totalInput2} = ${answer}`;
      numberInput.innerHTML = answer;
      totalInput1 = answer;
      totalInput2 = "";
      isInput1 = true;
      isInput2 = false;
      operator = "";
      //prevent further inputs but allow further calculation based on existing answer:
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
  } if (buttonValue === "AC") {
      reset();
    }
}



buttons.forEach((button) => {
  button.addEventListener("click", getInputValue);
});

document.addEventListener("keydown", getInputValue);

//function to show/hide further info when in mobile view:
headerButton.addEventListener("click", () => {
  if (!aboutText[0].classList.contains("visible")) {
    aboutText.forEach((para) => {
      para.classList.add("visible");
    });
    headerButton.innerHTML = "<h2 class='header__h2'>Hide</h2><i class='fas fa-arrow-circle-up header__icon'></i>";
  } else {
    aboutText.forEach((para) => {
      para.classList.remove("visible");
    });
    headerButton.innerHTML = "<h2 class='header__h2'>More</h2><i class='fas fa-arrow-circle-down header__icon'></i>";
  }; 
})



