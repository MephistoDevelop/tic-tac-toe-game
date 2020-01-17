const gameBoard = (() => {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board[i] = ' ';
  }

  const getBoard = () => board;

  const resetBoard = () => {
    for (let i = 0; i < 9; i += 1) {
      board[i] = ' ';
      let boxPosition = document.getElementById(`${i}`);
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
  function clickCounter() {
    let counter = 0;
    return () => {
      counter += 1;
      return counter;
    };
    let countClicks = clickCounter();
    let counter = 0;
    let endgame = false;
    const beep = new Audio();
    beep.src =
      'http://freesoundeffect.net/sites/default/files/sci-fi-beepelectric-153-sound-effect-36810303.mp3';
  }

  function resetClicks() {
    countClicks = clickCounter();
    counter = 0;
    switchTurn(counter);
  }

  const playGame = () => {
    let boxCells = document.querySelectorAll('.box');
    for (let boxCell of boxCells) {
      boxCell.addEventListener('click', markEachBoard);
      boxCell.addEventListener('click', soundClick);
    }
  };

  function soundClick() {
    beep.play();
  }
  const switchTurn = (counter) => {
    let message = document.getElementById('messages');
    if (counter % 2 === 0) {
      message.innerText = `${player1.getName()}'s Turn`;
    } else {
      message.innerText = `${player2.getName()}'s Turn`;
    }
  };

  function markEachBoard(e) {
    let positionBox = parseInt(e.target.getAttribute('id'));
    if (gameBoard.getBoard()[positionBox] === ' ') {
      counter % 2 === 0
        ? player1.addMark(positionBox)
        : player2.addMark(positionBox);
      counter = countClicks();

      switchTurn(counter);
      let mark = counter % 2 === 0 ? player2.getMark() : player1.getMark();
      winning(gameBoard.getBoard(), mark);
      if (endgame === true) {
        let namePlayer =
          counter % 2 === 0 ? player2.getName() : player1.getName();
        winMessage(namePlayer);
        removeMark(e);
        beep.src =
          'http://freesoundeffect.net/sites/default/files/menu-sfx--wrong---invalid-selection---7-sound-effect-9982300.mp3';
      }

      if (counter === 9 && endgame !== true) {
        document.getElementById('messages').innerText = 'draw game!';
        endgame = true;
        removeMark(e);
        beep.src =
          'http://freesoundeffect.net/sites/default/files/menu-sfx--wrong---invalid-selection---7-sound-effect-9982300.mp3';
      }
    }
  }

  const removeMark = () => {
    let boxCells = document.querySelectorAll('.box');
    for (let boxCell of boxCells) {
      boxCell.removeEventListener('click', markEachBoard);
    }
  };

  function winMessage(name) {
    document.getElementById('messages').innerText = `${name} is winner!`;
  }

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
        board[element[0]] === symbol &&
        board[element[1]] === symbol &&
        board[element[2]] === symbol
      ) {
        endgame = true;
      }
    });
  };
  const newGame = () => {
    let newBtn = document.getElementById('button');
    newBtn.addEventListener('click', () => {
      location.reload();
    });
  };

  return { playGame, switchTurn, markEachBoard, removeMark, winning, newGame };
})();

const gameController = (() => {
  const gameActions = () => {
    displayController.playGame();
    displayController.newGame();
  };

  return { gameActions };
})();

gameController.gameActions();
