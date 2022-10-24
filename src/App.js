import React, { useCallback, useRef, useState } from "react";
import classes from "./style.module.css";
import Whatis from "./components/Whatis";

import "./App.css";

let size;

const operations = [
  [0, 1],
  [1, 0],
  [1, 1],
  [0, -1],
  [-1, 0],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

// const generateEmptyGrid = () => {
//   const rows = [];
//   for (let i = 0; i < num; i++) {
//     rows.push(Array.from(Array(numCols), () => 0));
//   }
//   return rows;
// };

const generateEmptyGrid = (num) => {
  size = num;
  const rows = [];
  for (let i = 0; i < num; i++) {
    rows.push(Array.from(Array(num), () => 0));
  }
  return rows;
};

const countNeighbors = (grid, x, y) => {
  return operations.reduce((acc, [i, j]) => {
    const row = (x + i + size) % size;
    const col = (y + j + size) % size;
    acc += grid[row][col];
    return acc;
  }, 0);
};

const App = (props) => {
  // const [grid, setGrid] = useState(() => {
  //   return generateEmptyGrid();
  // });

  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid(26);
  });

  // const gridToggler = (size) => {
  //   // grid ? setGrid(generateEmptyGrid(size)) : generateEmptyGrid(26);
  //   grid ? setGrid(generateEmptyGrid(size)) : setGridChangedOptions(true);
  // };

  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [gameInfo, setGameInfo] = useState(false);
  const [gridChanged, setGridChangedOptions] = useState(false);

  const toggler = () => {
    gridChanged ? setGridChangedOptions(false) : setGridChangedOptions(true);
  };

  const whatIfToggler = () => {
    gameInfo ? setGameInfo(false) : setGameInfo(true);
  };

  const clearWhatif = () => {
    setGameInfo(false);
  };

  // const gridToggler = (size) => {
  //   // grid ? setGrid(generateEmptyGrid(size)) : generateEmptyGrid(26);
  //   grid ? setGrid(generateEmptyGrid(size)) : setGridChangedOptions(false);
  // };

  const runningRef = useRef();
  runningRef.current = running;

  const generationRef = useRef(generation);
  generationRef.current = generation;

  // console.log(grid);

  const produce = (grid, callback) => {
    // const newgrid = JSON.parse(grid);
    // const newgrid = JSON.stringify(grid);

    const newgrid = JSON.parse(JSON.stringify(grid));
    // console.log(typeof newgrid);

    callback(newgrid);
    return newgrid;
  };

  // const runSimulation = useCallback(() => {
  //   if (!runningRef.current) {
  //     return;
  //   }
  //   setGrid((g) => {
  //     return produce(g, (gridCopy) => {
  //       for (let i = 0; i < size; i++) {
  //         for (let j = 0; j < size; j++) {
  //           let neighbours = 0;
  //           operations.forEach(([x, y]) => {
  //             const newI = i + x;
  //             const newJ = j + y;

  //             if (newI >= 0 && newI < size && newJ >= 0 && newJ < size) {
  //               neighbours += g[newI][newJ];
  //             }
  //           });

  //           if (neighbours < 2 || neighbours > 3) {
  //             gridCopy[i][j] = 0;
  //           } else if (g[i][j] === 0 && neighbours === 3) {
  //             gridCopy[i][j] = 1;
  //           }
  //         }
  //       }
  //     });
  //   });

  //   setTimeout(runSimulation, 100);
  // }, []);

  const runSimulation = useCallback(() => {
    setInterval(() => {
      if (!runningRef.current) {
        return;
      }
      setGrid((currentGrid) =>
        produce(currentGrid, (gridCopy) => {
          for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
              const count = countNeighbors(currentGrid, i, j);
              if (currentGrid[i][j] === 1 && (count < 2 || count > 3)) {
                gridCopy[i][j] = 0;
              }
              if (!currentGrid[i][j] && count === 3) {
                gridCopy[i][j] = 1;
              }
            }
          }
        })
      );
      setGeneration(++generationRef.current);
    }, 500);
  }, []);

  return (
    <>
      {gameInfo && (
        <div>
          <Whatis onPress={clearWhatif} onClick={whatIfToggler} />
        </div>
      )}

      {gridChanged && (
        <div className={classes.grid_Change}>
          <h3> Select the grid size </h3>
          <div className={classes.grid_Button}>
            <button
              onClick={() => {
                setGrid(generateEmptyGrid(10));
                toggler();
              }}
            >
              {" "}
              10 X 10{" "}
            </button>
            <button
              onClick={() => {
                setGrid(generateEmptyGrid(20));
                toggler();
              }}
            >
              {" "}
              20 X 20{" "}
            </button>
            <button
              onClick={() => {
                setGrid(generateEmptyGrid(30));
                toggler();
              }}
            >
              {" "}
              30 X 30{" "}
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          display: "grid",
          // gridTemplateColumns: `repeat(${numCols}, 25px)`,
          gridTemplateColumns: `repeat(${size}, 25px)`,
        }}
        className={classes.grid}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i} - ${j}`}
              onClick={() => {
                const newgrid = produce(grid, (newgrid) => {
                  newgrid[i][j] = 1 - newgrid[i][j];
                });
                setGrid(newgrid);
                // console.log(newgrid);
              }}
              style={{
                width: 25,
                height: 25,
                // backgroundColor: grid[i][j] ? "#003366" : "#eee",
                backgroundColor: grid[i][j] ? "#457b9d" : "#e7ecef",

                border: "1px solid #b5c9d6",
              }}
            />
          ))
        )}
      </div>
      <div className={classes.scoreContainer}>
        {" "}
        Generaion :<div className={classes.score}>{generation}</div>
        <br />
        Current size of the grid : {size} x {size}
      </div>

      <div className={classes.button}>
        <button
          // className={buttonStyle["button-8"]}
          onClick={() => setGameInfo(true)}
        >
          What is?
        </button>

        <button onClick={toggler}> Change grid size </button>

        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {" "}
          {running ? "Stop" : "Start"}
        </button>

        <button
          onClick={() => {
            setGrid(generateEmptyGrid(size));
            setGeneration(0);
          }}
        >
          {" "}
          Clear
        </button>

        <button
          onClick={() => {
            const rows = [];
            for (let i = 0; i < size; i++) {
              rows.push(
                Array.from(Array(size), () => (Math.random() > 0.8 ? 1 : 0))
              );
            }
            setGrid(rows);
          }}
        >
          {" "}
          Random{" "}
        </button>
      </div>
    </>
  );
};

export default App;
