import React, { Component } from "react";

export default class SearchBar extends Component {
  state = {
    interval: ""
  };

  onFormSubmit = async event => {
    event.preventDefault();
    this.props.onSubmit(this.state.interval);
    this.setState({ interval: "" }); // to clear input field
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} action="">
          <label htmlFor="interval">Update every</label>
          <input
            type="number"
            id="interval"
            name="interval"
            required
            min="1"
            max="24"
            placeholder="Enter interval in hours"
            autoComplete="off"
            value={this.state.interval}
            onChange={e => this.setState({ interval: e.target.value })}
          />
          <p>hour(s)</p>
        </form>
      </div>
    );
  }
}

// min="1"
//                   max="24"
