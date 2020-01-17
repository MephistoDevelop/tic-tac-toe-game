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

    // function boardMark(clickBox) {
    //     let positionBox = parseInt(document.querySelector(".box").getAttribute("id"));
    //     // let positionBox = parseInt(e.target.getAttribute("data-position"));
    //     if (gameBoard.getBoard()[positionBox] == " ") {
    //         (counter % 2 == 0) ? player1.addMark(positionBox) : player2.addMark(positionBox);
    //         counter = countClicks();

    //         switchTurn(counter);
    //         // let message = document.getElementById("turn-text");
    //         // let isGameOver = gameOver();
            
    //     }
        
    // }

    function markEachBoard(e) {
        // let positionBox = parseInt(e.target.getAttribute("data-position"));
        let positionBox = parseInt(e.target.getAttribute("id"));
        if (gameBoard.getBoard()[positionBox] == " ") {
            (counter % 2 == 0) ? player1.addMark(positionBox) : player2.addMark(positionBox);
            counter = countClicks();

            switchTurn(counter);
            // let message = document.getElementById("turn-text");
            // let isGameOver = gameOver();
            
        }
        
    }

    const removeMark = () => {
        let boxCells = document.querySelectorAll('.box');
        for(let boxCell of boxCells) {
            boxCell.removeEventListener('click', markEachBoard);
        }
    }

    return {playGame,switchTurn,markEachBoard,removeMark,};

})();

displayController.playGame();