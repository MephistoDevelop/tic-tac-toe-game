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
