let currentOperand = '0'
let storedOperand = undefined
let chosenOp = undefined
let operationState = undefined

const displayValue = document.querySelector('#screen') 
const clearScreen = document.querySelector('.functions.allClear')

const add = (augend, addend) => augend + addend
const subtract = (minued, subtrahend) => minued - subtrahend
const multiply = (multiplicand, multiplier)  => multiplicand * multiplier
const divide = (quotient, dividend)  => quotient / dividend

const operate = (operation, a, b) => {
    switch(operation){
        case '+': return add(a, b)
        case '-': return subtract(a, b)
        case '÷': return divide(a, b)
        case '×': return multiply(a, b)
        default: return
    }
}


displaySize = document.querySelector('.display')
const updateDisplay = (currentOperand, screenElements = 1) => {
    screenElements =  displayValue.innerText.length
    if (screenElements < 6) {displaySize.style.fontSize = '35px'}
    else if((screenElements >= 6) && (screenElements < 8)) {displaySize.style.fontSize = '30px'}
    else if(screenElements >= 8) {displaySize.style.fontSize = '20px'}
    displayValue.innerText = Number(currentOperand).toLocaleString()
}
const clear = () => {
    currentOperand = '0'
    storedOperand = undefined
    chosenOp = undefined
    displayValue.innerText = '0'
}

clearScreen.addEventListener('click',clear)

const percent = () => {
    currentOperand = parseFloat(currentOperand) * 0.01
    currentOperand = currentOperand.toString()
    updateDisplay(currentOperand)
}
const percentage = document.querySelector('.functions.percent')
percentage.addEventListener('click',percent)


const deleteSingle = () => {
   currentOperand = (currentOperand.length > 1) ? currentOperand.slice(0,-1) : '0'
    updateDisplay(currentOperand)
}
const deleteKey = document.querySelector('.functions.delete')
deleteKey.addEventListener('click',deleteSingle)

function compute(op, so, co){
    if(op === undefined) return
    currentOperand = operate(chosenOp, parseFloat(storedOperand), parseFloat(currentOperand)).toString()
    updateDisplay(currentOperand)
}

const equalsButton = document.querySelector('.equals')
equalsButton.addEventListener('click', compute)

const handleButtons = (event) => {
    const buttonPressed = event.target.innerText
    if(displayValue.innerText.length >= 11) return
    if(buttonPressed === '.' && currentOperand.includes('.')) return
    if((buttonPressed === '0') && (currentOperand.startsWith('0'))) return
    if((buttonPressed !== '0') && (currentOperand === '0')) {
            currentOperand = currentOperand.slice(1)
        }
    currentOperand = currentOperand.toString() + buttonPressed.toString()
    updateDisplay(currentOperand)
    }

const buttons = document.querySelectorAll('.digits')
        buttons.forEach(button => button.addEventListener('click', handleButtons))

const handleOperations = (event) => {
    if(storedOperand !== undefined){
        compute(chosenOp, storedOperand, currentOperand)
    }
    storedOperand = currentOperand
    currentOperand = '0'
    chosenOp = event.target.innerText
}

const operationButtons = document.querySelectorAll('.operations')
operationButtons.forEach(button => button.addEventListener('click', handleOperations))