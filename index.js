const add = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => {
  if (b === 0) {
    alert('Cannot divide by 0')
    clearEverything()
    return null
  }
  return a / b
}
const modulus = (a, b) => a % b

let firstNum = null
let operator = ''
let calculated = false
let period = false

const display = document.querySelector('.display')
const previousNumber = document.querySelector('.previousNumber')
const periodButton = document.querySelector('#period')

const clearDisplay = () => {
  display.textContent = ''
  period = false
  disablePeriod(false)
}

const clearEverything = () => {
  clearDisplay()
  previousNumber.textContent = ''
  operator = ''
  calculated = false
  firstNum = null
}

const addNumber = (value) => {
  if (calculated && previousNumber.textContent == '') {
    clearEverything()
  }
  display.textContent += value
}

const backspace = () => {
  calculated = false
  if (display.textContent.slice(-1) === '.') {
    period = false
    disablePeriod(false)
  }
  display.textContent = display.textContent.slice(0, -1)
}

const setPeriod = () => {
  if (!period && display.textContent !== '') {
    period = true
    display.textContent += '.'
    disablePeriod(true)
  }
}

const disablePeriod = (disable) => {
  if (disable) {
    periodButton.disabled = true
    periodButton.classList.add('disabled')
  } else {
    periodButton.disabled = false
    periodButton.classList.remove('disabled')
  }
}

const setOperator = (op) => {
  if (display.textContent === '' || display.textContent === '.') return

  if (firstNum !== null && !calculated) {
    operate()
  } else {
    firstNum = parseFloat(display.textContent)
  }

  operator = op
  previousNumber.textContent = `${firstNum} ${op}`
  clearDisplay()
}

const toFixedIfNecessary = (value) => +parseFloat(value).toFixed(6)

const operate = () => {
  if (
    display.textContent === '' ||
    display.textContent === '.' ||
    firstNum === null
  )
    return
  const secondNum = parseFloat(display.textContent)
  let result
  switch (operator) {
    case '+':
      result = add(firstNum, secondNum)
      break
    case '-':
      result = subtract(firstNum, secondNum)
      break
    case '*':
      result = multiply(firstNum, secondNum)
      break
    case '/':
      result = divide(firstNum, secondNum)
      if (result === null) return // division by 0
      break
    case '%':
      result = modulus(firstNum, secondNum)
      break
    default:
      console.log('Invalid operator')
      return
  }

  display.textContent = toFixedIfNecessary(result)
  previousNumber.textContent = ''
  operator = ''
  calculated = true
  firstNum = result
}
