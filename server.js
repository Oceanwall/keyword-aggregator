require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var bodyParser = require('body-parser');

// const {google} = require('googleapis');
// const discoveryDoc = 'discoverydoc.json';
// const key = require('./credentials.json');

// const googleSearch = require("./scripts/googleJobSearch");
const githubSearch = require("./scripts/githubJobSearch");
const ieeeSearch = require("./scripts/ieeeJobSearch");
const stackoverflowSearch = require("./scripts/stackoverflowJobSearch");

//NOTE: Remove unused modules when project is complete
//NOTE: End of import code here ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//TODO: Separate code out into modules, call when needed.

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/searchForJobs', (req, res) => {
  let jobSearchResults = [];
  // jobSearchResults[0] = ieeeSearch.ieeeJobSearch(req.body).then((result) => {
  //   console.log("DONE 0");
  //   return result;
  // }).catch((error) => {
  //   console.log("An error occurred when trying to display ieee search information");
  //   console.error(error);
  // });
  //
  // jobSearchResults[1] = stackoverflowSearch.stackoverflowJobSearch(req.body).then((result) => {
  //   console.log("DONE 1");
  //   return result;
  // }).catch((error) => {
  //   console.log("An error occurred when trying to display stack overflow search information");
  //   console.error(error);
  // });

  //TODO: CHANGE THIS BACK TO 2 WHEN DONE WITH TESTING PURPOSES
  jobSearchResults[0] = githubSearch.githubJobSearch(req.body).then((result) => {
    console.log("DONE 2");
    return result;
  }).catch((error) => {
    console.log("An error occurred when trying to display github search information");
    console.error(error);
  });

  Promise.all(jobSearchResults).then((completedSearches) => {
    console.log("DONE 333");
    res.send({result: completedSearches});
  });
});
