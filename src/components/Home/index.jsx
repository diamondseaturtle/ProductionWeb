
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
    <p>This website has a COVID dashboard. Check it out here: <a href="/COVID19">COVID19 Dash</a>
    </p>
    <p>I also created a game in the summer of 2021. If you want to play or see the demo, check out my github: <a href="https://github.com/diamondseaturtle/A-MAZE-ing">A-MAZE-ing</a>
    </p>
    <img src={turtle} alt="Turtle"></img>
    <p><br/>If you have any feedback or questions, please leave a message <a href="/Message_Board">here</a>
    </p>
  </div>
</main>);
}
