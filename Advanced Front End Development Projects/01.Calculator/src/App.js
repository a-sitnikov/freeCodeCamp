import React, { Component } from 'react';
import classNames from 'classnames';

class Entrybox extends Component {
  render() {
    return (
      <div className='entrybox text-right'>
        <div className='entry'>
          <p className='answer'>{this.props.answer}</p>
        </div>
        <div className='history'>
          <p>{this.props.history}</p>
        </div>
      </div>
    );
  }
}

class Button extends Component {

  onClick(e) {
    if (this.props.onClick)
      this.props.onClick(this.props.value);
  }

  render() {

    let label;
    if (this.props.label)
      label = this.props.label;
    else
      label = this.props.value;

    var btnClasses = classNames({
      'wideButton': this.props.wide,
      'red': this.props.red,
      'equalButton': this.props.equal
    });

    return (
      <button className={btnClasses} onClick={this.onClick.bind(this)}>{label}</button>
    );
  }
}

class App extends Component {

  constructor(props) {

    super(props);

    this.onDigit = this.onDigit.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onDot = this.onDot.bind(this);
    this.onOperator = this.onOperator.bind(this);
    this.onEval = this.onEval.bind(this);

    this.state = { answer: '0', history: '0', log: ['0'] };
  }

  round(val) {
    let str = String(val);
    if (str.charAt(0) === '.')
      str = '0' + str;
    return str.substring(0, 9);
  }

  isOperator(char) {
    if (char === "+" || char === "-" || char === "÷" || char === "x")
      return true;

    return false;
  }

  onDigit(val) {

    let answer = this.state.answer;
    if (answer === '0')
      answer = '';
      
    let log = this.state.log.slice();
    if (log[log.length - 2] === "=") {
      answer = ''; 
      log = [''];

    } else if (this.isOperator(log[log.length - 1])) {
      log.push('');
      answer = '';
    }
    
    answer = answer + val;

    log[log.length - 1] = answer;

    let history = log.join('').replace(/\//g, '÷');

    this.setState({
      answer,
      history,
      log
    })
  }

  onDot(val) {

    let answer = this.state.answer;
    if (answer.indexOf('.') !== -1)
      return;

    answer = answer + val;

    let log = this.state.log.slice();
    log[log.length - 1] = answer;

    let history = log.join('');

    this.setState({
      answer,
      history,
      log
    })
  }

  onClear(val) {

    if (val === 'AC')
      this.setState({
        answer: '0',
        history: '0',
        log: ['0']
      });
    else if (val === 'CE') {

      let log = this.state.log.slice(0, -1);
      if (log[log.length - 1] === "=")
        log = ['0'] ;
      let history = log.join('');

      this.setState({
        answer: '0',
        history,
        log
      });
    }
  }

  onOperator(val) {

    let answer = val;

    let log = this.state.log.slice();
    if (log[log.length - 2] === "=") {
      log.splice(0, log.length - 1);
      log.push(val);
    } else if (this.isOperator(log[log.length - 1]))
      log[log.length - 1] = val;
    else
      log.push(val);

    let history = log.join('');

    this.setState({
      answer,
      history,
      log
    });
  }

  onEval(val) {

    let log = this.state.log.slice();
    if (this.isOperator(log[log.length - 1]))
      log.slice(0, -1);

    let str = log.join('');
    if (str.search("=") !== -1)
      return;

    str = str.replace(/x/g, "*").replace(/÷/g, "/");
    let answer = eval('this.round(' + str + ')');
    
    log.push('=');
    log.push(answer);
    let history = log.join('');

    this.setState({
      answer,
      history,
      log
    });
  }

  render() {

    return (
      <div>
        <div className='container'>
          <div className='calculator'>

            <div className='text-center title'>
              <h5><b>ELECTRONIC CALCULATOR</b></h5>
            </div>

            <Entrybox
              answer={this.state.answer}
              history={this.state.history}
            />
            <div className='buttons'>
              <Button value={"AC"} red onClick={this.onClear}></Button>
              <Button value={"CE"} red onClick={this.onClear}></Button>
              <Button value={"÷"} onClick={this.onOperator}></Button>
              <Button value={"x"} onClick={this.onOperator}></Button>
              <Button value={7} onClick={this.onDigit}></Button>
              <Button value={8} onClick={this.onDigit}></Button>
              <Button value={9} onClick={this.onDigit}></Button>
              <Button value={"-"} onClick={this.onOperator}></Button>
              <Button value={4} onClick={this.onDigit}></Button>
              <Button value={5} onClick={this.onDigit}></Button>
              <Button value={6} onClick={this.onDigit}></Button>
              <Button value={"+"} onClick={this.onOperator}></Button>
              <Button value={1} onClick={this.onDigit}></Button>
              <Button value={2} onClick={this.onDigit}></Button>
              <Button value={3} onClick={this.onDigit}></Button>
              <Button value={0} wide onClick={this.onDigit}></Button>
              <Button value={'.'} onClick={this.onDot}></Button>
              <Button value={'='} equal onClick={this.onEval}></Button>
            </div>
          </div>

        </div>

        <footer className="footer text-center">
          <div className="container">
            <p>Designed by <a href="https://codepen.io/freeCodeCamp/full/rLJZrA">Justin Woodward</a></p>
            <p>Coded by Anatoliy Sitnikov</p>
          </div>
        </footer>

      </div>
    );
  }
}

export default App;
