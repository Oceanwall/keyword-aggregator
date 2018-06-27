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
      showMoreIEEE: false,
      showMoreParse: false,
      showMoreHightlight: false,
      showOptionalFields: false,
      optionalFieldsStatus: "Show",
      handleSearchFormCompletion: props.handleSearchFormCompletion,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showMoreInfo = this.showMoreInfo.bind(this);
    this.toggleOptionalFields = this.toggleOptionalFields.bind(this);
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

  //TODO: Is name correct? Maybe make custom attribute?
  showMoreInfo(event) {
    this.setState({
      [event.target.name]: !this.state[event.target.name]
    });
  }

  toggleOptionalFields(event) {
    this.setState({
      optionalFieldsStatus: this.state.showOptionalFields ? "Show" : "Hide",
      showOptionalFields: !this.state.showOptionalFields,
    });
  }

  //TODO: WIRE THESE BOYS BELOW UP
  //TODO: Expand for more info?
  //TODO: Compress options when checking, uncompress if canceled? or dont allow cancel, could be dangerous
  //TODO: color scheme?
  //TODO: initially have "job name" in middle, then move up if "optional items" is clicked. also have it initially be larger
  //TODO: If you're willing to stomach the pain, the entry divs could be further componentized...
  //TODO: first page mostly white and black, splash lots of color on following pages

  render() {
    return (
      <form onSubmit = {this.handleSubmit}>

        <section className={(this.state.showOptionalFields) ? "normalTopEntry" : "onlyEntry"}>
          <div className="entry" id="job-entry">
            <label className="entry-label onlyEntry-largeLabel">Job title</label>
            {/* TODO: Add input pre-text? */}
            <input type="text" value={this.state.description} onChange={this.handleChange} name="description" required className="entry-job onlyEntry-largeInput"></input>
          </div>

          <h3 onClick={this.toggleOptionalFields}><img src="./images/info-arrow.png" className={(this.state.showOptionalFields) ? "triangle-showMore" : "triangle-showMore triangle-showedMore"}/>{this.state.optionalFieldsStatus} optional fields</h3>
        </section>

        <section className={(this.state.showOptionalFields) ? 'showOptionalFields' : 'hide'}>
          <div className="entry">
            <label className="entry-label">Job location</label>
            <input type="text" value={this.state.location} onChange={this.handleChange} name="location"></input>
          </div>

          <div className="entry">
            <label className="entry-label">Only full time jobs?</label>
            <select value={this.state.fulltime} onChange={this.handleChange} name="fulltime">
              <option value={false}>Doesn't matter</option>
              <option value={true}>40 hours a week, yessir!</option>
            </select>
          </div>

          <div className="entry">
            <label className="entry-label">Include jobs from IEEE?</label>
            <img className={(this.state.showMoreIEEE) ? "entry-showedMore entry-showMore" : "entry-showMore"} src="./images/info-plus.png" onClick={this.showMoreInfo} name="showMoreIEEE"/>
            <label className={(this.state.showMoreIEEE) ? "entry-additionalInfoShown" : "hide"}>IEEE jobs are much more biased towards hardware jobs. Selecting this option will introduce jobs that combine both software and significant amounts of hardware expertise.</label>
            <select value={this.state.includeIEEE} onChange={this.handleChange} name="includeIEEE">
              <option value={false}>Leave them out</option>
              <option value={true}>I love hardware!</option>
            </select>
          </div>

          <div className="entry">
            <label className="entry-label">How many results should we parse through?</label>
            <img className={(this.state.showMoreParse) ? "entry-showedMore entry-showMore" : "entry-showMore"} src="./images/info-plus.png" src="./images/info-plus.png" onClick={this.showMoreInfo} name="showMoreParse"/>
            <label className={(this.state.showMoreParse) ? "entry-additionalInfoShown" : "hide"}>Parsing through more results will take a longer time, but should provide more sensible statistical results. The Law of Large Numbers, right?</label>
            <select value={this.state.searchScope} onChange={this.handleChange} name="scope">
              <option value={"small"}>A few hundred...</option>
              <option value={"medium"}>Try for a thousand!</option>
              <option value={"large"}>Give me all you got!</option>
            </select>
          </div>

          <div className="entry">
            <label className="entry-label">Keyword Highlight</label>
            <img className={(this.state.showMoreHightlight) ? "entry-showedMore entry-showMore" : "entry-showMore"} src="./images/info-plus.png" onClick={this.showMoreInfo} name="showMoreHightlight"/>
            <label className={(this.state.showMoreHightlight) ? "entry-additionalInfoShown" : "hide"}>Pass up to three keywords for the program to specifically focus on. Additional information will be provided about each of those keywords, including sentences in which they're used, some job listings that mention the keyword, and more!</label>
            <div className="entry-keywordContainer">
              <input type="text" value={this.state.keyword1} onChange={this.handleChange} name="keyword1" className="entry-keywordContainer-box"></input>
              <input type="text" value={this.state.keyword2} onChange={this.handleChange} name="keyword2" className="entry-keywordContainer-box"></input>
              <input type="text" value={this.state.keyword3} onChange={this.handleChange} name="keyword3" className="entry-keywordContainer-box"></input>
            </div>
          </div>
        </section>

        <input type="submit" value="Submit"></input>
      </form>
    );
  }
}


export default SearchForm;
