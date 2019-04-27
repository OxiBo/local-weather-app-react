import React, { Component } from 'react'

export default class SearchBar extends Component {
    state = {
        interval: ""
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.interval)
    }
  render() {
    return (
      <div>
      <form onSubmit={this.onFormSubmit} action="">
                <label htmlFor="interval">Update every</label>
                <input
                  type="number"
                  id="interval"
                  name="interval"
                  min="1"
                  max="24"
                  placeholder="Enter interval in hours"
                  autoComplete="off"
                  value={this.state.interval}
                  onChange={(e) => this.setState({interval: e.target.value })}
                />
                <p>hour(s)</p>
              </form>
      </div>
    )
  }
}


