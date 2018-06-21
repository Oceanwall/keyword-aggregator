import React, { Component } from 'react';
import '../styles/SearchForm.css';

//TODO: Form Validation? with colors and shit, maybe prevent default browser icon from appearing?
//TODO: Validate text, ensure that script tags can't be executed
//TODO: Include option to include/exclude IEEE (More hardware based jobs)
//TODO: Autocomplete, spelling checker? maybe integrate google cloud job search API or some other spell checker this way?
//TODO: wipe out fields on submit, or blur? or do something so that they can't mess with it.

//URGENT TODO: FOR EACH WORD IN THE DESCRIPTION, ADD A + SIGN BETWEEN THEM (?)
//URGENT TODO: DO NOT ALLOW SPACES IN LOCATION

class SearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //TODO: Add more fields? For now, description, location, fulltime?
      description: "",
      location: "",
      fulltime: false,
      searchScope: "small",
      includeIEEE: false,
      keyword1: "",
      keyword2: "",
      keyword3: "",
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

  //TODO: WIRE THESE BOYS BELOW UP

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
            <option value={false}>Doesn't matter</option>
            <option value={true}>40 hours a week, yessir!</option>
          </select>
        </div>

        <div>
          <label>Include jobs from IEEE? (optional)</label>
          <label>Note: IEEE jobs are much more biased towards hardware jobs. Selecting this option will introduce jobs that combine both software and significant amounts of hardware expertise.</label>
          <select value={this.state.includeIEEE} onChange={this.handleChange} name="includeIEEE">
            <option value={false}>Leave them out</option>
            <option value={true}>I love hardware!</option>
          </select>
        </div>

        <div>
          <label>How many results should we parse through? (optional)</label>
          <label>Note: Parsing through more results will take a longer time, but should provide more sensible statistical results. The Law of Large Numbers, right?</label>
          <select value={this.state.searchScope} onChange={this.handleChange} name="scope">
            <option value={"small"}>A few hundred...</option>
            <option value={"medium"}>Try for a thousand!</option>
            <option value={"large"}>Give me all you got!</option>
          </select>
        </div>

        <div>
          <label>Keyword Highlight (optional)</label>
          <label>Pass up to three keywords for the program to specifically focus on. Additional information will be provided about each of those keywords, including sentences in which they're used, some job listings that mention the keyword, and more!</label>
          <input type="text" value={this.state.keyword1} onChange={this.handleChange} name="keyword1"></input>
          <input type="text" value={this.state.keyword2} onChange={this.handleChange} name="keyword2"></input>
          <input type="text" value={this.state.keyword3} onChange={this.handleChange} name="keyword3"></input>
        </div>

        <input type="submit" value="Submit!"></input>
      </form>
    );
  }
}


export default SearchForm;
