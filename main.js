document.addEventListener("DOMContentLoaded", () => {
    const tiles = 16;
    const rows = 4;
    const cols = 4;
    const gridDisplay = document.querySelector(".grid");
    const scoreDisplay = document.querySelector(".score");
    var squares = [];
    var score = 0;

    function displayBoard() {
        for (let i = 0; i < tiles; i++) {
            let square = document.createElement("div");
            square.className = "tile";
            square.innerHTML = "0";
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        scoreDisplay.innerHTML = score;
    }

    function generateRandom() {
        let randomSquare = Math.floor(Math.random() * tiles);
        if (squares[randomSquare].innerHTML == "0") {
            squares[randomSquare].innerHTML = "2";
            squares[randomSquare].classList.add("zoom-in");
        } else {
            generateRandom();
        }
    }

    displayBoard();
    generateRandom();
    addColors();

    function moveRight() {
        for (let i = 0; i < tiles; i++) {
            if (i % 4 === 0) {
                let t_one = squares[i].innerHTML;
                let t_two = squares[i + 1].innerHTML;
                let t_three = squares[i + 2].innerHTML;
                let t_four = squares[i + 3].innerHTML;
                let row = [
                    parseInt(t_one),
                    parseInt(t_two),
                    parseInt(t_three),
                    parseInt(t_four),
                ];

                let filterRow = row.filter((num) => num);
                let emptyRow = Array(4 - filterRow.length).fill(0);
                let newRow = emptyRow.concat(filterRow);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    function moveLeft() {
        for (let i = 0; i < tiles; i++) {
            if (i % 4 === 0) {
                let t_one = squares[i].innerHTML;
                let t_two = squares[i + 1].innerHTML;
                let t_three = squares[i + 2].innerHTML;
                let t_four = squares[i + 3].innerHTML;
                let row = [
                    parseInt(t_one),
                    parseInt(t_two),
                    parseInt(t_three),
                    parseInt(t_four),
                ];

                let filterRow = row.filter((num) => num);
                let emptyRow = Array(4 - filterRow.length).fill(0);
                let newRow = filterRow.concat(emptyRow);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let t_one = squares[i].innerHTML;
            let t_two = squares[i + 4].innerHTML;
            let t_three = squares[i + 8].innerHTML;
            let t_four = squares[i + 12].innerHTML;
            let col = [
                parseInt(t_one),
                parseInt(t_two),
                parseInt(t_three),
                parseInt(t_four),
            ];

            let filterCol = col.filter((num) => num);
            let emptyCol = Array(4 - filterCol.length).fill(0);
            let newCol = filterCol.concat(emptyCol);

            squares[i].innerHTML = newCol[0];
            squares[i + 4].innerHTML = newCol[1];
            squares[i + 8].innerHTML = newCol[2];
            squares[i + 12].innerHTML = newCol[3];
        }
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let t_one = squares[i].innerHTML;
            let t_two = squares[i + 4].innerHTML;
            let t_three = squares[i + 8].innerHTML;
            let t_four = squares[i + 12].innerHTML;
            let col = [
                parseInt(t_one),
                parseInt(t_two),
                parseInt(t_three),
                parseInt(t_four),
            ];

            let filterCol = col.filter((num) => num);
            let emptyCol = Array(4 - filterCol.length).fill(0);
            let newCol = emptyCol.concat(filterCol);

            squares[i].innerHTML = newCol[0];
            squares[i + 4].innerHTML = newCol[1];
            squares[i + 8].innerHTML = newCol[2];
            squares[i + 12].innerHTML = newCol[3];
        }
    }

    function addRow() {
        for (let i = 0; i < tiles - 1; i++) {
            if (squares[i].innerHTML == squares[i + 1].innerHTML) {
                let add =
                    parseInt(squares[i].innerHTML) +
                    parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = add;
                squares[i + 1].innerHTML = 0;
                score += add;
                scoreDisplay.innerHTML = score;
            }
        }
    }

    function addCol() {
        for (let i = 0; i < tiles - 4; i++) {
            if (squares[i].innerHTML == squares[i + 4].innerHTML) {
                let add =
                    parseInt(squares[i].innerHTML) +
                    parseInt(squares[i + 4].innerHTML);
                squares[i].innerHTML = add;
                squares[i + 4].innerHTML = 0;
                score += add;
                scoreDisplay.innerHTML = score;
            }
        }
    }

    function controlKeys(e) {
        if (e.keyCode == 39) {
            keyRight();
        } else if (e.keyCode == 37) {
            keyLeft();
        } else if (e.keyCode == 38) {
            keyUp();
        } else if (e.keyCode == 40) {
            keyDown();
        }
    }

    document.addEventListener("keyup", controlKeys);

    function keyRight() {
        moveRight();
        addRow();
        moveRight();
        generateRandom();
        addColors();
    }

    function keyLeft() {
        moveLeft();
        addRow();
        moveLeft();
        generateRandom();
        addColors();
    }

    function keyUp() {
        moveUp();
        addCol();
        moveUp();
        generateRandom();
        addColors();
    }

    function keyDown() {
        moveDown();
        addCol();
        moveDown();
        generateRandom();
        addColors();
    }

    function addColors() {
        setTimeout(() => {
            const tiles = document.querySelectorAll(".tile");

            tiles.forEach((element) => {
                element.classList.remove("zoom-in");
            });
        }, 500);
        for (let i = 0; i < tiles; i++) {
            let tile = squares[i];
            let num = parseInt(tile.innerHTML);
            if (num == 0) tile.style.backgroundColor = "#afa192";
            else if (num == 2) tile.style.backgroundColor = "#eee4da";
            else if (num == 4) tile.style.backgroundColor = "#ede0c8";
            else if (num == 8) tile.style.backgroundColor = "#f2b179";
            else if (num == 16) tile.style.backgroundColor = "#ffcea4";
            else if (num == 32) tile.style.backgroundColor = "#e8c064";
            else if (num == 64) tile.style.backgroundColor = "#ffab6e";
            else if (num == 128) tile.style.backgroundColor = "#fd9982";
            else if (num == 256) tile.style.backgroundColor = "#ead79c";
            else if (num == 512) tile.style.backgroundColor = "#76daff";
            else if (num == 1024) tile.style.backgroundColor = "#beeaa5";
            else if (num == 2048) tile.style.backgroundColor = "#d7d4f0";
        }
    }
});
