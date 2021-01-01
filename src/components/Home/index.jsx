
import React from "react";
import classnames from "classnames";
// eslint-disable-next-line
import turtle from "../../images/turtle.gif";

export default function Blank() {
  return (  <main id="mainContent">
  <div className={classnames("text-center")}>
    <h1><br/>Welcome to my website.</h1>
    <p><br/>I'm Claire, a high school student in Washington state who draws a lot in my free time. I also like to code.
    </p>
    <p><br/>I am working on an interactive COVID dashboard right now. Check it out here: <a href="/COVID19">COVID19 Dash</a>
    </p>
    <img src={turtle} alt="Turtle"></img>
  </div>
</main>);
}
