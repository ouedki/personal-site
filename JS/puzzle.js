(function () {

    var sequence = "123456780";
    var newTiles;
    var tiles = document.getElementsByClassName('tile');
    var random;
    var arr = [];
    console.log(arr);

    //generate unique random numbers btw 0 and 8
    var generateRandom = function(length) {
        for(var i=0; i<length; i++) {
            do
                random = Math.floor(Math.random() * (9));
            while(arr.indexOf(random) !== -1);
            arr[i] = random;
        }
        console.log(arr);
        return arr;
    };

    //find the 0 square and change its background to black
    var getEmptyBox = function () {
        for(var i=0; i<tiles.length; i++) {
            if (tiles[i].innerHTML==0){
                $(tiles[i]).addClass('black')
            }
        }
    };

    //click event listener to start the game
    $('#play').click(function () {
        $('.tile').removeClass('black');
        arr = [];
        generateRandom(9);
        for (var i = 0; i<tiles.length; i++) {
            $(tiles[i]).html(arr[i]);
        }
        getEmptyBox ();
    });

    //check winning sequence
    var checkWin = function () {
        newTiles = $('.tile').text();
        console.log(newTiles);
        if (sequence == newTiles){
            setTimeout(function () {
                sweetAlert("Yaay!!!!!", "Congrats, You Win!!!", "success" );
            }, 500)
        }
    };

    //Restrict square moves with 2 options
    var restrictTwoMoves = function(square, x, y){
        if (tiles[x].innerHTML == 0) {
            $(square).addClass('black');
            $(tiles[x]).removeClass('black');
            $(tiles[x]).html($(square).html());
            $(square).text('0');
            checkWin();
        } else if (tiles[y].innerHTML == 0) {
            $(square).addClass('black');
            $(tiles[y]).removeClass('black');
            $(tiles[y]).html($(square).html());
            $(square).text('0');
            checkWin();
        }
    };

    //Restrict square moves with 3 options
    var restrictThreeMoves = function(square, x, y, z){
        if (tiles[x].innerHTML == 0) {
            $(square).addClass('black');
            $(tiles[x]).removeClass('black');
            $(tiles[x]).html($(square).html());
            $(square).text('0');
            checkWin();
        } else if (tiles[y].innerHTML == 0) {
            $(square).addClass('black');
            $(tiles[y]).removeClass('black');
            $(tiles[y]).html($(square).html());
            $(square).text('0');
            checkWin();
        } else if (tiles[z].innerHTML == 0) {
            $(square).addClass('black');
            $(tiles[z]).removeClass('black');
            $(tiles[z]).html($(square).html());
            $(square).text('0');
            checkWin();
        }
    };

    //Restrict square moves with 4 options
    var restrictFourMoves = function(square, x, y, w, z){
        if (tiles[x].innerHTML == 0) {
            $(square).addClass('black');
            $(tiles[x]).removeClass('black');
            $(tiles[x]).html($(square).html());
            $(square).text('0');
            checkWin();
        } else if (tiles[y].innerHTML == 0) {
            $(square).addClass('black');
            $(tiles[y]).removeClass('black');
            $(tiles[y]).html($(square).html());
            $(square).text('0');
            checkWin();
        } else if (tiles[w].innerHTML == 0) {
            $(square).addClass('black');
            $(tiles[w]).removeClass('black');
            $(tiles[w]).html($(square).html());
            $(square).text('0');
            checkWin();
        } else if (tiles[z].innerHTML == 0) {
            $(square).addClass('black');
            $(tiles[z]).removeClass('black');
            $(tiles[z]).html($(square).html());
            $(square).text('0');
            checkWin();
        }
    };


    //Click event on each square
    $(tiles[0]).click(function () {
        restrictTwoMoves(this, 1, 3)
    });

    $(tiles[1]).click(function () {
        restrictThreeMoves(this, 0, 2, 4)
    });

    $(tiles[2]).click(function () {
        restrictTwoMoves(this, 1, 5)
    });

    $(tiles[3]).click(function () {
        restrictThreeMoves(this, 0, 4, 6);
    });

    $(tiles[4]).click(function () {
        restrictFourMoves(this, 1, 3, 5, 7)
    });

    $(tiles[5]).click(function () {
        restrictThreeMoves(this, 2, 4, 8)
    });

    $(tiles[6]).click(function () {
        restrictTwoMoves(this, 3, 7)
    });

    $(tiles[7]).click(function () {
        restrictThreeMoves(this, 4, 6, 8)
    });

    $(tiles[8]).click(function () {
        restrictTwoMoves(this, 5, 7)
    });

})();