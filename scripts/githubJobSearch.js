const rp = require("request-promise-native");
const GITHUB_BASE_URL = "https://jobs.github.com/positions.json?";

function getJobs(searchCriteria) {
  return new Promise(function(resolve, reject) {
    let jobPromiseArray = [];
    let numPages;
    console.log(searchCriteria);
    switch(searchCriteria.scope) {
      case("small"):
        numPages = 3;
        break;
      case("medium"):
        numPages = 5;
        break;
      case("large"):
        numPages = 10;
        break;
    }

    for (let i = 1; i <= numPages; i++) {
      jobPromiseArray[i - 1] = new Promise(function(resolve, reject) {
        let targetURL = GITHUB_BASE_URL;

        //Description
        targetURL += `description=${searchCriteria.description}&`;

        //Location?
        if (searchCriteria.location) {
          targetURL += `location=${searchCriteria.location}&`;
        }

        //Fulltime?
        if (searchCriteria.fulltime) {
          targetURL += `full_time=${searchCriteria.fulltime}&`;
        }

        //Page Number
        targetURL += `page=${i}&`;

        let options = {
            uri: targetURL,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true,
        };

        rp(options)
        .then((response) => {
          if (response.length == 0) {
            //Stop the loop early if ran out of results.
            i = numPages + 1;
          }
          resolve(response);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });

      });
    }

    Promise.all(jobPromiseArray).then((completedSearches) => {
      resolve(completedSearches);
    });

  });
}


module.exports = {
  githubJobSearch: getJobs,
}
