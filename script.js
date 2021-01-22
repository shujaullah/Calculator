const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
var currentOperand
var previousOperand
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  
    compute() {
        let result

        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)

        if(isNaN(prev) || isNaN(curr)) return

        switch(this.operation){
            case '+':
                result = prev + curr  
                break
            case '-':
                    result = prev - curr  
                    break
             case '/':
                    result = prev / curr  
                    break
            case '*':
                result = prev * curr  
                break
            default:
                return

            
            }

            this.currentOperand = result
            this.operation= undefined
            this.previousOperand=''

      
    }

    
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
      }
  
    
  
    updateDisplay() {

     this.previousOperandTextElement.innerText = this.previousOperand
     this.currentOperandTextElement.innerText = this.currentOperand
    
      
  }
}
  


  
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  

  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })

  equalsButton.addEventListener('click', button => {
      calculator.compute()
      calculator.updateDisplay()
  })
  

  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })
