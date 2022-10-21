import React, { useCallback, useRef, useState } from "react";
import classes from "./style.module.css";
import "./App.css";

const numRows = 30;
const numCols = 30;
const speed = 300;

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

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const countNeighbors = (grid, x, y) => {
  return operations.reduce((acc, [i, j]) => {
    const row = (x + i + numRows) % numRows;
    const col = (y + j + numCols) % numCols;
    acc += grid[row][col];
    return acc;
  }, 0);
};

const App = () => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });
  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);

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
  //       for (let i = 0; i < numRows; i++) {
  //         for (let j = 0; j < numCols; j++) {
  //           let neighbours = 0;
  //           operations.forEach(([x, y]) => {
  //             const newI = i + x;
  //             const newJ = j + y;

  //             if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
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
          for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
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
    }, speed);
  }, []);

  return (
    <>
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
          setGrid(generateEmptyGrid);
          setGeneration(0);
        }}
      >
        {" "}
        Clear
      </button>

      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(
              Array.from(Array(numCols), () => (Math.random() > 0.8 ? 1 : 0))
            );
          }
          setGrid(rows);
        }}
      >
        {" "}
        Random{" "}
      </button>
      <div> Generaion : {generation}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
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
                width: 20,
                height: 20,
                // backgroundColor: grid[i][j] ? "#003366" : "#eee",
                backgroundColor: grid[i][j] ? "pink" : "#eee",
                border: "1px solid black",
              }}
            />
          ))
        )}
      </div>
    </>
  );
};

export default App;
