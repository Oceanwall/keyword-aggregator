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
      this.changeMessage();
    }
  }

  changeMessage() {
    if (this.state.searchInformationReceived) {
      this.setState({
        loadingStatus: "Currently sorting and organizing information"
      });
    }
    else if (this.state.processingInformation) {
      this.setState({
        loadingStatus: "Currently fetching job data"
      });
    }
  }

  render() {
    return (
      <div className={(this.state.processingInformation) ? "loadingInfoBlurb" : "loadingInfoBlurb hide"}>{this.state.loadingStatus}, please wait!</div>
    );
  }

}


export default LoadingBlurb;
