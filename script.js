const buttons = document.querySelectorAll(".controls__button");
const numberInput = document.querySelector(".input__number");
const calcDisplay = document.querySelector(".input__display");

let totalInput1 = "";
let totalInput2 = "";
let operator = "";
let fullCalcString = "";

let isFirstInput = false;
let isSecondInput = false;

const handleInputValue = (event) => {
  let buttonValue = event.target.innerHTML;
  const regex = /\d/g;
  // if input is a number or decimal place:
  if (regex.test(buttonValue) || buttonValue === ".") {
    isFirstInput ? totalInput2 += buttonValue : totalInput1 += buttonValue;
    numberInput.innerHTML = isFirstInput ? totalInput2 : totalInput1;
  console.log(`isFirstInput is ${isFirstInput}, isSecondInput is ${isSecondInput}, totalInput1 is ${totalInput1}, totalInput2 is ${totalInput2}`);

  // if input is an operator:
  } else if (!regex.test(buttonValue) && buttonValue !== "=" && buttonValue !== "AC") {
    if (!totalInput1) return;
    operator = buttonValue;
    calcDisplay.innerHTML = `${totalInput1} ${operator} ${totalInput2}`;
    if (isFirstInput) {
      isFirstInput = false;
      isSecondInput = true;
      totalInput2 = "";
    } else {
      isFirstInput = true;
      isSecondInput = false;
      // totalInput1 = "";
    }
  } else if (buttonValue === "=") {
      let answer = runCalc(totalInput1, totalInput2, operator); 
      calcDisplay.innerHTML = `${totalInput1} ${operator} ${totalInput2} = ${answer}`;
      numberInput.innerHTML = answer;
      totalInput1 = "";
  } else if (buttonValue === "AC") {
    totalInput1 = "";
    totalInput2 = "";
    isFirstInput = false;
    isSecondInput = false;
    calcDisplay.innerHTML = "";
    numberInput.innerHTML = "";
    buttonValue = "";
    answer = "";
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
  button.addEventListener("click", handleInputValue);
});

// function to treat text/keyboard input as a click of relevant button:
// function handleInputValue() {
//   let enteredNumber = numberInput.value;
//   console.log(typeof enteredNumber);
//   for (let i=0; i<buttons.length; i++) {
//     if (enteredNumber == buttons[i].innerHTML) {
//       inputArray.push(buttons[i]);
//     }
//   }
// }

// numberInput.addEventListener("keydown", handleInputValue);




// function handleInputValue(event) {
//   const buttonValue = event.target.innerHTML;
//   let enteredNumber = numberInput.value;
//   const regex = /\d/g;
//   let totalNumber = '';
//   if (regex.test(buttonValue)) {
//     enteredNumber += buttonValue;
//   } else if (!regex.test(buttonValue)) {
//     totalNumber = enteredNumber;
//     enteredNumber = 0;
//   }
//   console.log(totalNumber, enteredNumber);
// }





