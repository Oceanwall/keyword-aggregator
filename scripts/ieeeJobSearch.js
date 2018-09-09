const rp = require("request-promise-native");
const parseString = require('xml2js').parseString;

const IEEE_BASE_URL = "https://jobs.ieee.org/jobs/results/keyword/";
const IEEE_RSS_URL = "?view=List&format=rss";
const cheerio = require('cheerio');

function getJobs(searchCriteria) {
  //TODO: Limit IEEE, as it takes the longest out of all the search options and is also the buggiest
  return new Promise(function(resolve, reject) {
    let jobPromiseArray = [];
    let numPages;
    switch(searchCriteria.scope) {
      //NOTE: CONNECTION GETS RESET BY IEEE, probably because too many calls? debug in future.
      case("small"):
        numPages = 1;
        break;
      case("medium"):
        // numPages = 2;
        numPages = 1;
        break;
      case("large"):
        // numPages = 3;
        numPages = 1;
        break;
    }

    for (let i = 1; i <= numPages; i++) {
      jobPromiseArray[i-1] = new Promise(function(resolve, reject) {

        let targetURL = IEEE_BASE_URL;

        targetURL += `${searchCriteria.description}`;

        if (searchCriteria.location) {
          targetURL += `/${searchCriteria.location}?radius=50&SearchNetworks=US&networkView=national`;
        }

        targetURL += `?page=${i}${IEEE_RSS_URL}`;

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

            if (result.rss.channel[0].item) {
              for (let item of result.rss.channel[0].item) {
                let jobOfferOptions = {uri: item.link[0], json: true};
                let jobDescription = "";

                offers[index] = rp(jobOfferOptions).then((jobOfferPage) => {
                  let $ = cheerio.load(jobOfferPage);

                  $("*[itemprop = 'description']").each((index, elem) => {
                    jobDescription += ($(elem).html() + " ");
                  });

                  let offerObject = {description: jobDescription, title: item.title[0], link: item.link[0]};
                  console.log(offerObject);
                  return offerObject;
                })
                .catch((error) => {
                  console.log("An error occurred while trying to fetch an item on a page using rp in IEEE Job Search");
                  console.error(error);
                })

                index++;
              }
            }

            Promise.all(offers).then((completedOfferInquiries) => {
              resolve(completedOfferInquiries);
            });
          });
        })
        .catch((error) => {
          console.log("An error occurred while trying to fetch page search data using rp in IEEE Job Search");
          console.error(error);
          reject(error);
        });

      });
    }

    Promise.all(jobPromiseArray)
    .then((completedSearches) => {
      resolve(completedSearches);
    })
    .catch((error) => {
      console.log("There was problem in waiting for the requests from IEEE Job Search to resolve");
      console.err(error);
    });

  });
}


module.exports = {
  ieeeJobSearch: getJobs,
}
