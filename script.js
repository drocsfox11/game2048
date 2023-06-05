let cells = document.querySelectorAll('.cell');
let score = document.querySelector('.score');
let gameData = {
  score: 0,
  cells: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
};

function createNewCell() {
  let emptyCells = [];
  for (let i = 0; i < gameData.cells.length; i++) {
    for (let j = 0; j < gameData.cells[i].length; j++) {
      if (gameData.cells[i][j] === 0) {
        emptyCells.push({x: i, y: j});
      }
    }
  }
  if (emptyCells.length === 0) {
    return false;
  }
  let randomIndex = Math.floor(Math.random() * emptyCells.length);
  let randomValue = Math.random() < 0.8 ? 2 : 4;
  let cell = emptyCells[randomIndex];
  gameData.cells[cell.x][cell.y] = randomValue;
  draw();
  return true;
}

createNewCell();
createNewCell();

function checkGameOver() {
    let gameOver = true;
    for (let i = 0; i < gameData.cells.length; i++) {
      for (let j = 0; j < gameData.cells[i].length; j++) {
        if (gameData.cells[i][j] === 0) {
          gameOver = false;
          break;
        }
      }
      if (!gameOver) {
        break;
      }
    }
    if (gameOver) {
      for (let i = 0; i < gameData.cells.length; i++) {
        for (let j = 0; j < gameData.cells[i].length; j++) {
          if ((i > 0 && gameData.cells[i][j] === gameData.cells[i - 1][j]) ||
              (i < gameData.cells.length - 1 && gameData.cells[i][j] === gameData.cells[i + 1][j]) ||
              (j > 0 && gameData.cells[i][j] === gameData.cells[i][j - 1]) ||
              (j < gameData.cells[i].length - 1 && gameData.cells[i][j] === gameData.cells[i][j + 1])) {
            gameOver = false;
            break;
          }
        }
        if (!gameOver) {
          break;
        }
      }
    }
    return gameOver
  }
  

function draw() {
  for (let i = 0; i < gameData.cells.length; i++) {
    for (let j = 0; j < gameData.cells[i].length; j++) {
      let cell = cells[i * 4 + j];
      cell.innerText = gameData.cells[i][j] === 0 ? '' : gameData.cells[i][j];
      cell.className = 'cell cell-' + gameData.cells[i][j];
    }
  }
  score.innerText = 'Счет: ' + gameData.score;
}

function move(direction) {
    let hasMoved = false;
    switch (direction) {
      case 'up':
        for (let j = 0; j < 4; j++) {
          for (let i = 1; i < 4; i++) {
            if (gameData.cells[i][j] !== 0) {
              for (let k = i; k > 0; k--) {
                if (gameData.cells[k - 1][j] === 0) {
                  gameData.cells[k - 1][j] = gameData.cells[k][j];
                  gameData.cells[k][j] = 0;
                  hasMoved = true;
                } else if (gameData.cells[k - 1][j] === gameData.cells[k][j]) {
                  gameData.cells[k - 1][j] *= 2;
                  gameData.cells[k][j] = 0;
                  gameData.score += gameData.cells[k - 1][j];
                  hasMoved = true;
                  break;
                } else {
                  break;
                }
              }
            }
          }
        }
        break;
      case 'down':
        for (let j = 0; j < 4; j++) {
          for (let i = 2; i >= 0; i--) {
            if (gameData.cells[i][j] !== 0) {
              for (let k = i; k < 3; k++) {
                if (gameData.cells[k + 1][j] === 0) {
                  gameData.cells[k + 1][j] = gameData.cells[k][j];
                  gameData.cells[k][j] = 0;
                  hasMoved = true;
                } else if (gameData.cells[k + 1][j] === gameData.cells[k][j]) {
                  gameData.cells[k + 1][j] *= 2;
                  gameData.cells[k][j] = 0;
                  gameData.score += gameData.cells[k + 1][j];
                  hasMoved = true;
                  break;
                } else {
                  break;
                }
              }
            }
          }
        }
        break;
      case 'left':
        for (let i = 0; i < 4; i++) {
          for (let j = 1; j < 4; j++) {
            if (gameData.cells[i][j] !== 0) {
              for (let k = j; k > 0; k--) {
                if (gameData.cells[i][k - 1] === 0) {
                  gameData.cells[i][k - 1] = gameData.cells[i][k];
                  gameData.cells[i][k] = 0;
                  hasMoved = true;
                } else if (gameData.cells[i][k - 1] === gameData.cells[i][k]) {
                  gameData.cells[i][k - 1] *= 2;
                  gameData.cells[i][k] = 0;
                  gameData.score += gameData.cells[i][k - 1];
                  hasMoved = true;
                  break;
                } else {
                  break;
                }
              }
            }
          }
        }
        break;
        case 'right':

            for (let i = 0; i < 4; i++) {
            for (let j = 2; j >= 0; j--) {
            if (gameData.cells[i][j] !== 0) {
            for (let k = j; k < 3; k++) {
            if (gameData.cells[i][k + 1] === 0) {
            gameData.cells[i][k + 1] = gameData.cells[i][k];
            gameData.cells[i][k] = 0;
            hasMoved = true;
            } else if (gameData.cells[i][k + 1] === gameData.cells[i][k]) {
            gameData.cells[i][k + 1] *= 2;
            gameData.cells[i][k] = 0;
            gameData.score += gameData.cells[i][k + 1];
            hasMoved = true;
            break;
            } else {
            break;
            }
        }
        }
        }
            }
            break;
            default:
            break;
            }
            if (hasMoved) {
                let condition = checkGameOver();
             if(condition){
                alert('Ты проиграл :( Твой счет: ' + gameData.score);
             }else{
                createNewCell();
             }
            }else{
                let condition = checkGameOver();
             if(condition){
                alert('Ты проиграл :( Твой счет: ' + gameData.score);
             }
            }
            }
            document.addEventListener('keydown', event => {
            switch (event.code) {
           case 'KeyW':
            move('up');
            break;
            case 'KeyS':
            move('down');
            break;
            case 'KeyA':
            move('left');
            break;
            case 'KeyD':
            move('right');
            break;
            default:
            break;
            }
});
  