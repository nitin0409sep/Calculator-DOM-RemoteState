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

// Variables
let num1 = '';   // 1st Operand
let oper = '';   // Operator
let num2 = '';   // 2nd Operand

// Helping var that indicates the operator is set(changed) more then once
let count = 0;
let val = 0;

// Functions



// Operand's & Operator Clicking Event's 
function handleClickEvent(event) {

    if (display.innerHTML === '' || display.innerHTML == NaN) {
        resetFunction();
    }

    // Number should be inside the div, they should not cross the div
    if (num1.length + num2.length + oper.length < 18) {

        // We will get id of button on which ever the user will click
        const id = event.target.getAttribute('id');

        // Checking for input digit by the user
        if (parseInt(id) >= 0 && parseInt(id) <= 9 && id != 'del') {
            if (oper === '' && val == 0) {
                // if num1 is empty then first digit in it
                num1 += id;

                // add to display div
                display.innerHTML += id;
            } else if (oper !== '') {
                // if num2 is carrying any value than add in num2
                num2 += id;

                // add to display div
                display.innerHTML += id;
            }
        } else if (id != null && num1 != '') { // checking for oper and also click on valid btn not else any where

            // oper other than '=' , 'reset & 'del'
            if (id !== '=' && id !== 'reset' && id !== 'del' && num2 === '') { // num2=''as becoz we can calc only 2 operand at a time i.e a + b || a - c || a * b || a / b... a*b+ --> Not Allowed

                // oper var
                oper = id;

                // It indicates that the operator is set(changed) more then once
                if (count > 0) {
                    // If the operator is changed several times
                    let data = display.innerHTML.slice(0, -1); // copying str by removing operator present in it at last
                    display.innerHTML = data;
                    display.innerHTML += id;
                } else {
                    // add to display div
                    display.innerHTML += id;
                    count++;
                }
            } else if (id === '=') {                             // oper is equal to '='
                operation(parseInt(num1), oper, parseInt(num2));
                num1 = display.innerHTML;//Assigning value of the display screen as num1 if user want to do further calc.
                num2 = '';
                oper = '';
                count = 0;
                val = 1;
            }
        }
    }

    // Once the button is clicked then it shouldn't be left selected, as it may overide other data or generate issue in keypress by keyboard 
    event.target.blur();
}


// Operand's & Operator Keyborad Event's 
function handleKeyEvent(event) {

    // If a user deletes/backspace the old output and cleared the display then the resetFunction should be called
    if (display.innerHTML === '' || display.innerHTML == "Cannot divide by zero" || display.innerHTML == NaN) {
        resetFunction();
    }

    // Number should be inside the div, they should not cross the div
    if (num1.length + num2.length + oper.length < 18) {
        // We will get id of button on which ever the user will click
        const id = event.key;

        // Reset the old calculated results
        if (id == 'Escape') {
            resetFunction();
        }

        // Checking for input digit by the user
        if (parseInt(id) >= 0 && parseInt(id) <= 9 && id != 'Backspace') {
            if (oper === '' && val === 0) {
                // if num1 is empty then first digit in it
                num1 += id;

                // add to display div
                display.innerHTML += id;
            } else if (oper !== '') {
                // if num2 is carrying any value than add in num2
                num2 += id;

                // add to display div
                display.innerHTML += id;
            }
        } else if (id != undefined && num1 != '') { // checking for oper and also click on valid btn not else any where

            // oper other than '=' , 'reset & 'del'
            if ((id === '+' || id === '-' || id === '*' || id === '/') && num2 === '') {
                // oper var
                oper = id;

                // It indicates that the operator is set(changed) more then once
                if (count > 0) {
                    // If the operator is changed several times
                    let data = display.innerHTML.slice(0, -1);    // copying str by removing operator present in it at last 
                    display.innerHTML = data;
                    display.innerHTML += id;

                } else {
                    // add to display div
                    display.innerHTML += id;
                    count++;
                }

            } else if (id === 'Enter') {        // oper is equal to '='
                operation(parseInt(num1), oper, parseInt(num2));
                num1 = display.innerHTML;  //Assigning value of the display screen as num1 if user want to do further calc.
                num2 = '';
                oper = '';
                count = 0;
                val = 1;                  // Updating val, so that we can deal with res value on display screen
            } else if (id === 'Backspace') {
                deleteFunction();
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
    count = 0;
    val = 0;
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
        case '*': {
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
            display.innerHTML = display.innerHTML;
        }
    }
}


// Delete Button Function
function deleteFunction() {

    // If nothing on display then simply return
    if (display.innerHTML === '' || display.innerHTML == NaN) {
        val = 0;
        resetFunction();
    }

    // Data present on screen
    let data = display.innerHTML;

    // Getting the value which is removed 
    let val = data[data.length - 1];


    // Checking the value of val, whether it belongs to num1, num2 or oper variable
    if ((val != '+' || val != '-' || val != 'x' || val != '/') && num2.length > 0) {
        num2 = num2.slice(0, -1);
    } else if (val == '+' || val == '-' || val == 'x' || val == '/') {
        oper = '';
        count = 0;  // indicates that the operator has been deleted and again going to be initalized
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

    // Keyboard Event's
    document.addEventListener('keyup', handleKeyEvent)

    // Reset Button Event
    reset.addEventListener('click', resetFunction);

    // Delete Button Event
    del.addEventListener('click', deleteFunction);
}

// Calling initaialization function
init();



