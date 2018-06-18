import React, { Component } from 'react';
import './App.css';
import SearchForm from './SearchForm.js';
import SearchInformationDisplay from './SearchInformationDisplay.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      rawJobInfo: {},
      informationReceived: false,
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
      informationReceived: true
    });
  }

  completeWordAnalysis() {
    this.setState({
      processingInformation: false
    });
  }

  //TODO: Sliding animation in/out?

  render() {
    return (
      <div>
        <SearchForm
          handleSearchFormCompletion={this.handleSearchFormCompletion}
        />
        {this.state.informationReceived && <SearchInformationDisplay
          rawJobInfo={this.state.rawJobInfo}
          completeWordAnalysis={this.completeWordAnalysis}
        />}
      </div>
    );
  }
}

export default App;
