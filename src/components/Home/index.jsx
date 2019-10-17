
import React from "react";
import classnames from "classnames";
// eslint-disable-next-line
import turtle from "../../images/turtle.gif";

export default function Blank() {
  return (  <main id="mainContent">
  <div className={classnames("text-center")}>
    <h1><br/>Hi!</h1>
    <p><br/>I'm Claire, a high school student who draws a lot in their free time. I also occasionally code things (like this website). 
    </p>
    <img src={turtle} alt="Turtle"></img>
  </div>
</main>);
}
