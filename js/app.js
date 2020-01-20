const gameBoard = (() => {
  const board = [];

  for (let i = 0; i < 9; i += 1) {
    board[i] = ' ';
  }

  const getBoard = () => board;

  const resetBoard = () => {
    for (let i = 0; i < 9; i += 1) {
      board[i] = ' ';
      const boxPosition = document.getElementById(`${i}`);
      boxPosition.textContent = board[i];
    }
  };

  return { getBoard, resetBoard };
})();

const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;
  const addMark = (position) => {
    gameBoard.getBoard()[position] = mark;
    const boxPosition = document.getElementById(`${position}`);
    boxPosition.textContent = gameBoard.getBoard()[position];
  };

  return { getName, getMark, addMark };
};

const displayController = (() => {
  const player1 = Player('Ansar', 'X');
  const player2 = Player('Memphisto', 'O');
  const msg = document.getElementById('messages');
  const boxCells = document.querySelectorAll('.box');
  function clickCounter() {
    let counter = 0;
    return () => {
      counter += 1;
      return counter;
    };
  }

  const countClicks = clickCounter();
  let counter = 0;
  let endgame = false;
  const beep = new Audio();
  beep.src = 'http://freesoundeffect.net/sites/default/files/sci-fi-beepelectric-153-sound-effect-36810303.mp3';

  const switchTurn = (counter) => {
    if (counter % 2 === 0) {
      msg.innerText = `${player1.getName()}'s Turn`;
    } else {
      msg.innerText = `${player2.getName()}'s Turn`;
    }
  };

  const winning = (board, symbol) => {
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

    win.forEach((element) => {
      if (
        board[element[0]] === symbol
        && board[element[1]] === symbol
        && board[element[2]] === symbol
      ) {
        endgame = true;
      }
    });
  };

  function winMessage(name) {
    msg.innerText = `${name} is winner!`;
  }

  function markEachBoard(e) {
    const positionBox = parseInt(e.target.getAttribute('id'), 10);
    if (gameBoard.getBoard()[positionBox] === ' ') {
      counter % 2 === 0 ? player1.addMark(positionBox) : player2.addMark(positionBox);
      counter = countClicks();

      switchTurn(counter);
      const mark = counter % 2 === 0 ? player2.getMark() : player1.getMark();
      winning(gameBoard.getBoard(), mark);
      if (endgame === true) {
        const namePlayer = counter % 2 === 0 ? player2.getName() : player1.getName();
        winMessage(namePlayer);
        beep.src = 'http://freesoundeffect.net/sites/default/files/menu-sfx--wrong---invalid-selection---7-sound-effect-9982300.mp3';
      }

      if (counter === 9 && endgame !== true) {
        msg.innerText = 'draw game!';
        endgame = true;
        beep.src = 'http://freesoundeffect.net/sites/default/files/menu-sfx--wrong---invalid-selection---7-sound-effect-9982300.mp3';
      }

      if (endgame === true) {
        for (const boxCell of boxCells) {
          boxCell.removeEventListener('click', markEachBoard);
        }
      }
    }
  }
   
  const soundClick = () => {
    beep.play();
  };

  const playGame = () => {
    for (const boxCell of boxCells) {
      boxCell.addEventListener('click', markEachBoard);
      boxCell.addEventListener('click', soundClick);
    }
  };

  const newGame = () => {
    const newBtn = document.getElementById('button');
    newBtn.addEventListener('click', () => {
      window.location.reload();
    });
  };

  return { playGame, switchTurn, markEachBoard, winning, newGame, };
})();

const gameController = (() => {
  const gameActions = () => {
    displayController.playGame();
    displayController.newGame();
  };
  return { gameActions };
})();

gameController.gameActions();
