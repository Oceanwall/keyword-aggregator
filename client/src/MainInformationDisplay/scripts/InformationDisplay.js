import React, { Component } from 'react';
import '../styles/InformationDisplay.css';
const wordAnalysis = require("./wordAnalysis");

//TODO: Separate this component out into more child components?
//Like advertisements for jobs, example jobs, more buttons, etc...
class SearchInformationDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawInfo: props.rawJobInfo,
      wordFrequencies: {},
      formattedJobs: [],
      leftoverString: "",
      completeWordAnalysis: props.completeWordAnalysis,
      processComplete: false,
    }
  }

  componentDidMount() {
    this.processInformation();
  }

  //TODO: Set up keyword searches in rawInfo, get keyword associated data.
  processInformation() {
    console.log(this.state.rawInfo);
    this.setState({
      wordFrequencies: wordAnalysis.analyzeWords(this.state.rawInfo),
      formattedJobs: wordAnalysis.getJobs(this.state.rawInfo)
    });
    this.state.completeWordAnalysis();
    this.renderInformation();
  }

  renderInformation() {
    //TODO: Determine the form that this information should take? Pie graph? table? and make child component to work with that.
    //May require another loading screen "rendering information"
    this.setState({
      // keywordHightlights: wordAnalysis.processKeywords
      processComplete: true
    });
  }

  //TODO: COMPONENTIZE THIS and make them non visible? or at least visibility hidden until ready? and use display: inline and position absolute to hide? idk
  render() {
    return (
      <div>
        {this.state.processComplete &&
          <div>{this.state.wordFrequencies.sortedPairings.all}</div>
        }
      </div>
    );
  }
}

export default SearchInformationDisplay;
