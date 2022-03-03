import React, { useEffect, useState } from "react";

import Board from "./component/board";
import "./App.css"
import "./component/board.css"

function App() {
  const [count, setCount] = useState(2); // start from 2 rows columns
  const [boardGrid, setBoardGrid] = useState([]);
  const [userBoardGrid, setuserBoardGrid] = useState([]);
  const [colorSequence, setColorSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isButtonEnable, setButtonEnable] = useState(true);

  useEffect(() => {
    const bg = getGrid();
    drawGrid(bg);
    getColorSequence();
  }, [count]);

  useEffect(() => {
    const bg = getGrid();
    setuserBoardGrid(bg);
  }, [count]);

  useEffect(() => {
    if (userSequence.length !== 0) {
      if (JSON.stringify(userSequence) === JSON.stringify(colorSequence)) {
        alert("You win, go to next level!");
        setCount(c => c + 0.5); // next level
      } else {
        alert("idiot! Try again.");
        setUserSequence([]);
      }
    }
  }, [userSequence]);

  const drawGrid = (grid) => {
    setBoardGrid([...grid]);
  }

  const getGrid = () => {
    const tempGrid = []
    for (var i = 0; i < parseInt(count); i++) {
      tempGrid[i] = [];
      for (var j = 0; j < parseInt(count); j++) {
        tempGrid[i][j] = {
          id: `${i}${j}`,
          isSelected: false,
          color: "green"
        }
      }
    }
    return tempGrid
  }

  const getColorSequence = () => {
    let tempSequenceArr = [];
    while (tempSequenceArr.length < parseInt(count) + 1) {
      let seq = `${Math.floor(Math.random() * parseInt(count))}${Math.floor(Math.random() * parseInt(count))}`;
      if (!tempSequenceArr.includes(seq)) {
        tempSequenceArr.push(seq);
      }
    }
    setColorSequence([...tempSequenceArr]);
  }

  const printColorSequence = () => {
    var i = 0;
    setButtonEnable(false);
    var time = count % 1 === 0 ? 1000 : 500;
    var interval = setInterval(() => {
      let tempGrid = boardGrid;
      let prevIndex1;
      let prevIndex2;

      if (i <= parseInt(count)) {

        if (i !== 0) {
          prevIndex1 = colorSequence[i - 1].split('')[0];
          prevIndex2 = colorSequence[i - 1].split('')[1];
          tempGrid[prevIndex1][prevIndex2].color = 'green';
        }

        let curIndex1 = colorSequence[i].split('')[0];
        let curIndex2 = colorSequence[i].split('')[1];

        tempGrid[curIndex1][curIndex2].color = 'red';

        drawGrid(tempGrid);
        i++;

      } else {
        let lastIndex1 = colorSequence[i - 1].split('')[0];
        let lastIndex2 = colorSequence[i - 1].split('')[1];

        tempGrid[lastIndex1][lastIndex2].color = 'green';
        drawGrid(tempGrid);

        setButtonEnable(true);

        clearInterval(interval);
      }
    }, time);
  }

  return (
    <div className="App">
      {
        count === 2 && <div><h2>Click <i> Play !</i> to start the game</h2> <h2>Observe the pattern on the first grid and then trace the same pattern on the second grid</h2></div>
      }
      <h2>Level: {count-1}</h2>
      {/* board */}
      <div>
        <Board
          boardGrid={boardGrid}
          isUserPlaying={false}
        />
      </div>
      <button className={isButtonEnable ? "start-button" : "start-button disable"}
        disabled={!isButtonEnable}
        onClick={() => {
          isButtonEnable && printColorSequence();
          setUserSequence([]);
        }}
      >
        <b>Play !</b>
      </button>
      {/* user board */}
      {
        isButtonEnable && <Board
          boardGrid={userBoardGrid}
          isUserPlaying={true}
          count={parseInt(count)}
          setUserSequence={setUserSequence}
        />
      }
    </div>
  );
}

export default App;
