import React from "react";
import classes from "./style.module.css";

export default function Whatis() {
  return (
    <>
      <div className={classes}>
        <h3> Game of Life Explanation!</h3>
        <h4>
          {" "}
          The Game of Life, also known simply as Life, is a cellular automaton{" "}
          <br />
          devised by the British mathematician John Horton Conway in 1970.{" "}
        </h4>
        <h3 className={classes.h3Text}> Rules of the game: </h3>
        <h4> 1. Any live cell with two or three live neighbours survives.</h4>
        <h4>
          {" "}
          2. Any dead cell with three live neighbours becomes a live cell.
        </h4>
        <h4>
          {" "}
          3. All other live cells die in the next generation. Similarly, all
          other dead cells stay dead.
        </h4>

        <a
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Visit the Wiki
        </a>
      </div>
    </>
  );
}
