class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation  = undefined;
    }
    
    clearDisplay() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation  = undefined;
    }

    deleteSingleEntry() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber (number) {
        if(number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if(this.previousOperand !== '') {
            this.computeResult();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    computeResult () {
        let computedResult;
        const prevComputedResultAsNumber = parseFloat(this.previousOperand);
        const currentComputedResultAsNumber = parseFloat(this.currentOperand);
        if (isNaN(prevComputedResultAsNumber) || isNaN(currentComputedResultAsNumber)) {
            return;
        }
        switch (this.operation) {
            case '+':
                computedResult = prevComputedResultAsNumber + currentComputedResultAsNumber;
                break;
            case '-':
                computedResult = prevComputedResultAsNumber - currentComputedResultAsNumber;
                break;
            case '*':
                computedResult = prevComputedResultAsNumber * currentComputedResultAsNumber;
                break;
            case '÷':
                computedResult = prevComputedResultAsNumber / currentComputedResultAsNumber;
                break;
            default:
                return;
        }

        this.currentOperand = computedResult;
        this.operation = undefined;
        this.previousOperand = '';

    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        }else {
            this.previousOperandTextElement.innerText = '';
        }
        
    }
}


const numberedButtons = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operations]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberedButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    });
});

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    });
});

equalsButton.addEventListener('click', button => {
    calculator.computeResult();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clearDisplay();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.deleteSingleEntry();
    calculator.updateDisplay();
});


