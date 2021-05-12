import React from "react";
import "./App.css";

class App extends React.PureComponent {
  timer;
  constructor() {
    super();

    const [hours, minutes, seconds] = this.getInitialTime();

    this.state = {
      angle: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      hours,
      minutes,
      seconds,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  getInitialTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    if (hours > 12) {
      hours = hours - 12;
    }
    return [hours, minutes, seconds];
  };

  startTimer() {
    this.timer = setInterval(() => {
      this.setState((prevState) => {
        let seconds = prevState.seconds + 1;
        let minutes = prevState.minutes;
        let hours = prevState.hours;
        const angle = prevState.angle;

        if (seconds >= 60) {
          minutes++;
          seconds = 0;
        }
        if (minutes >= 60) {
          hours++;
          minutes = 0;
        }
        if (hours >= 12) {
          hours = 0;
        }

        return {
          seconds,
          minutes,
          hours,
          angle: {
            hours: angle.hours
              ? minutes !== prevState.minutes
                ? this.fixNumber(angle.hours + 0.5)
                : angle.hours
              : this.getAngle(hours, "hours"),
            minutes: angle.minutes
              ? this.fixNumber(angle.minutes + 0.1)
              : this.getAngle(minutes, "minutes"),
            seconds: angle.seconds ? angle.seconds + 6 : this.getAngle(seconds),
          },
        };
      });
    }, 1000);
  }

  fixNumber = (num) => Number(num.toFixed(2));

  render() {
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

  getAngle(value, prop) {
    if (prop && prop === "hours") {
      return (this.state.minutes / 60 + value) * 30;
    }
    if (prop && prop === "minutes") {
      return (this.state.seconds / 60 + value) * 6;
    }
    return value * 6;
  }

  getArrowStyle(prop) {
    const { angle } = this.state;

    const styles = {
      transform: `rotate(${angle[prop]}deg) translateY(-${this.arrowHeight[prop]}%) `,
    };
    return styles;
  }

  arrowHeight = {
    minutes: 40,
    hours: 34,
    seconds: 34,
  };
}

export default App;
