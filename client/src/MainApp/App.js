import React, { Component } from 'react';
import './App.css';
import SearchForm from '../MainSearchScreen/scripts/SearchForm.js';
import SearchInformationDisplay from '../MainInformationDisplay/scripts/InformationDisplay.js';
import MainPageHeader from '../MainSearchScreen/scripts/MainPageHeader.js';
import MainPageFooter from '../MainSearchScreen/scripts/MainPageFooter.js';

const classNames = require("classnames");

class App extends Component {
  constructor() {
    super();
    this.state = {
      rawJobInfo: {},
      searchInformationReceived: false,
      processingInformation: false,
    };

    this.handleSearchFormCompletion = this.handleSearchFormCompletion.bind(this);
    this.completeWordAnalysis = this.completeWordAnalysis.bind(this);
  }


  handleSearchFormCompletion(searchCriteria) {
    //TODO: maybe do some things with pop up notifications and stuff?
    //TODO: maybe add animation for wait between submission and server send and response parse?
    //TODO: yell at people trying to GET this URL
    console.log(searchCriteria);
    this.setState({
      processingInformation: true
    });
    //TODO: processingInformation should be linked to visibility of loading ubbble
    //TODO: Change string(?) shown by loading bubble, ex: Fetching information, Processing information, etc...
    //NOTE: Inject hard coded JSON in here? to save on fetch processing time
    fetch("/searchForJobs", {
      body: JSON.stringify(searchCriteria),
      headers: {
        'content-type': 'application/json',
      },
      method: "POST",
    })
    .then((response) => {
      return response.json();
    })
    .then((responseInfo) => {
      this.setState({
        rawJobInfo: responseInfo
      });
      // console.log(this.state.rawJobInfo);
      this.startWordAnalysis();
      //TODO: call method that makes stuff happen, activates word analysis component and starts processing.
    })
    .catch((error) => {
      console.log("Error occurred trying to communicate with server in method handleSearchFormCompletion");
      console.error(error);
    });
  }

  startWordAnalysis() {
    //TODO: activate a loading screen of some sort over the entire page?
    this.setState({
      searchInformationReceived: true
    });
  }

  completeWordAnalysis() {
    this.setState({
      processingInformation: false
    });
  }

  //TODO: Sliding animation in/out?
  //TODO: cache information? avoid wait for requests? but get loading thing working first xd

  //TODO: Display information (with charts? graphs? idk)
  //TODO: Offer user ability to look at leftover info (?), show ads?

  //TODO: Re wire front end to backend, different formats require different solutions than the ones I used previously



  /*CURRENT PRIORITY LIST:
    1) Figure out how the information should look in final state.
    2) Implement the "search by keyword" functionality (on the same original field?) (also add in the IEEE problem option)
    2.5) Maybe add resume scanning?
    3) Information should be obtainable by "flipping through" pages; maybe a page for word statistics, graphs and tables, keyword analysis, etc?
          Most popular languages, frameworks, etc? give specific categories and options?
          Work on optimizing word analysis?
          cards? languages, frameworks, buzzwords (select data to display, graph dynamically displays it)? also by job category (github, stack overflow, IEEE)
          graphs, tables, keyword specific (if selected) stuff (sentence snippets, jobs that used the term, etc)
    4) CSSify and make pretty
    5) Optimize for mobile
    6) Work with sanitizing input, fixing smaller bugs
    */

    //moveup/down animation to show info, moveup animation to go back,
    //slide motion (right, left) to switch between graphs and tables and maybe a resume slider?

    //search form completion, loading blurb (with option to cancel?)
    //add cover div as well?


  render() {
    return (
      <div className="application-body">
        <div>
          <MainPageHeader />
          <SearchForm
            handleSearchFormCompletion={this.handleSearchFormCompletion}
          />
          <MainPageFooter />
        </div>
        <div>
          {this.state.searchInformationReceived && <SearchInformationDisplay
            rawJobInfo={this.state.rawJobInfo}
            completeWordAnalysis={this.completeWordAnalysis}
          />}
        </div>
      </div>
    );
  }
}

export default App;
