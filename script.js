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
    if (b === 0) {
        alert("Not today");
        return 0;
    } else {
        return a / b;
    }
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

function callWhenButtonEvent(event, callback) {
    if (event.target.tagName.toLowerCase() == 'button') {
        const buttonValue = event.target.textContent;

        callback(buttonValue);
    }
}

function processOperatorInput(input) {
    const buttonValue = input;

    if (buttonValue === '.') {
        if (firstValue !== null 
            && operationChoice === null 
            && !firstValue.includes(".")
        ) {
            firstValue += buttonValue;
            calculatorDisplay.textContent += buttonValue;
        } else if (secondValue !== null && !secondValue.includes(".")) {
            secondValue += buttonValue;
            calculatorDisplay.textContent += buttonValue;
        }
    } else if (buttonValue === '=' && secondValue !== null) {
        const operationResult = operate(
            operationChoice, 
            Number(firstValue), 
            Number(secondValue)
        );

        firstValue = `${operationResult}`;
        secondValue = null;

        operationChoice = null;
        calculatorDisplay.textContent = `${operationResult}`;
    } else if (secondValue !== null) {
        const operationResult = operate(
            operationChoice, 
            Number(firstValue), 
            Number(secondValue)
        );

        firstValue = `${operationResult}`;
        secondValue = null;

        operationChoice = buttonValue;
        calculatorDisplay.textContent = `${operationResult}` 
            + " " + operationChoice + " ";
    } else if (buttonValue !== '=' && firstValue !== null) {
        operationChoice = buttonValue;
        calculatorDisplay.textContent += ` ${operationChoice} `;
    }
}

function processNumberInput(input) {
    const buttonValue = input;

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

function processBackspaceInput() {
    if (firstValue !== null && operationChoice === null) {
        firstValue = firstValue.slice(0, -1);

        if (firstValue === '') {
            firstValue = null;
        }

        calculatorDisplay.textContent = calculatorDisplay
                                        .textContent.slice(0, -1);

        if (calculatorDisplay.textContent === '') {
            calculatorDisplay.textContent = "0";
        }
    } else if (secondValue === null && operationChoice !== null) {
        operationChoice = null;
        calculatorDisplay.textContent = calculatorDisplay
                                        .textContent.slice(0, -3);
    } else if (secondValue !== null) {
        secondValue = secondValue.slice(0, -1);

        if (secondValue === '') {
            secondValue = null;
        }

        calculatorDisplay.textContent = calculatorDisplay
                                        .textContent.slice(0, -1);

        if (calculatorDisplay.textContent === '') {
            calculatorDisplay.textContent = "0";
        }
    }
}

let calculatorDisplay = document.querySelector('#display');

let firstValue = null;
let secondValue = null;
let operationChoice = null;

let numberButtons = document.querySelector('#numbers');

numberButtons.addEventListener('click', (event) => {
    callWhenButtonEvent(event, processNumberInput);
});

let operatorButtons = document.querySelector('#operators');

operatorButtons.addEventListener('click', (event) => {
    callWhenButtonEvent(event, processOperatorInput);
});

let clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', () => {
    firstValue = null;
    secondValue = null;

    operationChoice = null;
    calculatorDisplay.textContent = "0";
});

let backspaceButton = document.querySelector("#backspace");

backspaceButton.addEventListener('click', processBackspaceInput);