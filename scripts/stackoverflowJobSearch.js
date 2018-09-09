const rp = require("request-promise-native");
const parseString = require('xml2js').parseString;

const SO_BASE_URL = "https://stackoverflow.com/jobs/feed?q=";

function getJobs(searchCriteria) {
  return new Promise(function(resolve, reject) {

    let jobPromiseArray = [];
    let numPages;
    switch(searchCriteria.scope) {
      case("small"):
        numPages = 2;
        break;
      case("medium"):
        numPages = 4;
        break;
      case("large"):
        numPages = 8;
        break;
    }

    for (let i = 1; i <= numPages; i++) {
      jobPromiseArray[i-1] = new Promise(function(resolve, reject) {
        let targetURL = SO_BASE_URL;

        targetURL += `${searchCriteria.description}`;

        if (searchCriteria.location) {
          targetURL += `&l=${searchCriteria.location}&d=50&u=Miles`;
        }

        if (searchCriteria.fulltime) {
          targetURL += `&j=permanent`;
        }
        //Page Number
        targetURL += `&pg=${i}`;

        console.log(targetURL);

        const options = {
          uri: targetURL,
          headers: {
            'User-Agent': 'Request-Promise'
          },
          json: true,
        };

        rp(options)
        .then((response) => {
          parseString(response, function (err, result) {
            let offers = [];
            let index = 0;
            // console.log(result);

            if (result.rss.channel[0].item) {
              for (let item of result.rss.channel[0].item) {
                let offerObject = {};
                let offerDescription = "";

                if (item.category) {
                  for (let category of item.category) {
                    offerDescription += (category + " ");
                  }
                }

                offerDescription += item.description;

                offerObject.description = offerDescription;
                offerObject.title = item.title;
                offerObject.link = item.link;
                // console.log(offerObject);
                offers[index] = offerObject;
                index++;
              }
            }
            resolve(offers);
          });
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
  stackoverflowJobSearch: getJobs,
}
