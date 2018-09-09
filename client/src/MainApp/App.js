import React, { Component } from 'react';
import './App.css';
import MainSearchScreen from '../MainSearchScreen/scripts/MainSearchScreen.js';
import LoadingBlurb from '../MainSearchScreen/scripts/LoadingBlurb.js';

import SearchInformationDisplay from '../MainInformationDisplay/scripts/InformationDisplay.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      rawJobInfo: {}, //rawjobinfo also contains hasKeywords and the keywords array
      processingInformation: false,
      searchInformationReceived: false,
      informationProcessingComplete: false,
      searchScreenClasses: "showUpTop",
      infoDisplayClasses: "hideDownBelow notDisplayed",
    };

    this.handleSearchFormCompletion = this.handleSearchFormCompletion.bind(this);
    this.completeWordAnalysis = this.completeWordAnalysis.bind(this);
  }

  handleSearchFormCompletion(searchCriteria) {
    console.log(searchCriteria.keywords);
    this.setState({ processingInformation: true });

    //NOTE: Inject hard coded JSON in here? to save on fetch processing time
    fetch("/searchForJobs", {
      body: JSON.stringify(searchCriteria),
      headers: { 'content-type': 'application/json' },
      method: "POST",
    })
    .then((response) => {
      return response.json();
    })
    .then((responseInfo) => {
      if (searchCriteria.keywords) {
        responseInfo.keywords = searchCriteria.keywords;
      }
      this.setState({ rawJobInfo: responseInfo });
      this.startWordAnalysis();
    })
    .catch((error) => {
      console.log("Error occurred trying to communicate with server in method handleSearchFormCompletion");
      console.error(error);
    });
  }

  startWordAnalysis() {
    this.setState({
      searchInformationReceived: true,
      infoDisplayClasses: "hideDownBelow"
    });
  }

  completeWordAnalysis() {
    //process screen change first, then set states

    //Shenanigans to control frame changes.
    window.scroll({
      top: 0
    });

    setTimeout(() => {
      this.setState({
        searchScreenClasses: "hideUpTop",
        infoDisplayClasses: "showDownBelow"
      });
      window.scroll({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }, 50);

    setTimeout(() => {
      //combine them?
      this.setState({
        searchScreenClasses: "hideUpTop notDisplayed"
      });
      this.setState({
        processingInformation: false,
        informationProcessingComplete: true,
      });
    }, 400);
  }

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

    //TODO: COMPLETE IEEE SEARCH, GET HARDCODED INFO??, MAKE SURE ALL SEARCHES WORK IN TANDEM


  render() {
    return (
      <div className="application-body">
        <div className={this.state.searchScreenClasses}>
          <MainSearchScreen
            handleSearchFormCompletion={this.handleSearchFormCompletion}
            processingInformation={this.state.processingInformation}
            informationProcessingComplete={this.state.informationProcessingComplete}
          />
          <LoadingBlurb
            processingInformation={this.state.processingInformation}
            searchInformationReceived={this.state.searchInformationReceived}
            // informationProcessingComplete={this.state.informationProcessingComplete}
          />
        </div>
        <div className={this.state.infoDisplayClasses}>
          {this.state.searchInformationReceived &&
            <SearchInformationDisplay
              rawJobInfo={this.state.rawJobInfo}
              completeWordAnalysis={this.completeWordAnalysis}
            />}
        </div>
      </div>
    );
  }
}

export default App;
