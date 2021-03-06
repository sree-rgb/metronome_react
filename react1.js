class Time1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_step: 1,
      run_state: 'Start',
      current_bpm: 60
    };
  }

  alerts() {
    const numbers = [1, 2, 3, 4];
    const audios = numbers.map(number => {
      return 'audio' + number;
    });
    const sources = numbers.map(number => {
      if (number == 1) {
        return 'click1.wav';
      } else {
        return 'click2.wav';
      }
    });
    const listItems = numbers.map(number =>
    /*#__PURE__*/
    React.createElement("audio", {
      key: number,
      id: audios[number - 1]
    },
    /*#__PURE__*/
    React.createElement("source", {
      src: sources[number - 1]
    })));
    return (
      /*#__PURE__*/
      React.createElement("div", null, listItems)
    );
  }

  inc(steps = 4) {
    // Increments the step number.
    // If step number is last sets it back to step 1 
    if (this.state.current_step == steps) {
      this.setState((state, props) => ({
        current_step: state.current_step = 1
      }));
      document.getElementById('audio1').play();
    } else {
      this.setState((state, props) => ({
        current_step: state.current_step + 1
      }));
      document.getElementById('audio' + this.state.current_step).play();
    } // To update the speed of running timer


    if (this.state.current_bpm != this.props.bpm && this.state.run_state == 'Stop') {
      this.start_timer();
    }
  }

  clearTimer() {
    alert('clear');
    clearInterval(this.timerID);
  }

  start_timer() {
    // starts metronome
    this.clearTimer();
    this.timerID = setInterval(() => this.inc(), 1000 / (this.props.bpm / 60));
    this.setState({
      run_state: 'Stop'
    });
    this.setState({
      current_bpm: this.props.bpm
    });
  }

  render() {
    return (
      /*#__PURE__*/
      React.createElement("div", null,
      /*#__PURE__*/
      React.createElement("h1", null, this.state.current_step),
      /*#__PURE__*/
      React.createElement("button", {
        id: "startbutton",
        onClick: () => {
          if (this.state.run_state == 'Start') {
            this.start_timer();
          } else {
            clearInterval(this.timerID);
            this.setState({
              run_state: 'Start'
            });
          }
        }
      }, this.state.run_state), this.alerts())
    );
  }

}

class Bpm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_bpm: 60
    };
  }

  componentDidMount() {
    let bpm = document.getElementById('bpm');

    bpm.onchange = () => {
      this.setState({
        current_bpm: bpm.value
      });
    };
  }

  render() {
    return (
      /*#__PURE__*/
      React.createElement("div", null,
      /*#__PURE__*/
      React.createElement("label", null, "BPM"),
      /*#__PURE__*/
      React.createElement("input", {
        type: "number",
        id: "bpm",
        min: "0",
        max: "200",
        placeholder: "60"
      }),
      /*#__PURE__*/
      React.createElement(Time1, {
        bpm: this.state.current_bpm
      }))
    );
  }

}

ReactDOM.render(
/*#__PURE__*/
React.createElement(Bpm, null), document.getElementById('root'));

