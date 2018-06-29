//for more info on how google auto authentication works with env variables, go here
//https://cloud.google.com/docs/authentication/getting-started

//Search basics can be found here
//https://cloud.google.com/job-discovery/docs/search


function getJobs(auth) {
}

module.exports = {
  googleJobSearch: getJobs,
}


//NOTE: START OF GOOGLE CLOUD API CODE HERE; MAY BE RELEVANT IN FUTURE? ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// const jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, ["https://www.googleapis.com/auth/jobs"], null);
//
// var jobServicePromise = google.discoverAPI(discoveryDoc);
// jobServicePromise.then(function(jobService){
//
//     jwtClient.authorize(function(err, tokens) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//
//         //hashing for privacy? maybe later, when i actually have this working.
//         var rmdObject = {
//           "domain": "UNKNOWN",
//           "sessionId": "UNKNOWN",
//           "userId": "UNKNOWN",
//         }
//
//         //https://cloud.google.com/job-discovery/docs/reference/rest/v2beta1/jobs/search
//         var searchJobsRequest = {
//             "requestMetadata": rmdObject,
//             // "filters": {
//             //     "query": "software engineer"
//             // },
//             "query": {
//               "query": "Analyst",
//               "employmentTypes": [
//                 "FULL_TIME",
//                 "INTERN"
//               ],
//               "locationFilters": [{
//                 "name": "Dallas, TX",
//                 "distanceInMiles": 20,
//               }]
//             },
//             "mode": "JOB_SEARCH",
//             // disableKeywordMatch: true,
//             enableBroadening: true,
//
//             // "offset": 5,
//             // "pageSize": 5
//         }
//
//         jobService.jobs.search({ auth: jwtClient, resource: searchJobsRequest }, function (err, result) {
//           if (err) {
//             console.error('Failed to search jobs! ' + err);
//             throw err;
//           }
//           console.log("############# POST sample #############");
//           console.log('result:', result);
//         });
//     });
// });
//END OF CODE HERE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
