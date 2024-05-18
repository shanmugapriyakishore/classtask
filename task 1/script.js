function clearDisplay() {
    document.getElementsByName('display')[0].value = '';
}

function deleteLast() {
    var currentValue = document.getElementsByName('display')[0].value;
    document.getElementsByName('display')[0].value = currentValue.slice(0, -1);
}


function appendDot() {
    document.getElementsByName('display')[0].value += '.';
}


function appendOperator(operator) {
    document.getElementsByName('display')[0].value += operator;
}


function appendDigit(digit) {
    document.getElementsByName('display')[0].value += digit;
}


function evaluateExpression() {
    var expression = document.getElementsByName('display')[0].value;
    var result = eval(expression);
    document.getElementsByName('display')[0].value = result;
}

