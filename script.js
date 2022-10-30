let firstValue = 0
let secondValue = 0
let operation = null

const firstDisplayDiv = document.querySelector(".first-display");
const secondDisplayDiv = document.querySelector(".second-display")
const clearBtn = document.querySelector(".clear");
const negBtn = document.querySelector(".neg")
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const pointBtn = document.querySelector(".point")
const equalsBtn = document.querySelector(".equals")


numberBtns.forEach((button) =>
    button.addEventListener("click", () => appendNumber(button.textContent))
)
operatorBtns.forEach((button) =>
    button.addEventListener("click", () => addOperation(button.textContent))
)
clearBtn.addEventListener("click", clearScreen)
negBtn.addEventListener("click", toggleNegSign)
pointBtn.addEventListener("click", appendPoint)
equalsBtn.addEventListener("click", evaluate)

function appendNumber(number){
    secondDisplayDiv.textContent += number
}
function appendPoint(){
    if (secondDisplayDiv.textContent.includes(".")) return
    secondDisplayDiv.textContent += "."
}
function toggleNegSign(){
    if (secondDisplayDiv.textContent.includes("-")){
        secondDisplayDiv.textContent = secondDisplayDiv.textContent.slice(1)
        return
    } 
    secondDisplayDiv.textContent = "-" + secondDisplayDiv.textContent
}

function resetScreen() {
    secondDisplayDiv.textContent = ""
}
function clearScreen() {
    firstDisplayDiv.textContent = ""
    secondDisplayDiv.textContent = ""
    operation = null
}

function addOperation(operator){
    firstValue = secondDisplayDiv.textContent
    operation = operator
    if (operation === "%") {
        evaluate()
    }
    firstDisplayDiv.textContent = `${firstValue} ${operation}`
    resetScreen()
}

function evaluate() {
    secondValue = secondDisplayDiv.textContent
    if (!operation){
        return
    } else if (operation != "%" && !secondValue) {
        return
    } else if (operation === "÷" && secondValue === "0"){
        firstDisplayDiv.textContent = "Can't divide by 0!"
        secondDisplayDiv.textContent = ""
        return
    }
    secondDisplayDiv.textContent = operate(operation, firstValue, secondValue)
    firstDisplayDiv.textContent = `${firstValue} ${operation} ${secondValue} =`
}

function operate (operator, num1, num2) {
    num1 = parseFloat(num1)
    num2 = parseFloat(num2)
    switch (operator) {
        case "+":
            return add(num1, num2)
        case "-":
            return subtract(num1, num2)
        case "x":
            return multiply(num1, num2)
        case "÷":
            return divide(num1, num2)
        case "%":
            return percentage(num1)
        default: 
            return null
    }
}

function add(num1, num2){
    return num1 + num2
}
function subtract(num1, num2){
    return num1 - num2
}
function divide(num1, num2){
    return num1 / num2
}
function multiply(num1, num2){
    return num1 * num2
}
function percentage(num1){
    return num1 / 100
}