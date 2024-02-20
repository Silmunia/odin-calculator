function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, firstValue, secondValue) {
    switch (operator) {
        case '+':
            return add(firstValue, secondValue);
        case '-':
            return subtract(firstValue, secondValue);
        case '*':
            return multiply(firstValue, secondValue);
        case '/':
            return divide(firstValue, secondValue);
        default:
            return;
    }
}

function processOperatorInput(event) {
    if (event.target.tagName.toLowerCase() == 'button') {
        const buttonValue = event.target.textContent;

        if (buttonValue === '=' && secondValue !== null) {
            const operationResult = operate(
                operationChoice, 
                Number(firstValue), 
                Number(secondValue)
            );

            firstValue = operationResult;
            secondValue = null;

            operationChoice = null;
            calculatorDisplay.textContent = operationResult;
        } else if (secondValue !== null) {
            const operationResult = operate(
                operationChoice, 
                Number(firstValue), 
                Number(secondValue)
            );

            firstValue = operationResult;
            secondValue = null;

            operationChoice = buttonValue;
            calculatorDisplay.textContent = operationResult 
                + " " + operationChoice + " ";
        } else if (buttonValue !== '=' && firstValue !== null) {
            operationChoice = buttonValue;
            calculatorDisplay.textContent += ` ${operationChoice} `;
        }
    }
}

let calculatorDisplay = document.querySelector('#display');

let firstValue = null;
let secondValue = null;
let operationChoice = null;

let digitButtons = document.querySelector('#numbers');

digitButtons.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() == 'button') {
        const buttonValue = event.target.textContent;

        if (calculatorDisplay.textContent == '0') {
            calculatorDisplay.textContent = buttonValue;
        } else {
            calculatorDisplay.textContent += buttonValue;
        }

        if (operationChoice === null) {
            firstValue = firstValue === null 
                ? buttonValue 
                : firstValue + buttonValue;
        } else {
            secondValue = secondValue === null 
                ? buttonValue 
                : secondValue + buttonValue;
        }
    }
});

let operatorButtons = document.querySelector('#operators');

operatorButtons.addEventListener('click', processOperatorInput);