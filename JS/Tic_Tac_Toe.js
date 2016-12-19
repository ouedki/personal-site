 var turn;
    var winner;

    function startGame() {
        for (var i = 1; i <= 9; i++) {
            clearBox(i);
        }
        turn = "X";
        if (Math.random() < 0.5) {
            turn = "O"
        }
        winner = null;

        setMessage(turn + " gets to start.")
    }

    function setMessage(msg) {
        document.getElementById("message").innerHTML = msg
    }

    function nextMove(box) {
        if (winner != null) {
            setMessage(winner + " already won the game.")
        } else if (box.innerHTML == "") {
            box.innerHTML = turn;
            switchTurn();
        } else {
            setMessage("This box is already used");
        }
    }

    function switchTurn() {
        if (checkWinner(turn)) {
            setMessage("Congratulations, " + turn + "! You Win!");
            winner = turn;
        } else if (turn == "X") {
            turn = "O";
            setMessage("It's " + turn + " 's turn")
        } else {
            turn = "X";
            setMessage("It's " + turn + " 's turn")
        }
    }

    function checkCombinations(a, b, c, move) {
        var result = false;
        if (getBox(a) == move && getBox(b) == move && getBox(c) == move) {
            result = true;
        }
        return result;
    }

    function getBox(number) {
        return document.getElementById("box" + number).innerHTML;
    }

    function checkWinner(move) {
        var res = false;
        if (checkCombinations(1, 2, 3, move) ||
            checkCombinations(4, 5, 6, move) ||
            checkCombinations(7, 8, 9, move) ||
            checkCombinations(1, 4, 7, move) ||
            checkCombinations(2, 5, 8, move) ||
            checkCombinations(3, 6, 9, move) ||
            checkCombinations(1, 5, 9, move) ||
            checkCombinations(3, 5, 7, move)) {
            res = true;
        }
        return res
    }

    function clearBox(number) {
        return document.getElementById("box" + number).innerHTML = "";
    }
