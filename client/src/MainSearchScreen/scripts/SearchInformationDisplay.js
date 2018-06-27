import React, { Component } from 'react';
import '../styles/SearchInformationDisplay.css';
const wordAnalysis = require("./wordAnalysis");

//TODO: Separate this component out into more child components?
//Like advertisements for jobs, example jobs, more buttons, etc...
//TODO: THIS SHOULDNOT BE IN MAIN SEARCH SCREEN; MOVE??
class SearchInformationDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawInfo: props.rawJobInfo,
      processedInfo: [],
      leftoverString: "",
      completeWordAnalysis: props.completeWordAnalysis,
      processComplete: false,
    }
  }

  componentDidMount() {
    this.processInformation();
  }

  processInformation() {
    this.setState({
      processedInfo: wordAnalysis.analyzeWords(this.state.rawInfo),
    });
    this.state.completeWordAnalysis();
    this.renderInformation();
  }

  renderInformation() {
    //TODO: Determine the form that this information should take? Pie graph? table? and make child component to work with that.
    this.setState({processComplete: true});
  }

  render() {
    return (
      <div>
        <div>hello world</div>
        <div>{this.state.processedInfo.sortedPairings}</div>
      </div>
    );
  }
}

export default SearchInformationDisplay;
