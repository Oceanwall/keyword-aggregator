import React, { Component } from 'react';
import './SearchForm.css';

//TODO: Form Validation? with colors and shit, maybe prevent default browser icon from appearing?
//TODO: Validate text, ensure that script tags can't be executed
//TODO: Include option to include/exclude IEEE (More hardware based jobs)
//TODO: Autocomplete, spelling checker? maybe integrate google cloud job search API or some other spell checker this way?
//TODO: wipe out fields on submit, or blur? or do something so that they can't mess with it.

//URGENT TODO: FOR EACH WORD IN THE DESCRIPTION, ADD A + SIGN BETWEEN THEM
//URGENT TODO: DO NOT ALLOW SPACES IN LOCATION

class SearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //TODO: Add more fields? For now, description, location, fulltime?
      description: "",
      location: "",
      fulltime: false,
      handleSearchFormCompletion: props.handleSearchFormCompletion,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // this.state.handleSearchFormCompletion(this.state);
    let searchCriteriaObject = {};
    for (let property in this.state) {
      searchCriteriaObject[property] = this.state[property];
    }
    console.log(searchCriteriaObject);
    this.state.handleSearchFormCompletion(searchCriteriaObject);
  }

  render() {
    return (
      <form onSubmit = {this.handleSubmit}>
        <div>
          <label>Job title</label>
          {/* TODO: Add input pre-text? */}
          <input type="text" value={this.state.description} onChange={this.handleChange} name="description" required></input>
        </div>

        <div>
          <label>Job location (optional)</label>
          <input type="text" value={this.state.location} onChange={this.handleChange} name="location"></input>
        </div>

        <div>
          <label>Only full time jobs? (optional)</label>
          <select value={this.state.fulltime} onChange={this.handleChange} name="fulltime">
            <option value={false}>Nah, I don't care</option>
            <option value={true}>40 hours a week, yessir</option>
          </select>
        </div>

        {/* TODO: How many results do you want us to parse through (a lot, a few, some) */}

        <input type="submit" value="Submit!"></input>
      </form>
    );
  }
}


export default SearchForm;
