const app = document.querySelector('#app');

app.innerHTML = `
<!-- Outer Div -->
<div class="body-div">
    <!-- Heading Div -->
    <div class="heading">
        <h1>calc</h1>
    </div>
    <!-- Line Break -->
    <br><br>

    <!-- Display Div -->
    <div class="display"><span class="display-text"></span></div>

    <!-- Line Break -->
    <br><br>

    <!-- Main Div -->
    <div class="main">
        <!-- Buttons 1st Row Div -->
        <div class="div-btn div-btn1">
            <button type="button" id="7">7</button>
            <button type="button" id="8">8</button>
            <button type="button" id="9">9</button>
            <button type="button" id="del" class="del">DEL</button>
        </div>

        <!-- Buttons 2nd Row Div -->
        <div class="div-btn div-btn2">
            <button type="button" id="4">4</button>
            <button type="button" id="5">5</button>
            <button type="button" id="6">6</button>
            <button type="button" id="+">+</button>
        </div>

        <!-- Buttons 3rd Row Div -->
        <div class="div-btn div-btn3">
            <button type="button" id="1">1</button>
            <button type="button" id="2">2</button>
            <button type="button" id="3">3</button>
            <button type="button" id="-">-</button>
        </div>

        <!-- Buttons 4th Row Div -->
        <div class="div-btn div-btn4">
            <button type="button" id=".">.</button>
            <button type="button" id="0">0</button>
            <button type="button" id="/">/</button>
            <button type="button" id="x">X</button>
        </div>

        <!-- Buttons 5th Row Div -->
        <div class="div-btn div-btn5">
            <button type="button" class="reset" id="reset">Reset</button>
            <button type="button" class="equal" id="=">=</button>
        </div>

    </div>
</div>
`

// Selectors
const div = document.querySelector('.main');
const display = document.querySelector('.display-text');
const reset = document.querySelector('.reset');
const del = document.querySelector('.del');

// variables
let num1 = '';   // 1st Operand
let oper = '';   // Operator
let num2 = '';   // 2nd Operand

// Used to check whether old calculated value exists or not --> 0 means empty & 1 means old calculated value on screen
let flag = 0;

// Functions

// Operand's & Operator Clicking Event's 
function handleClickEvent(event) {

    // Number should be inside the div, they should not cross the div
    if (num1.length + num2.length + oper.length < 18) {

        // We will get id of button on which ever the user will click
        const id = event.target.getAttribute('id');

        // Reset the old calculated results
        if (flag != 0) {
            resetFunction();
        }

        // Checking for input digit by the user
        if (parseInt(id) >= 0 && parseInt(id) <= 9 && id != 'del') {
            if (oper == '') {
                // if num1 is empty then first digit in it
                num1 += id;

                // add to display div
                display.innerHTML += id;
            } else {
                // if num2 is carrying any value than add in num2
                num2 += id;

                // add to display div
                display.innerHTML += id;
            }
        } else if (id != null && num1 != '') { // checking for oper and also click on valid btn not else any where

            // oper other than '=' , 'reset & 'del'
            if (oper.length < 1 && id != '=' && id != 'reset' && id != 'del') {
                // oper var
                oper = id;

                // add to display div
                display.innerHTML += id;
            } else if (id === '=') {                             // oper is equal to '='
                operation(parseInt(num1), oper, parseInt(num2));
                num1 = '';
                num2 = '';
                oper = '';
            }
        }
    }
}

// Reset Button Function
function resetFunction() {
    display.innerHTML = '';
    num1 = '';
    num2 = '';
    oper = '';
    flag = 0;
}

// Operation's on Operands to perform...
function operation(num1, oper, num2) {
    switch (oper) {
        case '+': {
            let sum = num1 + num2;
            display.innerHTML = sum;
            break;
        }
        case '-': {
            let sub = num1 - num2;
            display.innerHTML = sub;
            break;
        }
        case 'x': {
            let mullti = num1 * num2;
            display.innerHTML = mullti
            break;
        }
        case '/': {
            if (num2 == 0) {
                display.innerHTML = "Cannot divide by zero";
                break;
            } else {
                let divide = num1 / num2;
                display.innerHTML = divide;
                break;
            }
        }
        default: {
            display.innerHTML = "Invalid Input";
        }
    }

    // Indicates that equal to button has been pressed to get result. This flag help to reset the old result.
    flag = 1;
}


// Delete Button Function
function deleteFunction() {

    // Data present on screen
    let data = display.innerHTML;

    // If nothing on display then simply return
    if (display.innerHTML === '') {
        return;
    }

    // Getting the value which is removed 
    let val = data[data.length - 1];

    // Checking the value of val, whether it belongs to num1, num2 or oper variable
    if ((val != '+' || val != '-' || val != 'x' || val != '/') && num2.length > 0) {
        num2 = num2.slice(0, -1);
    } else if (val == '+' || val == '-' || val == 'x' || val == '/') {
        oper = oper.slice(0, -1);
    } else {
        num1 = num1.slice(0, -1);
    }

    // Slicing the data in order to display on display screen, remember slicing return a new string
    data = data.slice(0, -1);
    display.innerHTML = data;
}

// Initialization

function init() {
    // Button's i.e. Operand's & Operator Clicking Event's
    div.addEventListener('click', handleClickEvent);

    // Reset Button Event
    reset.addEventListener('click', resetFunction);

    // Delete Button Event
    del.addEventListener('click', deleteFunction);
}

// Calling initaialization function
init();