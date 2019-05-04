import React, { Component } from "react";

export default class ToggleTemp extends Component {
  state = {
    displayTemp: null,
    fahrenheit: true,
    unit: "\u2103"
  };

  componentDidMount() {
    this.setState({
      displayTemp: this.props.temp.toFixed(1)
    });
  }

  // toggle temperature from degrees Celsius to Fahrenheit
  toggleTemp = () => {
    if (this.state.fahrenheit) {
      this.setState(prevState => ({
        displayTemp: (this.props.temp * 1.8 + 32).toFixed(2),
        unit: "\u2109",
        fahrenheit: !prevState.fahrenheit
      }));
    } else {
      this.setState(prevState => ({
        displayTemp: this.props.temp.toFixed(1),
        unit: "\u2103",
        fahrenheit: !prevState.fahrenheit
      }));
    }
  };

  render() {
    const { displayTemp, unit } = this.state;
    return (
      <div className="container-temp">
        <div className="inline-details" id="temp">
          {displayTemp}
        </div>
        <div className="inline-details" onClick={this.toggleTemp}>
          <div id="degrees">{unit}</div>
        </div>
      </div>
    );
  }
}
