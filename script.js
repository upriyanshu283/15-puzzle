let interval;
function randomRow(nRows) {
  return Math.floor(Math.random() * nRows);
}
function randomCol(nCols) {
  return Math.floor(Math.random() * nCols);
}
function resetMoves() {
  const nMoves = document.getElementById("nMoves");
  nMoves.innerHTML = 0;
}
function checkIfHighScore() {
  let time = document.getElementById("time");
  let curTime = time.innerHTML;
  let first = Number(localStorage.getItem("First"));
  let second = Number(localStorage.getItem("Second"));
  let third = Number(localStorage.getItem("Third"));
  if (first > Number(curTime) || first == 0 || isNaN(first)) {
    if (!isNaN(first) && first != 0) {
      localStorage.setItem("Second", first);
    }
    if (!isNaN(second) && second != 0) {
      localStorage.setItem("Third", second);
    }
    localStorage.setItem("First", curTime);
  } else if (second > Number(curTime) || second == 0 || isNaN(second)) {
    localStorage.setItem("Second", curTime);
    if (!isNaN(second) && second != 0) {
      localStorage.setItem("Third", second);
    }
  } else if (third > Number(curTime) || third == 0 || isNaN(third)) {
    localStorage.setItem("Third", curTime);
  }
  displayScore();
}
function displayScore() {
  let firstBox = document.getElementById("first");
  let secondBox = document.getElementById("second");
  let thirdBox = document.getElementById("third");
  let first = Number(localStorage.getItem("First"));
  let second = Number(localStorage.getItem("Second"));
  let third = Number(localStorage.getItem("Third"));
  
  if (!isNaN(first)&&first!=0) {
    firstBox.innerHTML = first + "";
  }
  if (!isNaN(second) && second != 0) {
    secondBox.innerHTML = second + "";
  }
  if (!isNaN(third) && third != 0) {
    thirdBox.innerHTML = third + "";
  }
}
function startTimer(){
  interval=setInterval(showTime,1000);
}
function showTime(){
  const timeDiv=document.getElementById("time");
  let time=Number(timeDiv.innerHTML);
  time++;
  timeDiv.innerHTML=time;
  console.log(time);
}

function drawBoard(nRows, nCols, nCells) {
  try{
    clearInterval(interval);
  }catch{

  };
  const timeDiv=document.getElementById("time");
  timeDiv.innerHTML=1;
  const board = document.getElementById("board");
  board.style.display = "flex";
  board.innerHTML = "";
  const boardContainer = document.getElementById("boardContainer");
  const height = boardContainer.clientHeight;
  winText = document.getElementById("winText");
  console.log(height);
  winText.style.display = "none";
  for (let row = 0; row < nRows; row++) {
    for (let col = 0; col < nCols; col++) {
      let div = document.createElement("div");
      div.classList.add("tile");
      div.setAttribute("id", `r${row}c${col}`);
      div.style.width = `${40 / nCols}vh`;
      div.style.height = `${40 / nRows}vh`;
      div.style.top = `${(row / nRows) * 100}%`;
      div.style.left = `${(col / nCols) * 100}%`;
      div.innerHTML = 1 + row * nCols + col;
      board.append(div);
    }
  }
  let counter1 = 0;

  for (let r = 0; r < nRows; r++) {
    for (let c = 0; c < nCols; c++) {
      if (r != nRows - 1 || c != nCols - 1) {
        let row = randomRow(nRows);
        let col = randomCol(nCols);
        if ((row != nRows - 1 || col != nCols - 1) && (row != r || col != c)) {
          let div1 = document.getElementById(`r${r}c${c}`);
          let div2 = document.getElementById(`r${row}c${col}`);
          let temp1 = div1.innerHTML;
          div1.innerHTML = div2.innerHTML;
          div2.innerHTML = temp1;
          counter1++;
        }
      }
      if (counter1 % 2 != 0) {
        c--;
      }
    }
  }

  let r = randomRow(nRows);
  let c = randomCol(nCols);
  console.log(Number(nRows) - 1 - r + Number(nCols) - 1 - c);
  if ((Number(nRows) - 1 - r + Number(nCols) - 1 - c) % 2 != 0) {
    swapTiles(`r${r}c${c}`, `r${nRows - 1}c${nCols - 1}`);
  }

  createEmptyTile(nCells);
  resetMoves();

  try {
    board.removeEventListener("click", ab);
  } catch {}
  board.addEventListener(
    "click",
    (ab = function (e) {
      swap(nRows, nCols, nCells, e);
    })
  );
  
}
function createEmptyTile(nCells) {
  const tileList = document.querySelectorAll(".tile");
  for (let i = 0; i < nCells; i++) {
    if (tileList[i].innerHTML == nCells) {
      tileList[i].style.display = "None";
    }
  }
}
function swapTiles(id1, id2) {
  let div1 = document.getElementById(id1);
  let div2 = document.getElementById(id2);
  let temp1 = div1.innerHTML;
  div1.innerHTML = div2.innerHTML;
  div2.innerHTML = temp1;
  div2.style.display = "flex";
  div1.style.display = "none";
}
function swapInnerHTML(id1, id2) {
  let div1 = document.getElementById(id1);
  let div2 = document.getElementById(id2);
  let temp1 = div1.innerHTML;
  div1.innerHTML = div2.innerHTML;
  div2.innerHTML = temp1;
}
function swapDisplay(id1, id2) {
  let div1 = document.getElementById(id1);
  let div2 = document.getElementById(id2);
  div2.style.display = "flex";
  div1.style.display = "none";
}
function checkLeft(row, col, nCells) {
  for (let i = col - 1; i >= 0; i--) {
    let emptyTile = document.getElementById(`r${row}c${i}`);
    if (emptyTile.innerHTML == nCells) {
      return i;
    }
  }
  return -1;
}
function checkRight(row, col, nCols, nCells) {
  for (let i = col + 1; i < nCols; i++) {
    let emptyTile = document.getElementById(`r${row}c${i}`);
    if (emptyTile.innerHTML == nCells) {
      return i;
    }
  }
  return -1;
}
function checkAbove(row, col, nCells) {
  for (let i = row - 1; i >= 0; i--) {
    let emptyTile = document.getElementById(`r${i}c${col}`);
    if (emptyTile.innerHTML == nCells) {
      return i;
    }
  }
  return -1;
}
function checkBelow(row, col, nRows, nCells) {
  for (let i = row + 1; i < nRows; i++) {
    let emptyTile = document.getElementById(`r${i}c${col}`);
    if (emptyTile.innerHTML == nCells) {
      return i;
    }
  }
  return -1;
}
function checkWin(nCells, nRows, nCols) {
  const list = document.getElementsByClassName("tile");
  for (let i = 0; i < nCells; i++) {
    let r = Number(list[i].id[1]);
    let c = Number(list[i].id[3]);
    if (list[i].innerHTML != 1 + r * nCols + c) {
      return;
    }
  }
  checkIfHighScore();
  console.log("Win");
  board = document.getElementById("board");
  board.style.display = "none";
  winText = document.getElementById("winText");
  winText.style.display = "block";
  try{
    clearInterval(interval);
  }catch{

  };
  setTimeout(resetBoard, 4000);
}

