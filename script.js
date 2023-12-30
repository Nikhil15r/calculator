let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let array = Array.from(buttons);
let resultDisplayed = false;
let enterPressed = false;

// Add event listeners for button clicks
array.forEach(button => {
    button.addEventListener('click', handleClick);
});

// Add keyboard support
document.addEventListener('keydown', handleKeyPress);

function handleClick(e) {
    if (e.target.innerHTML == '=') {
        handleEqualButtonClick();
    } else if (e.target.innerHTML == 'AC') {
        handleACButtonClick();
    } else if (e.target.innerHTML == 'DEL') {
        handleDELButtonClick();
    } else {
        handleOtherButtonClick(e.target.innerHTML);
    }
}

function handleEqualButtonClick() {
    string = eval(string);
    input.value = string;
    resultDisplayed = true;
    enterPressed = false;
}

function handleACButtonClick() {
    string = "";
    input.value = string;
}

function handleDELButtonClick() {
    string = string.substring(0, string.length - 1);
    input.value = string;
}

function handleOtherButtonClick(buttonValue) {
    if (resultDisplayed) {
        string = "";
        resultDisplayed = false;
        enterPressed = false;
    }
    if (/[\d.]/.test(buttonValue)) {
        handleDigitButtonClick(buttonValue);
    } else {
        handleOperatorButtonClick(buttonValue);
    }
}

function handleDigitButtonClick(buttonValue) {
    if (buttonValue === '.' && string.includes('.')) {
        return;
    }
    if (buttonValue === '0' && string === '0') {
        return;
    }
    string += buttonValue;
    input.value = string;
}

function handleOperatorButtonClick(buttonValue) {
    if (/[\+\-\*\/\%]$/.test(string)) {
        return;
    }
    string += buttonValue;
    input.value = string;
}

function handleKeyPress(e) {
    const key = e.key;
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '%', 'Enter', 'Backspace'];
    if (allowedKeys.includes(key)) {
        input.value = '';
        if (key === 'Enter') {
            handleEqualButtonClick();
        } else if (key === 'Backspace') {
            handleDELButtonClick();
        } else {
            handleOtherButtonClick(key);
        }
    }
}
