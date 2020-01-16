// import * as Board from './board.js';

// () => {
//   console.log("I'm main");
// };
//Player module

const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    const addMark = (position) => {
        gameBoard.getBoard()[position] = mark;
        let boxPosition = document.getElementById(`${position}`);
        boxPosition.textContent =gameBoard.getBoard()[position];
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
 
//display controller
const displayController = (()=>{
    let player1 = Player("Ansar", "X");
    let player2 = Player("Memphisto", "O");
    let countClicks = clickCounter();
    let counter = 0;

    const clickCounter = () => {
        let counter = 0;
        return() => {
            counter++;
            return counter;
        }
    };

    const resetClicks = () => {
        countClicks = clickCounter();
        counter = 0;
        switchTurn(counter);
    };

    const playGame = () => {
        let boxCells = document.querySelector('.box');
        for (let boxCell of boxCells) {
            boxCells.addEventListener('click', markEachBoard);
        }
    }

    const switchTurn = () => {
        let message = document.getElementById("messages");
        if (counter % 2 == 0){
            message.innerText = `${player1.getName()}'s Turn`;
        }else {
            message.innerText = `${player2.getName()}'s Turn`;
        }
    }



    const markEachBoard = () => {

    };

    const removeEventMark = () => {
        let boxCells = document.querySelector('.box');
        for(let boxCell of boxCells) {
            boxCell.removeEventListener('click', markEachBoard);
        }
    }

    return {clickCounter,resetClicks,playGame,switchTurn,markEachBoard,removeEventMark,};
})