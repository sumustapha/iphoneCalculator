
let storedOperand = undefined
let chosenOp = undefined
let operationState = undefined

const displayValue = document.querySelector('#screen')
let currentOperand = displayValue.innerText

displaySize = document.querySelector('.display')
function updateDisplay(currentOperand){
    displayValue.innerText = Number(currentOperand).toLocaleString()
}

const clearScreen = document.querySelector('.functions.allClear')
clearScreen.addEventListener('click',clear)
function clear(){
    currentOperand = '0'
    storedOperand = undefined
    chosenOp = undefined
    displayValue.innerText = '0'
}

const percentage = document.querySelector('.functions.percent')
percentage.addEventListener('click',percent)
function percent(){
    currentOperand = parseFloat(currentOperand) * 0.01
    currentOperand = currentOperand.toString()
    updateDisplay(currentOperand)
}

const deleteKey = document.querySelector('.functions.delete')
deleteKey.addEventListener('click',deleteSingle)
function deleteSingle(){
   currentOperand = (currentOperand.length > 1) ? currentOperand.slice(0,-1) : '0'
   updateDisplay(currentOperand)
}

const equalsButton = document.querySelector('.equals')
equalsButton.addEventListener('click', compute)
function compute(){
    let parsedStored = parseFloat(storedOperand)
    let parsedCurrent = parseFloat(currentOperand)
    if(chosenOp === undefined) return
    if(isNaN(parsedStored))return
    currentOperand = operate(chosenOp, parsedStored, parsedCurrent).toString()
    updateDisplay(currentOperand)
        storedOperand = undefined
}

let done = true
function handleOperations(event){
    if((storedOperand !== undefined)&&(currentOperand != '0')){
        currentOperand = displayValue.innerText
        compute(chosenOp, storedOperand, currentOperand)
    } 

    chosenOp = event.target.innerText
    if(!done) return
        storedOperand = currentOperand
        currentOperand = '0'
        done = false
}

const buttons = document.querySelectorAll('.digits')
buttons.forEach(button => button.addEventListener('click', handleButtons))


const operationButtons = document.querySelectorAll('.operations')
operationButtons.forEach(button => button.addEventListener('click', handleOperations))

function handleButtons (event)
{  
    done = true
    const buttonPressed = event.target.innerText 
    appendNumber(buttonPressed)
}

function appendNumber(num){
    if(displayValue.innerText.length >= 11) return
    if(num === '.' && num.includes('.')) return
    if((num === '0') && (currentOperand.startsWith('0'))) return
    if((num !== '0') && (currentOperand === '0')) {
         currentOperand = num
    }
    else{
        currentOperand = currentOperand.toString() + num.toString()}
        updateDisplay(currentOperand)
}

const add = (augend, addend) => augend + addend
const subtract = (minued, subtrahend) => minued - subtrahend
const multiply = (multiplicand, multiplier)  => multiplicand * multiplier
const divide = (quotient, dividend)  => quotient / dividend

function operate (operation, a, b) {
    switch(operation){
        case '+': return add(a, b)
        case '-': return subtract(a, b)
        case '÷': return divide(a, b)
        case '×': return multiply(a, b)
        default: return
    }
}

const hour = document.querySelector('.hour')
const min = document.querySelector('.min')
setInterval(() => {
    const time = new Date()
    hourString = (time.getHours() > 12) ? (time.getHours()-12).toString().padStart(2,'0') : time.getHours().toString().padStart(2,'0')
    hour.innerText = hourString
    minString = ':'+ time.getMinutes().toString().padStart(2,'0')
    min.innerText = minString
},1000)

const keyBoardButtons = window.addEventListener('keyup', getKey)


function getKey(event){
    console.log(event.key)
    if (event.key === 'Backspace'){deleteSingle()}
    if (event.key === 'Escape'){clear()}
    if ((event.key === 'Enter')||(event.key ==='=')){compute()}
    if (event.key === '%'){percent(event.key)}
    if ((event.key === '+')||(event.key === '-')||(event.key === '*')||(event.key === '/') ){
        if((storedOperand !== undefined)&&(currentOperand != '0')){
            currentOperand = displayValue.innerText
            compute(chosenOp, storedOperand, currentOperand)
        } 
    
        chosenOp = event.key
        if(!done) return
            storedOperand = currentOperand
            currentOperand = '0'
            done = false
    }

    let keyBoardBtn = isNaN(parseInt(((event.key).match(/^[0-9]/g))))
    if (keyBoardBtn) return
    keyB = event.key
    done = true
    appendNumber(keyB)
}
