export class Calculator {
  private display: HTMLElement;
  private previousNumber: HTMLElement;
  private periodButton: HTMLButtonElement;
  private firstNum: number | null = null;
  private operator: string = '';
  private calculated: boolean = false;
  private period: boolean = false;

  constructor() {
    // Initialize DOM elements
    this.display = document.querySelector('.display') as HTMLElement;
    this.previousNumber = document.querySelector(
      '.previousNumber'
    ) as HTMLElement;
    this.periodButton = document.querySelector('#period') as HTMLButtonElement;

    if (!this.display || !this.previousNumber || !this.periodButton) {
      throw new Error('Required DOM elements not found');
    }

    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    document.querySelectorAll('[data-number]').forEach(button => {
      button.addEventListener('click', e => {
        const target = e.target as HTMLButtonElement;
        this.addNumber(target.dataset.number as string);
      });
    });

    document.querySelectorAll('[data-operator]').forEach(button => {
      button.addEventListener('click', e => {
        const target = e.target as HTMLButtonElement;
        this.setOperator(target.dataset.operator as string);
      });
    });

    document.querySelectorAll('[data-action]').forEach(button => {
      button.addEventListener('click', e => {
        const target = e.target as HTMLButtonElement;
        const action = target.dataset.action;

        switch (action) {
          case 'clear':
            this.clearEverything();
            break;
          case 'backspace':
            this.backspace();
            break;
          case 'period':
            this.setPeriod();
            break;
          case 'equals':
            this.operate();
            break;
        }
      });
    });
  }

  private add(a: number, b: number): number {
    return a + b;
  }

  private subtract(a: number, b: number): number {
    return a - b;
  }

  private multiply(a: number, b: number): number {
    return a * b;
  }

  private divide(a: number, b: number): number | null {
    if (b === 0) {
      alert('Cannot divide by 0');
      this.clearEverything();
      return null;
    }
    return a / b;
  }

  private modulus(a: number, b: number): number {
    return a % b;
  }

  private clearDisplay(): void {
    this.display.textContent = '';
    this.period = false;
    this.disablePeriod(false);
  }

  private clearEverything(): void {
    this.clearDisplay();
    this.previousNumber.textContent = '';
    this.operator = '';
    this.calculated = false;
    this.firstNum = null;
  }

  private addNumber(value: string | number): void {
    this.calculated = false;
    if (this.calculated && !this.previousNumber.textContent) {
      this.clearEverything();
    }

    this.display.textContent = `${this.display.textContent ?? ''}${value}`;
  }

  private backspace(): void {
    this.calculated = false;
    const currentText = this.display.textContent ?? '';

    if (currentText.slice(-1) === '.') {
      this.period = false;
      this.disablePeriod(false);
    }

    this.display.textContent = currentText.slice(0, -1);
  }

  private setPeriod(): void {
    const currentText = this.display.textContent ?? '';
    if (!this.period && currentText !== '') {
      this.period = true;
      this.display.textContent = `${currentText}.`;
      this.disablePeriod(true);
    }
  }

  private disablePeriod(disable: boolean): void {
    this.periodButton.disabled = disable;
    if (disable) {
      this.periodButton.classList.add('disabled');
    } else {
      this.periodButton.classList.remove('disabled');
    }
  }

  private setOperator(op: string): void {
    const currentText = this.display.textContent ?? '';
    if (currentText === '' || currentText === '.') return;

    if (this.firstNum !== null && !this.calculated) {
      this.operate();
    } else {
      this.firstNum = parseFloat(currentText);
    }

    this.operator = op;
    this.previousNumber.textContent = `${this.firstNum} ${op}`;
    this.clearDisplay();
  }

  private toFixedIfNecessary(value: number): number {
    return +parseFloat(value.toString()).toFixed(6);
  }

  private operate(): void {
    const currentText = this.display.textContent ?? '';
    if (currentText === '' || currentText === '.' || this.firstNum === null)
      return;

    const secondNum = parseFloat(currentText);
    let result: number;

    switch (this.operator) {
      case '+':
        result = this.add(this.firstNum, secondNum);
        break;
      case '-':
        result = this.subtract(this.firstNum, secondNum);
        break;
      case '*':
        result = this.multiply(this.firstNum, secondNum);
        break;
      case '/': {
        const divResult = this.divide(this.firstNum, secondNum);
        if (divResult === null) return;
        result = divResult;
        break;
      }
      case '%':
        result = this.modulus(this.firstNum, secondNum);
        break;
      default:
        console.log('Invalid operator');
        return;
    }

    this.display.textContent = this.toFixedIfNecessary(result).toString();
    this.previousNumber.textContent = '';
    this.operator = '';
    this.calculated = true;
    this.firstNum = result;
  }
}
