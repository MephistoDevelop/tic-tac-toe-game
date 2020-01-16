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
 

const displayController = (()=>{

})