
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
    <p>I am working on an interactive COVID dashboard right now. Check it out here: <a href="/COVID19">COVID19 Dash</a>
    </p>
    <p><font size="2" color="#FF0000">(If the graph is not displayed properly, please refresh the page. I am working on a fix)
    </font></p>
    <img src={turtle} alt="Turtle"></img>
    <p><br/>If you have any feedback or questions, please leave a message <a href="/Message_Board">here</a>
    </p>
  </div>
</main>);
}