function swap(nRows, nCols, nCells, e) {
  let nMoves = document.getElementById("nMoves");
  let tileClicked = e.target.id;
  let row = Number(tileClicked[1]);
  let col = Number(tileClicked[3]);
  const tile = document.getElementById(`r${row}c${col}`);
  if(nMoves.innerHTML=="0"){
    startTimer();
  }
  if (checkAbove(row, col, nCells) > -1) {
    let emptyTileIndex = checkAbove(row, col, nCells);
    for (let i = emptyTileIndex; i < row; i++) {
      let tile1 = document.getElementById(`r${i + 1}c${col}`);
      tile1.style.transform = "translateY(-100%) rotateZ(360deg)";
      setTimeout(function () {
        tile1.style.transform = "none";
      }, 300);
      setTimeout(function () {
        swapInnerHTML(`r${i + 1}c${col}`, `r${i}c${col}`);
      }, 10);
      setTimeout(function () {
        swapDisplay(`r${i + 1}c${col}`, `r${i}c${col}`);
      }, 300);
    }
  } else if (checkBelow(row, col, nRows, nCells) > -1) {
    let emptyTileIndex = checkBelow(row, col,nRows, nCells);
    for (let i = emptyTileIndex; i > row; i--) {
      let tile1 = document.getElementById(`r${i - 1}c${col}`);
      tile1.style.transform = "translateY(100%) rotateZ(360deg)";
      setTimeout(function () {
        tile1.style.transform = "none";
      }, 300);
      setTimeout(function () {
        swapInnerHTML(`r${i - 1}c${col}`, `r${i}c${col}`);
      }, 10);
      setTimeout(function () {
        swapDisplay(`r${i - 1}c${col}`, `r${i}c${col}`);
      }, 300);
    }
  } else if (checkLeft(row, col, nCells)>-1) {
    let emptyTileIndex = checkLeft(row, col, nCells);
    for (let i = emptyTileIndex; i < col; i++) {
      let tile1 = document.getElementById(`r${row}c${i+1}`);
      tile1.style.transform = "translateX(-100%) rotateZ(360deg)";
      setTimeout(function () {
        tile1.style.transform = "none";
      }, 300);
      setTimeout(function () {
        swapInnerHTML(`r${row}c${i+1}`, `r${row}c${i}`);
      }, 10);
      setTimeout(function () {
        swapDisplay(`r${row}c${i+1}`, `r${row}c${i}`);
      }, 300);
    }
  } else if (checkRight(row, col, nCols, nCells)>-1) {
    let emptyTileIndex = checkRight(row, col,nCols, nCells);
    for (let i = emptyTileIndex; i > col; i--) {
      let tile1 = document.getElementById(`r${row}c${i-1}`);
      tile1.style.transform = "translateX(100%) rotateZ(360deg)";
      setTimeout(function () {
        tile1.style.transform = "none";
      }, 300);
      setTimeout(function () {
        swapInnerHTML(`r${row}c${i-1}`, `r${row}c${i}`);
      }, 10);
      setTimeout(function () {
        swapDisplay(`r${row}c${i-1}`, `r${row}c${i}`);
      }, 300);
    }
  } else {
    return;
  }
  nMoves.innerHTML = Number(nMoves.innerHTML) + 1;
  setTimeout(function () {
    checkWin(nCells, nRows, nCols);
  }, 300);
}

