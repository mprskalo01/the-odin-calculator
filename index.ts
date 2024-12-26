// Declare the functions as global
declare global {
  interface Window {
    addNumber: (value: string | number) => void;
    setOperator: (op: string) => void;
    clearEverything: () => void;
    backspace: () => void;
    setPeriod: () => void;
    operate: () => void;
  }
}
const add = (a: number, b: number): number => a + b;
const subtract = (a: number, b: number): number => a - b;
const modulus = (a: number, b: number): number => a % b;
const multiply = (a: number, b: number): number => a * b;
const divide = (a: number, b: number): number | null => {
  if (b === 0) {
    alert('Cannot divide by 0');
    clearEverything();
    return null;
  }
  return a / b;
};

let firstNum: number | null = null;
let operator = '';
let calculated = false;
let period = false;

const display = document.querySelector('.display') as HTMLElement;
const previousNumber = document.querySelector('.previousNumber') as HTMLElement;
const periodButton = document.querySelector('#period') as HTMLButtonElement;

if (!display || !previousNumber || !periodButton) {
  throw new Error('Required DOM elements not found');
}

const clearDisplay = (): void => {
  display.textContent = '';
  period = false;
  disablePeriod(false);
};

const clearEverything = (): void => {
  clearDisplay();
  previousNumber.textContent = '';
  operator = '';
  calculated = false;
  firstNum = null;
};

const addNumber = (value: string | number): void => {
  if (calculated && previousNumber.textContent === '') {
    clearEverything();
  }
  display.textContent = `${display.textContent ?? ''}${value}`;
};

const backspace = (): void => {
  calculated = false;
  const currentText = display.textContent ?? '';
  if (currentText.slice(-1) === '.') {
    period = false;
    disablePeriod(false);
  }
  display.textContent = currentText.slice(0, -1);
};

const setPeriod = (): void => {
  const currentText = display.textContent ?? '';
  if (!period && currentText !== '') {
    period = true;
    display.textContent = `${currentText}.`;
    disablePeriod(true);
  }
};

const disablePeriod = (disable: boolean): void => {
  if (disable) {
    periodButton.disabled = true;
    periodButton.classList.add('disabled');
  } else {
    periodButton.disabled = false;
    periodButton.classList.remove('disabled');
  }
};

const setOperator = (op: string): void => {
  const currentText = display.textContent ?? '';
  if (currentText === '' || currentText === '.') return;

  if (firstNum !== null && !calculated) {
    operate();
  } else {
    firstNum = parseFloat(currentText);
  }
  operator = op;
  previousNumber.textContent = `${firstNum} ${op}`;
  clearDisplay();
};

const toFixedIfNecessary = (value: number): number =>
  +parseFloat(value.toString()).toFixed(6);

const operate = (): void => {
  const currentText = display.textContent ?? '';
  if (currentText === '' || currentText === '.' || firstNum === null) return;

  const secondNum = parseFloat(currentText);
  let result: number;

  switch (operator) {
    case '+':
      result = add(firstNum, secondNum);
      break;
    case '-':
      result = subtract(firstNum, secondNum);
      break;
    case '*':
      result = multiply(firstNum, secondNum);
      break;
    case '/': {
      const divResult = divide(firstNum, secondNum);
      if (divResult === null) return; // division by 0
      result = divResult;
      break;
    }
    case '%':
      result = modulus(firstNum, secondNum);
      break;
    default:
      console.log('Invalid operator');
      return;
  }

  display.textContent = toFixedIfNecessary(result).toString();
  previousNumber.textContent = '';
  operator = '';
  calculated = true;
  firstNum = result;
};

window.addNumber = addNumber;
window.setOperator = setOperator;
window.clearEverything = clearEverything;
window.backspace = backspace;
window.setPeriod = setPeriod;
window.operate = operate;

export {};
