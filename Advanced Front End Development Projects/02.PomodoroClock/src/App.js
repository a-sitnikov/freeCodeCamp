import React, { Component } from 'react';
import './App.css';

function timeToStr(secTotal) {
  let min = Math.trunc(secTotal / 60);
  let sec = ("0" + secTotal % 60).slice(-2);
  return String(min + ":" + sec);
}

class App extends Component {

  constructor(props) {
    super(props);

    let sessionLength = 0.1;
    this.epmtyColor   = "#333333";
    this.sessionColor = "#99CC00";
    this.breakColor   = "#FF4444";

    this.state = {
      breakLength: 0.2,
      sessionLength: sessionLength,
      timeLength: 0,
      sessionName: "Session",
      timeLeft: sessionLength * 60,
      timeLeftStr: timeToStr(sessionLength * 60),
      state: "stop",
      fillHeight: 0,
      fillColor: this.sessionColor
    };

    this.breakChange = this.breakChange.bind(this);
    this.sessionChange = this.sessionChange.bind(this);
    this.timerClick = this.timerClick.bind(this);
    this.countdown = this.countdown.bind(this);
  }

  breakChange(val) {
    let breakLength = this.state.breakLength;
    breakLength += val;

    if (breakLength < 1) breakLength = 1;

    this.setState({ breakLength });
  }

  sessionChange(val) {

    if (this.state.state === "running")
      return;

    let sessionLength = this.state.sessionLength;
    sessionLength += val;
    if (sessionLength < 1) sessionLength = 1;

    let timeLeft = sessionLength * 60;
    let fillColor = this.epmtyColor;
    let fillHeight = "0%";

    this.setState({
      state: "stop",
      sessionName: "Session",
      sessionLength,
      timeLeft,
      timeLeftStr: timeToStr(timeLeft),
      fillColor,
      fillHeight
    });
  }

  timerClick() {

    let { state, timeLength, fillColor, fillHeight } = this.state;

    if (state === "running") {

      state = "pause";
      clearTimeout(this.timerId);

    } else if (state === "pause") {

      state = "running";
      this.timerId = setInterval(this.countdown, 1000);

    } else {

      state = "running";
      if (this.state.sessionName === "Session") {
        fillColor = this.sessionColor;
        timeLength = this.state.sessionLength * 60;
      } else {
        fillColor = this.breackColor;
        timeLength = this.state.breakLength * 60;
      }

      this.timerId = setInterval(this.countdown, 1000);
    }

    this.setState({ state, timeLength, fillColor, fillHeight });

  }

  countdown() {

    let timeLeft = this.state.timeLeft;
    timeLeft -= 1;

    let timePassed = this.state.timeLength - timeLeft;
    let fillHeight = String(Math.floor(100 * timePassed / this.state.timeLength)) + "%";

    let timeLeftStr = timeToStr(timeLeft);
    this.setState({ timeLeft, timeLeftStr, fillHeight });

    if (timeLeft < 0) {
      
      clearTimeout(this.timerId);

      var audio = new Audio('https://notificationsounds.com/message-tones/communication-channel-519/download/mp3');
      audio.play();
      
      let { sessionName, timeLength, fillColor } = this.state;
      if (sessionName === "Session") {
        sessionName = "Break!";
        fillColor = this.breakColor;
        timeLength = this.state.breakLength * 60;
      } else {
        sessionName = "Session";
        fillColor = this.sessionColor;
        timeLength = this.state.sessionLength * 60;
      }

      this.setState({ 
        sessionName, 
        timeLength,
        timeLeft: timeLength,
        timeLeftStr: timeToStr(timeLength),
        fillColor, 
        fillHeight: "0%" });
      
      this.timerId = setInterval(this.countdown, 1000);

    }

  }

  render() {
    return (
      <div className="App">
        <h1> React Pomodoro Clock</h1>
        <header>
          <div className={"session"}>

            <div className={"breakCtrl"}>
              <p>break length</p>
              <button className={"minus"} onClick={() => this.breakChange(-1)}>-</button>
              <span className={"time"}>{this.state.breakLength}</span>
              <button className={"plus"} onClick={() => this.breakChange(1)}>+</button>
            </div>

            <div className={"sessionCtrl"}>
              <p>session length</p>
              <button className={"minus"} onClick={() => this.sessionChange(-1)}>-</button>
              <span className={"time"}>{this.state.sessionLength}</span>
              <button className={"plus"} onClick={() => this.sessionChange(1)}>+</button>
            </div>

          </div>
        </header>

        <section>
          <div onClick={this.timerClick} className={"timer"}>
            <p className={"title"}>{this.state.sessionName}</p>
            <p>{this.state.timeLeftStr}</p>
            <span className={"fill"} style={{ height: this.state.fillHeight, background: this.state.fillColor }} />
          </div>
        </section>

        <footer>
          <p>Based on <a href="https://codepen.io/freeCodeCamp/full/aNyxXR/">this</a></p>
        </footer>

      </div>
    );
  }
}

export default App;
