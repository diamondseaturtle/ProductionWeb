import React, { Component } from 'react';

export default class ListForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      textField: "",
      time: "",
      authorField: ""
      
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onAddListItem(this.state.textField, this.state.authorField);
    this.setState({ textField: "", time: "", authorField: ""});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label for="1">Author: </label>
        <br />
        <input
          type="text"
          id="1"
          onChange={this.handleChange}
          value={this.state.authorField}
          name="authorField"
          className="form-control"
          placeholder="Add author here (Default: Anonymous)"
          aria-label="Add author here (Default: Anonymous)"
        />
        <br />
        <label for="2">Message: </label>
        <br />
        <textarea
          //type="textarea"
          id="2"
          onChange={this.handleChange}
          value={this.state.textField}
          name="textField"
          className="form-control"
          placeholder="Add text here..."
          aria-label="Add text here..."
        />
        <br />
        <button type="submit" className="btn btn-primary ml-2">
          Submit
        </button>
        
      </form>
      
    );
  }
}