function start() {
  const rowInput = document.getElementById("nRows");
  const colInput = document.getElementById("nCols");
  rowInput.value = 4;
  colInput.value = 4;
  drawBoard(rowInput.value, colInput.value, rowInput.value * colInput.value);
}
function resetBoard() {
  const rowInput = document.getElementById("nRows");
  const colInput = document.getElementById("nCols");
  nRows = rowInput.value;
  nCols = colInput.value;
  drawBoard(nRows, nCols, nRows * nCols);
}
function clearScores() {
  localStorage.clear();
  let firstBox = document.getElementById("first");
  let secondBox = document.getElementById("second");
  let thirdBox = document.getElementById("third");
  firstBox.innerHTML = "-";
  secondBox.innerHTML = "-";
  thirdBox.innerHTML = "-";
}
function KeyEvent(e) {
  let nMoves = document.getElementById("nMoves");
  if(nMoves.innerHTML=="0"){
    startTimer();
  }
  
  const rowInput = document.getElementById("nRows");
  const colInput = document.getElementById("nCols");
  let tile;
  nRows = rowInput.value;
  nCols = colInput.value;
  console.log(e.code);
  const tileList = document.querySelectorAll(".tile");
  for (let i = 0; i < nRows * nCols; i++) {
    if (tileList[i].innerHTML == nRows * nCols) {
      tile = tileList[i];
      break;
    }
  }
  let r = Number(tile.id[1]);
  let c = Number(tile.id[3]);
  console.log(r, c);
  if (e.code == "ArrowUp" && r < nRows - 1) {
    let tile2 = document.getElementById(`r${r + 1}c${c}`);
    tile2.style.transform = "translateY(-100%) rotateZ(360deg)";
    setTimeout(function () {
      tile2.style.transform = "none";
    }, 300);
    setTimeout(function () {
      swapInnerHTML(`r${r + 1}c${c}`, `r${r}c${c}`);
    }, 10);
    setTimeout(function () {
      swapDisplay(`r${r + 1}c${c}`, `r${r}c${c}`);
    }, 300);
  } else if (e.code == "ArrowDown" && r > 0) {
    let tile2 = document.getElementById(`r${r - 1}c${c}`);
    tile2.style.transform = "translateY(100%) rotateZ(360deg)";
    setTimeout(function () {
      tile2.style.transform = "none";
    }, 300);
    setTimeout(function () {
      swapInnerHTML(`r${r - 1}c${c}`, `r${r}c${c}`);
    }, 10);
    setTimeout(function () {
      swapDisplay(`r${r - 1}c${c}`, `r${r}c${c}`);
    }, 300);
  } else if (e.code == "ArrowLeft" && c < nCols - 1) {
    let tile2 = document.getElementById(`r${r}c${c + 1}`);
    tile2.style.transform = "translateX(-100%) rotateZ(360deg)";
    setTimeout(function () {
      tile2.style.transform = "none";
    }, 300);
    setTimeout(function () {
      swapInnerHTML(`r${r}c${c + 1}`, `r${r}c${c}`);
    }, 10);
    setTimeout(function () {
      swapDisplay(`r${r}c${c + 1}`, `r${r}c${c}`);
    }, 300);
  } else if (e.code == "ArrowRight" && c > 0) {
    let tile2 = document.getElementById(`r${r}c${c - 1}`);
    tile2.style.transform = "translateX(100%) rotateZ(360deg)";
    setTimeout(function () {
      tile2.style.transform = "none";
    }, 300);
    setTimeout(function () {
      swapInnerHTML(`r${r}c${c - 1}`, `r${r}c${c}`);
    }, 10);
    setTimeout(function () {
      swapDisplay(`r${r}c${c - 1}`, `r${r}c${c}`);
    }, 300);
  } else {
    return;
  }
  nMoves.innerHTML = Number(nMoves.innerHTML) + 1;
  setTimeout(function () {
    checkWin(nRows * nCols, nRows, nCols);
  }, 300);
}

start();

const rowInput = document.getElementById("nRows");
const colInput = document.getElementById("nCols");
rowInput.addEventListener("change", function () {
  resetBoard();
});
colInput.addEventListener("change", function () {
  resetBoard();
});
clearScoresButton = document.getElementById("clearScores");
clearScoresButton.addEventListener("click", function () {
  clearScores();
});
const newGame = document.getElementById("newGame");
newGame.addEventListener("click", function () {
  resetBoard();
});
displayScore();
window.addEventListener("keydown", function (e) {
  KeyEvent(e);
});
window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);
