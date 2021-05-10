import React from "react";
import "./App.css";

class App extends React.PureComponent {
  constructor() {
    super();

    const now = new Date();
    const [hours, minutes, seconds] = [
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
    ];

    this.state = {
      hours,
      minutes,
      seconds,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    setInterval(() => {
      this.setState((prevState) => {
        let seconds = prevState.seconds + 1;
        let minutes = prevState.minutes;
        let hours = prevState.hours;

        if (seconds >= 60) {
          minutes++;
          seconds = 0;
        }
        if (minutes >= 60) {
          hours++;
        }
        return { seconds, minutes, hours };
      });
    }, 1000);
  }

  render() {
    const { seconds, minutes, hours } = this.state;
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <div className="clock-wrapper">
            {Array.from({ length: 60 }).map((_, i) => {
              const index = i + 1;
              const label = index % 5 === 0 ? index / 5 : "";
              const angle = index * 6;
              let entity = "";
              const key = `divider-${index}`;
              if (index % 5 === 0) {
                entity = "hour";
              }

              if (index % 15 === 0) {
                entity = "quarter";
              }

              if (entity) {
                const style = { transform: `rotate(${angle}deg)` };
                return (
                  <React.Fragment key={key}>
                    <div
                      style={style}
                      className={`diviper-partial ${entity}`}
                    />
                    <div style={style} className="diviper-partial label">
                      <div style={{ transform: `rotate(-${angle}deg)` }}>
                        {label}
                      </div>
                    </div>
                  </React.Fragment>
                );
              }
              return (
                <div
                  key={key}
                  style={{ transform: `rotate(${angle}deg)` }}
                  className="diviper-partial minute"
                />
              );
            })}

            <div className="clock" />
            <div className="clock-face minutes" />
            <div className="clock-face hours" />

            <div className="center" />
            <div
              style={this.getArrowStyle("seconds")}
              className="arrow seconds"
            />
            <div
              style={this.getArrowStyle("minutes")}
              className="arrow pointer"
            />
            <div
              style={this.getArrowStyle("hours")}
              className="arrow pointer hours"
            />
          </div>
        </header>
      </div>
    );
  }

  getArrowStyle(prop) {
    const value = this.state[prop];
    const angle =
      prop === "hours" ? (this.state.minutes / 60 + value) * 30 : value * 6;

    const styles = {
      transform: `rotate(${angle}deg) translateY(-${this.arrowHeight[prop]}%) `,
    };
    if (value === 0) {
      styles.transition = "none";
    }
    return styles;
  }

  arrowHeight = {
    minutes: 40,
    hours: 34,
    seconds: 34,
  };
}

export default App;
