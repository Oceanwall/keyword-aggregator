const rp = require("request-promise-native");
const GITHUB_BASE_URL = "https://jobs.github.com/positions.json?";

function getJobs(searchCriteria) {
  //TODO: Add pages to URL search, make multiple requests before resolving?
  return new Promise(function(resolve, reject) {
    //to add page #; append onto end &page=#
    let targetURL = GITHUB_BASE_URL;
    let objectPairings = Object.entries(searchCriteria);

    //TODO: MAKE CHANGES TO THIS SO THAT IT RESPECTS THE CRITERIA
    //object params (if non falsey):

    for (let i = 0; i < objectPairings.length; i++) {
      targetURL = `${targetURL}${objectPairings[i][0]}=${objectPairings[i][1]}&`;
    }
    console.log(targetURL);

    let options = {
        uri: targetURL,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true,
    };

    rp(options)
    .then((response) => {
      // console.log(response);
      resolve(response);
    })
    .catch((error) => {
      console.error(error);
      reject(error);
    });
  });
}


module.exports = {
  githubJobSearch: getJobs,
}
