(function () {
    "use strict";
    var leftDisplay = document.getElementById("leftDisplay");
    var midDisplay = document.getElementById("midDisplay");
    var rightDisplay = document.getElementById("rightDisplay");
    var numbersButton = document.getElementsByClassName("digit");
    var operatorButton = document.getElementsByClassName("operator");
    var equalButton = document.getElementById("equals");
    var clearButton = document.getElementById("clear");
    var powerButton = document.getElementById("power");
    var sqrtButton = document.getElementById("sqrt");
    var plusMinButton = document.getElementById("plusMin");
    var percentageButton = document.getElementById("percentage");
    var expButton = document.getElementById("ex");
    var decimalButton = document.getElementById("decimal");
    var num;
    var decimal;
    var counter = 0;

    //display number in left and right display
    var display = function () {
        num = this.innerHTML;
        if (midDisplay.value == '') {
            leftDisplay.value += num;
        } else {
            rightDisplay.value += num;
        }

    };

    //display operators in the mid display
    var displayMid = function () {
        counter = 0;
        console.log(counter);
        num = this.innerHTML;
        midDisplay.value = num;

    };

    //add event listeners to all number buttons
    for (var i = 0; i < numbersButton.length; i++) {
        numbersButton[i].addEventListener('click', display)

    }

    //add event listeners to all operator buttons
    for (var j = 0; j < operatorButton.length; j++) {
        operatorButton[j].addEventListener('click', displayMid)
    }

    //add arithmetic operations
    var opEqual = function () {

        var leftNum = parseFloat(leftDisplay.value);
        var rightNum = parseFloat(rightDisplay.value);
        var result;
        var operator = midDisplay.value;
        switch (operator) {
            case "+":
                result = (leftNum + rightNum);
                break;
            case "-":
                result = (leftNum - rightNum);
                break;
            case "x":
                result = (leftNum * rightNum);
                break;
            case "/":
                result = (leftNum / rightNum);
                break;
            default:
                result = ("Err0r");
        }

        leftDisplay.value = result;
        rightDisplay.value = "";
        midDisplay.value = "";
    };
    equalButton.addEventListener("click", opEqual);

    //clear all displays
    var clearDisplay = function () {
        counter = 0;
        rightDisplay.value = "";
        midDisplay.value = "";
        leftDisplay.value = "";
    };
    clearButton.addEventListener("click", clearDisplay);

    //add power button
    var power = function () {
        var x = leftDisplay.value;
        x = Math.pow(x, 2);
        leftDisplay.value = x;
    };
    powerButton.addEventListener("click", power);

    //add square root button
    var sqrt = function () {
        var x = leftDisplay.value;
        x = Math.sqrt(x);
        leftDisplay.value = x;
    };
    sqrtButton.addEventListener("click", sqrt);

    //add plus minus button
    var plusMin = function () {
        if ((leftDisplay.value !== '') && (rightDisplay.value == '')) {
            leftDisplay.value *= -1;
        }
        if ((rightDisplay.value !== '')) {
            rightDisplay.value *= -1;
        }
    };
    plusMinButton.addEventListener("click", plusMin);

    //add percentage button
    var percentage = function () {
        if ((leftDisplay.value !== '') && (rightDisplay.value == '')) {
            var m = parseFloat(leftDisplay.value);
            m /= 100;
            leftDisplay.value = m;
        }
        if (rightDisplay.value !== '') {
            var n = parseFloat(rightDisplay.value);
            n /= 100;
            rightDisplay.value = n;
        }
    };
    percentageButton.addEventListener("click", percentage);

    //add exp button
    var exp = function () {
        var x = leftDisplay.value;
        x = Math.exp(x);
        leftDisplay.value = x;
    };
    expButton.addEventListener("click", exp);

    //decimal check
    var decimalCheck = function () {
        counter += 1;
        console.log(counter);
        decimal = this.innerHTML;
        if ((rightDisplay.value == '') && (midDisplay.value == '')) {
            if (counter > 1) {
                console.log("no");
            } else {
                leftDisplay.value += decimal;
                console.log("yes");
            }
        }

        if ((leftDisplay.value !== '') && (midDisplay.value !== '')) {
            if (counter > 1) {
                console.log("no");
            } else {
                rightDisplay.value += decimal;
            }

        }
    };
    decimalButton.addEventListener("click", decimalCheck);

})();
