import React, { Component } from 'react';

import SearchForm from './SearchForm.js';
import MainPageHeader from './MainPageHeader.js';
import MainPageFooter from './MainPageFooter.js';
import '../styles/MainSearchScreen.css';


//TODO: COLLAPSE THE SEARCH FORM WHEN SUBMIT IS PRESSED SO THAT USER IS FORCEFULLY REVERTED TO ONE PAGE VIEW
class MainSearchScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      handleSearchFormCompletion: props.handleSearchFormCompletion,
      processingInformation: props.processingInformation,
      informationProcessingComplete: props.informationProcessingComplete
    }
  }

  //mfw componentWillReceiveProps has been deprecated ://
  componentDidUpdate(prevProps) {
    if (this.props.processingInformation != prevProps.processingInformation) {
      this.setState({
        processingInformation: this.props.processingInformation
      });
    }
  }

  render() {
    return (
      <div className={(this.state.processingInformation) ? "blurOutForm" : ""}>
        <MainPageHeader />
        <SearchForm
          handleSearchFormCompletion={this.state.handleSearchFormCompletion}
          processingInformation={this.state.processingInformation}
        />
        <MainPageFooter />
      </div>
    );
  }

}


export default MainSearchScreen;
