import React, { Component } from 'react';
import './App.css';
import SearchForm from './SearchForm.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: ""
    };

    this.handleSearchFormCompletion = this.handleSearchFormCompletion.bind(this);
  }


  handleSearchFormCompletion(searchCriteria) {
    //TODO: maybe do some things with pop up notifications and stuff?
    //TODO: maybe add animation for wait between submission and server send and response parse?
    //TODO: yell at people trying to GET this URL
    console.log(searchCriteria);
    fetch("/searchForJobs", {
      body: JSON.stringify(searchCriteria),
      headers: {
        'content-type': 'application/json',
      },
      method: "POST",
    })
    .then((response) => {
      //TODO: return response.json()? Promise chaining is cleaner?
      response.json().then((data) => {
        // console.log(data);
      });
    })
    .catch((error) => {
      console.log("Error occurred trying to communicate with server in method handleSearchFormCompletion");
      console.error(error);
    });
  }

//TODO: Add prop method to lift state when form is completed.

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }
  //
  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();
  //
  //   if (response.status !== 200) throw Error(body.message);
  //
  //   return body;
  // };

  render() {
    return (
      <div>
        <SearchForm
          handleSearchFormCompletion={this.handleSearchFormCompletion}
        />
      </div>
    );
  }
}

export default App;
