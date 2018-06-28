import React, { Component } from 'react';
import '../styles/MainPageHeader.css';

class MainPageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreInfo: false
    }

    this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
  }

  toggleMoreInfo() {
    this.setState({
      showMoreInfo: !this.state.showMoreInfo,
    });
  }

  render() {
    return (
      <header>
        <img src="./images/info-bubble.png" alt="Hover over this bubble for additional information" className="information-bubble" onClick={this.toggleMoreInfo} />
        <h1>Keyword Aggregator</h1>
      <section className={(this.state.showMoreInfo) ? "moreInfo showMoreInfo" : "moreInfo hideMoreInfo"}>
          <p>This web application allows users to search through thousands of current computer science-related jobs, aggregating information about the keywords used by said job postings.</p>
          <p>Users can also use this application to search for the presence of specific keywords, including the listings that use them and the context in which they are used.</p>
          <p>To get started, go ahead and fill out the form below!</p>
        </section>
      </header>
    );
  }
}

export default MainPageHeader;
