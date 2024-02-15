const previousOperandTextElement = document.querySelector(".previous-operand");
const currentOperandTextElement = document.querySelector(".current-operand");

const operations = document.querySelectorAll("#operation");

const numbers = document.querySelectorAll(".number");
const clearButton = document.getElementById("clear");
const equalButton = document.getElementById("equal");
const deleteButton = document.getElementById("del");

let firstNumber = "";
let secondNumber = "";
let currentOperation = undefined;

numbers.forEach((number) => {
  number.addEventListener("click", (number) => {
    if (currentOperation === undefined) {
      if (
        number.target.textContent === "." &&
        firstNumber.toString().includes(".")
      )
        return;
      firstNumber =
        firstNumber.toString() + number.target.textContent.toString();
      currentOperandTextElement.textContent = firstNumber;
    } else {
      if (
        number.target.textContent === "." &&
        secondNumber.toString().includes(".")
      )
        return;
      secondNumber =
        secondNumber.toString() + number.target.textContent.toString();
      currentOperandTextElement.textContent = secondNumber;
    }
  });
});

operations.forEach((operation) => {
  operation.addEventListener("click", (operation) => {
    currentOperation = operation.target.textContent;
    if (firstNumber !== "" && secondNumber !== "") {
      console.log("worked");
      compute();
    } else {
      previousOperandTextElement.textContent = `${firstNumber} ${currentOperation}`;
      currentOperandTextElement.textContent = "";
    }
  });
});

// function to compute result base on current operation
function compute() {
  let result;
  switch (currentOperation) {
    case "+":
      result = firstNumber + secondNumber;
      break;
    case "-":
      result = firstNumber - secondNumber;
      break;
    case "*":
      result = firstNumber * secondNumber;
      break;
    case "/":
      result = firstNumber / secondNumber;
      break;
    default:
      return;
  }

  currentOperandTextElement.textContent = result;
  previousOperandTextElement.textContent = "";
  firstNumber = result;
  secondNumber = "";
  currentOperation = undefined;
}

equalButton.addEventListener("click", () => {
  if (firstNumber === "" || secondNumber === "") return;
  compute();
});

clearButton.addEventListener("click", () => {
  firstNumber = "";
  secondNumber = "";
  currentOperation = undefined;
  currentOperandTextElement.textContent = "";
  previousOperandTextElement.textContent = "";
});

deleteButton.addEventListener("click", () => {
  if (
    firstNumber !== "" &&
    currentOperation === undefined &&
    secondNumber === ""
  ) {
    firstNumber = firstNumber.slice(0, -1);
    currentOperandTextElement.textContent = firstNumber;
    return;
  } else if (firstNumber !== "" && currentOperation !== undefined) {
    previousOperandTextElement.textContent = `${firstNumber}`;
    currentOperandTextElement.textContent = `${firstNumber}`;
    previousOperandTextElement.textContent = "";
    currentOperation = undefined;
  } else {
    secondNumber = secondNumber.slice(0, -1);
    currentOperandTextElement.textContent = secondNumber;
  }

  // if (firstNumber !== '') return;
  // if(secondNumber !== '') {
  //   secondNumber = secondNumber.slice(0, -1);
  //   currentOperandTextElement.textContent = secondNumber;
  // }

  // if (currentOperation === previousOperandTextElement.textContent[-1]) {
  //   currentOperation = undefined;
  //   firstNumber = previousOperandTextElement.textContent;
  //   currentOperandTextElement.textContent = previousOperandTextElement.textContent;
  //   previousOperandTextElement.textContent = '';
  // }
});
