
//TODO: https://stackoverflow.com/jobs?sort=i&q=software&l=London&d=50&u=Miles&j=permanent

//https://stackoverflow.com/jobs/feed?q=software&l=plano&d=50&u=Miles&j=permanent
//https://stackoverflow.com/jobs/feed?q=software&l=plano&d=50&u=Miles
//https://stackoverflow.com/jobs/feed?q=software

const rp = require("request-promise-native");
const parseString = require('xml2js').parseString;

const SO_BASE_URL = "https://stackoverflow.com/jobs/feed?q=";

function getJobs(searchCriteria) {
  //TODO: Add pages to URL search, make multiple requests before resolving?
  return new Promise(function(resolve, reject) {
    let targetURL = SO_BASE_URL;
    console.log(searchCriteria);

    targetURL = `${targetURL}${searchCriteria.description}`;
    if (searchCriteria.location !== "") {
      targetURL = `${targetURL}&l=${searchCriteria.location}&d=50&u=Miles`;
    }
    if (searchCriteria.fulltime) {
      targetURL = `${targetURL}&j=permanent`;
    }

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

        for (let item of result.rss.channel[0].item) {
          let offerObject = {};
          let offerDescription = "";
          for (let category of item.category) {
            offerDescription += (category + " ");
          }
          offerDescription += item.description;
          console.log(offerDescription);

          offerObject.description = offerDescription;
          offerObject.title = item.title;
          offerObject.link = item.link;
          offers[index] = offerObject;
          index++;
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


module.exports = {
  stackoverflowJobSearch: getJobs,
}
