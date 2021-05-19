"use strict";

var numberInput = document.querySelector(".input__number");
var numberOutput = document.querySelector(".input__display");

function calculate(event) {
  var enteredNumber = numberInput.value;
  console.log(enteredNumber);
}

function updateNumberOutput() {}

numberInput.addEventListener("change", calculate);