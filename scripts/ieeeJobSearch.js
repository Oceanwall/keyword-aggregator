const rp = require("request-promise-native");
const parseString = require('xml2js').parseString;

const IEEE_BASE_URL = "https://jobs.ieee.org/jobs/results/keyword/";
const IEEE_RSS_URL = "?view=List&format=rss";

function getJobs(searchCriteria) {
  //TODO: Add pages to URL search, make multiple requests before resolving?
  return new Promise(function(resolve, reject) {
    let targetURL = IEEE_BASE_URL;
    console.log(searchCriteria);

    targetURL = `${targetURL}${searchCriteria.description}`;
    if (searchCriteria.location != "") {
      targetURL = `${targetURL}/${searchCriteria.location}?radius=50&SearchNetworks=US&networkView=national`;
    }
    targetURL = `${targetURL}${IEEE_RSS_URL}`;

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
          //TODO: description does not provide enough :///, go grab actual page? make async?
          // let offerObject = {description: item.description[0], title: item.title[0], link: item.link[0]};
          // offers[index] = offerObject;
          console.log(item);
          console.log("NEW ITEM");
          index++;
        }

        resolve(offers);
        // console.log(result.rss.channel[0].item);
      });
    })
    .catch((error) => {
      console.error(error);
      reject(error);
    });
  });
}


module.exports = {
  ieeeJobSearch: getJobs,
}
