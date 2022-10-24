import React from "react";
import classes from "../style/style.module.css";
// import "../App.css";

export default function Whatis(props) {
  return (
    <>
      <div className={classes.textBody}>
        <button onClick={props.onPress} className={classes.btnHover}>
          {" "}
          x{" "}
        </button>
        <h2>What is game of life?</h2>
        <h3> Game of Life Explanation</h3>
        <h4>
          {" "}
          The Game of Life, also known simply as Life, is a cellular automaton
          devised by the British mathematician John Horton Conway in 1970.{" "}
        </h4>
        <h4> Rules of the game: </h4>
        <h5> 1. Any live cell with two or three live neighbours survives.</h5>
        <h5>
          {" "}
          2. Any dead cell with three live neighbours becomes a live cell.
        </h5>
        <h5>
          {" "}
          3. All other live cells die in the next generation. Similarly, all
          other dead cells stay dead.
        </h5>

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
