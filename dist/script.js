function Timer(props) {
  return (

    React.createElement("div", { id: props.id + "-label", class: "col-6" },
    props.id === "break" ? "Break" + " Length" : "Session" + " Length",
    React.createElement("div", { id: `${props.id}-length` },
    props.value),

    React.createElement("button", { id: `${props.id}-decrement`, class: "btn", value: "-", onClick: props.handleIncrement }, "-"),


    React.createElement("button", { id: `${props.id}-increment`, class: "btn", value: "+", onClick: props.handleIncrement }, "+")));






}

function Display(props) {
  return (
    React.createElement("div", { id: "display" },
    React.createElement("div", { id: "timer-label" },
    props.phase === "break" ? "Break" : "Session"),

    React.createElement("div", { id: "time-left" },
    props.time)));



};

function Buttons(props) {
  return (
    React.createElement("div", null,
    React.createElement("button", { id: props.id, class: "btn", onClick: props.handleReset != undefined ? props.handleReset : props.startTimer },
    props.name === "reset" ? "RESET" : props.running === false ? "START" : "STOP")));



};

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      break: 5,
      session: 25,
      running: false,
      time: 1500,
      phase: "set" };

    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.startStopTimer = this.startStopTimer.bind(this);
    this.timer = this.timer.bind(this);
    this.format = this.format.bind(this);
    this.startSound = this.startSound.bind(this);
  }

  componentDidUpdate() {
    if (this.state.time < 0 && this.state.phase === "session") {
      this.startSound();
      clearInterval(this.time);
      this.setState({
        phase: "break",
        time: this.state.break * 60 });

      this.timer();
      return;
    }

    if (this.state.time < 0 && this.state.phase === "break") {
      this.startSound();
      clearInterval(this.time);
      this.setState({
        phase: "session",
        time: this.state.session * 60 });

      this.timer();
      return;
    }

  }

  handleIncrement(event) {

    if (this.state.phase === "set") {
      let value;
      if (event.target.id.charAt(0) === "b") {

        if (this.state.break > 1 && this.state.break < 60) {
          value = eval(this.state.break + event.target.value + 1);

          return this.setState({
            break: value });

        }
        return;
      }
      if (this.state.session > 1 && this.state.session < 60) {
        value = eval(this.state.session + event.target.value + 1);

        return this.setState({
          session: value,
          time: value * 60 });


      }
    }
  }

  startStopTimer() {

    if (this.state.phase === "set") {
      this.setState({
        phase: "session" });

    }

    if (!this.state.running) {
      this.setState({
        running: true });

      this.timer();
      return;
    }
    this.setState({
      running: false });

    clearInterval(this.time);

  }

  timer() {
    this.time = setInterval(() => this.setState({ time: this.state.time - 1 }), 1000);
  }

  format() {
    let sec = this.state.time % 60;
    let min = Math.floor(this.state.time / 60);

    min < 10 ? min = "0" + min : null;
    sec < 10 ? sec = "0" + sec : null;

    return min + ":" + sec;
  }

  startSound() {
    this.audio.play();
    this.audio.currentTime = 0;
  }

  handleReset() {
    clearInterval(this.time);
    this.setState({
      break: 5,
      session: 25,
      running: false,
      time: 1500,
      phase: "set" });

    this.audio.pause();
    this.audio.currentTime = 0;

  }

  render() {
    return (
      React.createElement("div", { id: "element" },

      React.createElement("div", { id: "timer-length", class: "row" },
      React.createElement(Timer, {
        id: "break",
        value: this.state.break,
        handleIncrement: this.handleIncrement }),

      React.createElement(Timer, {
        id: "session",
        value: this.state.session,
        handleIncrement: this.handleIncrement })),


      React.createElement("div", { id: "disp" },
      React.createElement(Display, {
        time: this.format(),
        phase: this.state.phase }),


      React.createElement("div", { id: "start-reset", className: "row justify-content-center" },
      React.createElement(Buttons, {
        id: "start_stop",
        name: "start",
        startTimer: this.startStopTimer,
        running: this.state.running }),


      React.createElement(Buttons, {
        id: "reset",
        name: "reset",
        handleReset: this.handleReset })),


      React.createElement("audio", {
        id: "beep",
        src: "http://soundbible.com/grab.php?id=2176&type=mp3",
        ref: ref => this.audio = ref }))));







  }}




ReactDOM.render(React.createElement(App, null), document.getElementById("wrapper"));