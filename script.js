let rTotal = 0;
let buffer = "0";
let preOp;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if (isNaN(value)){
        handleSymbol(value);
    } else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            rTotal = 0;
            break;
        case '=':
            if(preOp === null){
                return
            }
            flushOp(parseInt(buffer));
            preOp = null;
            buffer = rTotal;
            rTotal = 0;
            break;
        case '←':
            if(buffer.length  === 1){
                buffer = '0';
            } else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }
    const intBuffer = parseInt(buffer);
    if(rTotal === 0){
        rTotal = intBuffer;
    } else{
        flushOp(intBuffer);
    }
    preOp = symbol;
    buffer = '0';
}

function flushOp(intBuffer){
    if(preOp === '+'){
        rTotal = rTotal+intBuffer;
    } else if(preOp === '−'){
        rTotal = rTotal-intBuffer;
    } else if(preOp === '×'){
        rTotal = rTotal*intBuffer;
    } else if(preOp === '÷'){
        rTotal = rTotal/intBuffer;
    }
}

function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString;
    } else{
        buffer = buffer+numberString;
    }
}

function init() {
    const buttons = document.querySelectorAll('.calc-button');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttonClick(button.innerText);
      });
    });
  }
  
  init();