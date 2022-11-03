let firstValue = 0
let secondValue = 0
let operation = null
let result = null

const firstDisplayDiv = document.querySelector(".first-display");
const secondDisplayDiv = document.querySelector(".second-display")
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete")
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const pointBtn = document.querySelector(".point")
const equalsBtn = document.querySelector(".equals")

window.addEventListener("keydown", handleKeys)
numberBtns.forEach((button) =>
    button.addEventListener("click", () => appendNumber(button.textContent))
)
operatorBtns.forEach((button) =>
    button.addEventListener("click", () => addOperation(button.textContent))
)
clearBtn.addEventListener("click", clearScreen)
deleteBtn.addEventListener("click", deleteCharacter)
pointBtn.addEventListener("click", appendPoint)
equalsBtn.addEventListener("click", evaluate)


function appendNumber(number){
    if (secondDisplayDiv.textContent.length >= 14) return
    secondDisplayDiv.textContent += number
}
function appendPoint(){
    if (secondDisplayDiv.textContent.includes(".")) return
    secondDisplayDiv.textContent += "."
}
function deleteCharacter(){
    secondDisplayDiv.textContent = secondDisplayDiv.textContent.slice(0, -1)
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
    if (!firstValue){
        return
    } else if (operation === "%"){
        firstDisplayDiv.textContent = `${firstValue} ${operation}`
        resetScreen()
        evaluate()
    } else if (firstDisplayDiv.textContent.includes("=") && secondDisplayDiv.textContent !== ""){
        firstDisplayDiv.textContent =`${firstValue} ${operation}`
        resetScreen()
    } else if (firstDisplayDiv.textContent !== ""){
        if (firstDisplayDiv.textContent.split(" ")[1] !== operator){
            operation = firstDisplayDiv.textContent.split(" ")[1]
            evaluate()
            firstDisplayDiv.textContent = `${result} ${operator}`
            resetScreen()
        }
        operation = firstDisplayDiv.textContent.split(" ")[1]
        evaluate()
        firstDisplayDiv.textContent = `${result} ${operation}`
        resetScreen()
    } else {
        firstDisplayDiv.textContent = `${firstValue} ${operation}`
        resetScreen()
    }
    
}

function evaluate() {
    firstValue = firstDisplayDiv.textContent.split(" ")[0]
    secondValue = secondDisplayDiv.textContent
    if (!operation){
        return
    } else if (operation != "%" && !secondValue) {
        return
    } else if (operation === "%"){
        secondValue = ""
    } else if (operation === "÷" && secondValue === "0"){
        firstDisplayDiv.textContent = "Can't divide by 0!"
        secondDisplayDiv.textContent = ""
        return
    } 
    result = operate(operation, firstValue, secondValue)
    secondDisplayDiv.textContent = result
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
function transformKey(key){
    if (key === "/") return "÷"
    if (key === "*") return "x"
}
function handleKeys(event){
    if (event.key >= 0){   
        appendNumber(event.key)
    }
    if(event.key === "."){
        appendPoint()
    }
    if(event.key === "+"||event.key === "-"||event.key ==="%"){
        addOperation(event.key)
    }
    if(event.key ==="*"|| event.key === "/"){
        addOperation(transformKey(event.key))
    }
    if (event.key === "="|| event.key === "Enter"){
        evaluate()
    } 
    if (event.key === "Escape"){
        clearScreen()
    }
    if (event.key ==="Delete" || event.key === "Backspace"){
        deleteCharacter()
    }
}