const display = document.getElementById('display');
const numberButtons = Array.from(document.querySelectorAll('.number'));
const operatorButtons = Array.from(document.querySelectorAll('.operator'));
const functionButtons = Array.from(document.querySelectorAll('.function'));
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const delButton = document.getElementById('del');
const ansButton = document.getElementById('ans');
const sqrtButton = document.getElementById('sqrt');
const plusMinusButton = document.getElementById('plusminus');


let currentExpression = '';
let isEvaluated = false;


document.addEventListener('keydown', event => {
  const key = event.key;
  

  if (!isNaN(key) || '+-*/%().'.includes(key)) {
    if (isEvaluated) {
      display.value = '';
      isEvaluated = false;
    }
    display.value += key;
  } else if (key === 'Enter') {

    evaluateExpression();
  } else if (key === 'Backspace') {

    display.value = display.value.slice(0, -1);
  }
});


numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (isEvaluated) {
      display.value = '';
      isEvaluated = false;
    }
    display.value += button.textContent;
    adjustCursor();
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (isEvaluated) {
      isEvaluated = false;
    }
    display.value += button.textContent;
    adjustCursor();
  });
});
function adjustCursor() {
  const cursor = document.querySelector('.cursor');
  const input = document.getElementById('display');
  cursor.style.left = `${input.scrollWidth}px`;
}



functionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent;

    switch (buttonText) {
      case 'clear':
        display.value = '';
        break;
      case 'del':
        display.value = display.value.slice(0, -1);
        break;
      case 'ans':
        break;
      case '√':
        break;
      case '+/-':
        break;
    }
  });
});


function evaluateExpression() {
  currentExpression = display.value;
  try {
    const result = eval(currentExpression);
    display.value = result;
    isEvaluated = true;
  } catch (error) {
    display.value = 'Error';
  }
}


function calculateSquareRoot() {
  if (isEvaluated) {
    isEvaluated = false;
  }
  currentExpression = 'Math.sqrt(' + display.value + ')';
  try {
    const result = eval(currentExpression);
    display.value = result;
    isEvaluated = true;
  } catch (error) {
    display.value = 'Error';
  }
}


equalsButton.addEventListener('click', evaluateExpression);


sqrtButton.addEventListener('click', calculateSquareRoot);


