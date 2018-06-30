import React, { Component } from 'react';
import '../styles/LoadingBlurb.css';

class LoadingBlurb extends Component {

  constructor(props) {
    super(props);
    this.state = {
      processingInformation: props.processingInformation,
      searchInformationReceived: props.searchInformationReceived,
      loadingStatus: "Currently fetching job data"
      // informationProcessingComplete: props.informationProcessingComplete,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.processingInformation != prevProps.processingInformation || this.props.searchInformationReceived != prevProps.searchInformationReceived) {
      this.setState({
        processingInformation: this.props.processingInformation,
        searchInformationReceived: this.props.searchInformationReceived,
      });
      this.changeMessage(this.props.processingInformation, this.props.searchInformationReceived);
    }
  }

  //TODO: make sure that this resets when user wants to search for another word?
  changeMessage(processingInformation, searchInformationReceived) {
    if (processingInformation && !searchInformationReceived) {
      this.setState({
        loadingStatus: "Currently fetching job data"
      });
    }
    else if (searchInformationReceived) {
      this.setState({
        loadingStatus: "Currently sorting and organizing information"
      });
    }

    console.log(searchInformationReceived);
  }

  render() {
    return (
      <div className={(this.state.processingInformation) ? "loadingInfoBlurb" : "loadingInfoBlurb hide"}>
        {this.state.loadingStatus}
        <div class="loader"></div>
      </div>
    );
  }

}


export default LoadingBlurb;
