require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var bodyParser = require('body-parser');


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
  let jobSearchResults = getJobInformation(req.body);

  Promise.all(jobSearchResults).then((completedSearches) => {

    // console.log(completedSearches);
    res.send({result: completedSearches});
  });
});

//NOTE: EACH METHOD SHOULD RETURN AN ARRAY OF ARRAYS, WHERE EACH ARRAY = PAGE OF RESULTS

function getJobInformation(criteriaObject) {
  let resultsArray = [];

  resultsArray[0] = stackoverflowSearch.stackoverflowJobSearch(criteriaObject).then((result) => {
    console.log("DONE 0");
    return result;
  }).catch((error) => {
    console.log("An error occurred when trying to display stack overflow search information");
    console.error(error);
  });

  resultsArray[1] = githubSearch.githubJobSearch(criteriaObject).then((result) => {
    console.log("DONE 1");
    return result;
  }).catch((error) => {
    console.log("An error occurred when trying to display github search information");
    console.error(error);
  });

  //IEEE SEARCH HAS PROBLEMS with large loads; actively limit them>
  if (criteriaObject.includeIEEE) {
    resultsArray[2] = ieeeSearch.ieeeJobSearch(criteriaObject).then((result) => {
      console.log("DONE 2");
      return result;
    }).catch((error) => {
      console.log("An error occurred when trying to display ieee search information");
      console.error(error);
    });
  }

  return resultsArray;
}
