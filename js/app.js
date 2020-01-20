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

  let player1;
  let player2;
  const msg = document.getElementById('messages');
  const boxCells = document.querySelectorAll('.box');
  const p1 = document.getElementById('player-1');
  const p2 = document.getElementById('player-2');
  const countClicks = clickCounter();
  let counter = 0;
  let endgame = false;
  
  const giveName = () => {
    name1 = p1.value;
    name2 = p2.value;
    if (p1.value === '') {
      player1 = Player("Player1", 'X');
    }else {
      player1 = Player(name1,'X');
    }
  
    if (p2.value === '') {
      player2 = Player("Player2", 'O');
    }else {
      player2 = Player(name2, 'O');
    }
  }

  function clickCounter() {
    return () => {
      counter += 1;
      return counter;
    };
  }

  function resetClicks() {
    counter = 0;
    switchTurn(counter);
    endgame = false;
    for (const boxCell of boxCells) {
      boxCell.addEventListener('click', markEachBoard);
    }

}



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
      }

      if (counter === 9 && endgame !== true) {
        msg.innerText = 'draw game!';
        endgame = true;
      }

      if (endgame === true) {
        for (const boxCell of boxCells) {
          boxCell.removeEventListener('click', markEachBoard);
        }
      }
    }
  }
   
  const playGame = () => {
    for (const boxCell of boxCells) {
      boxCell.addEventListener('click', markEachBoard);
    }
  };

  const playBtn = () => {
    giveName();
    const btnPlay = document.getElementById("btn-play");
    btnPlay.addEventListener('click', () => {
      document.getElementById('board').classList.remove('hide');
      document.getElementById('buttons').classList.remove('hide');
      document.getElementById('form').classList.add('hide');
    })
    
  }
  const newGame = () => {
    const newBtn = document.getElementById('button');
    newBtn.addEventListener('click', () => {
      window.location.reload();
    });
  };

  const restartGame = () => {
    const rstBtn = document.getElementById('restart');
    rstBtn.addEventListener('click', () => {
      gameBoard.resetBoard();
      resetClicks();
    })
  }

  return { playGame, switchTurn, markEachBoard, winning, newGame, playBtn,giveName,restartGame};
})();

const gameController = (() => {
  const gameActions = () => {
    displayController.playGame();
    displayController.newGame();
    displayController.playBtn();
    displayController.restartGame();
  };
  return { gameActions };
})();

gameController.gameActions();
