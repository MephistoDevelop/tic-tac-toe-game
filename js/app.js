const Player = (name,mark) => {

    const getName = () => name;
    const getMark = () => mark;
    const addMark = (position) => {
        gameBoard.getBoard()[position] = mark;
        let boxPosition = document.getElementById(`${position}` );
        boxPosition.textContent = gameBoard.getBoard()[position];
    }

    return {getName,getMark,addMark,};
}

const gameBoard = (() => {
   const board = [];

   for (let i = 0 ; i < 9; i++) {
       board[i] = " ";
   }

   const getBoard = () => board;

   const resetBoard = () => {
       for (let i = 0; i < 9; i++) {
           board[i] = " ";
           let boxPosition = document.getElementById(`${i}`);
           boxPosition.textContent = board[i];
       }
   }

   return {getBoard,resetBoard,};
})();


const displayController = (() => {
    let player1 = Player("Ansar", "X");
    let player2 = Player("Memphisto", "O");
    let countClicks = clickCounter();
    let counter = 0;
    let endgame = false;

    function clickCounter() {
        let counter = 0;
        return() => {
            counter++;
            return counter;
        }
    };

    function resetClicks() {
        countClicks = clickCounter();
        counter = 0;
        switchTurn(counter);
    }

    const playGame = () => {
        let boxCells = document.querySelectorAll('.box');
        for(let boxCell of boxCells) {
            boxCell.addEventListener('click', markEachBoard);
        }
    }

    const switchTurn = (counter) => {
        let message = document.getElementById("messages");
        if (counter % 2 == 0){
            message.innerText = `${player1.getName()}'s Turn`;
        }else {
            message.innerText = `${player2.getName()}'s Turn`;
        }
    }

    function markEachBoard(e) {
        // let positionBox = parseInt(e.target.getAttribute("data-position"));
        let positionBox = parseInt(e.target.getAttribute("id"));
        if (gameBoard.getBoard()[positionBox] == " ") {
            (counter % 2 == 0) ? player1.addMark(positionBox) : player2.addMark(positionBox);
            counter = countClicks();

            switchTurn(counter);
            // if (counter == 9) {
            //     document.getElementById("turn-text").innerText = "draw game!"
            // }
            let message = document.getElementById("messages");
            winning(gameBoard.getBoard(), player1.getMark() || player2.getMark())
            if( endgame === true) {
                winMessage(player1.getName() || player2.getName());
                removeMark(e);
            }
            
        }
        
    }

    const removeMark = () => {
        let boxCells = document.querySelectorAll('.box');
        for(let boxCell of boxCells) {
            boxCell.removeEventListener('click', markEachBoard);
        }
    }

    function winMessage(name) {
        document.getElementById('messages').innerText = `${name} is winner!`
    }

    const winning = (board,symbol   ) => {

        const win = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        win.forEach(element => {
            if (
            board[element[0]] === symbol &&
            board[element[1]] === symbol &&
            board[element[2]] === symbol
            ) {
                endgame = true
            }
        })
    }

    

    function draw() {
        counter = countClicks();
        if (counter == 9 && !endgame) {
            document.getElementById("messages").innerText = "draw game!"
            endgame = true;
        }
    }

    return {playGame,switchTurn,markEachBoard,removeMark,};

})();

displayController.playGame();