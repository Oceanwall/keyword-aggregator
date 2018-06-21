const rp = require("request-promise-native");
const parseString = require('xml2js').parseString;

const IEEE_BASE_URL = "https://jobs.ieee.org/jobs/results/keyword/";
const IEEE_RSS_URL = "?view=List&format=rss";
const cheerio = require('cheerio');

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
          let jobOfferOptions = {uri: item.link[0], json: true};
          let jobDescription = "";

          offers[index] = rp(jobOfferOptions).then((jobOfferPage) => {
            let $ = cheerio.load(jobOfferPage);

            $("*[itemprop = 'description']").each((index, elem) => {
              jobDescription += ($(elem).html() + " ");
            });

            let offerObject = {description: jobDescription, title: item.title[0], link: item.link[0]};
            return offerObject;
          });
          index++;
        }

        //NOTE: Slow server side waiting? is this correct?
        Promise.all(offers).then((completedOfferInquiries) => {
          resolve(completedOfferInquiries);
        });
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
