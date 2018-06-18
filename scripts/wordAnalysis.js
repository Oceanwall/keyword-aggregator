const striptags = require('striptags');
const nlp = require('compromise');

//TODO: Merge all of these arrays into 'BY-MOST' to maximize efficiency
//TODO: combine similar terms?
//NOTE: feelsbad, hardcoded terms :(
//TODO: Make this array better, more comprehensive (note: this is sad slave grunt work, feelsbadman)
const languages = ["asp.net", "c#", "objective c", "obj c", " c ", "visual basic", " .net ", "shell", "assembly", "f#", " cfml ", " lisp ", "fortran", " go ", " haskell ", " javascript ", "java", " scala ", "mathematica", "matlab", " lingo ", "julia", "pascal", "ecmascript ", " es2015 ", " es6 ", " ocaml ", " perl ", "php", "python", " ruby ", " rust ", " scheme ", " tex ", " latex ", "swift", " oracle ", " xml ", "html", "css", "json", "rails", "git", "linux", "node", "golang", "apache", " kotlin ", " typescript ", " coffeescript ", " js "];

const generalBuzzwords = [" sql ", "nosql", " mvc ", "restful api", "posegresql", "laravel", " caches ", " failover ", " cloud ", " architectural patterns ", " amazon web services ", " open source ", " vuejs ", " vue js ", " angular cli ", " angularjs ", "angular 5", "reactjs", " angular ", " react ", " object-oriented ", " jira ", " agile ", " scrum ", " databases ", " software engineering ", " data structures ", " algorithms ", " ux ", " user experience ", " qa ", " test ", " web development ", " opengl ", " graphics ", "mockup", "prototype", " scalable ", " infrastructure ", " automation ", " platform ", " software architecture ", " s3 storage ", " scripting ", " continuous delivery ", " distributed systems ", " saltstack ", " puppet ", " ansible ", " gulp ", " continuous integration ", " grunt ", " babel ", " express ", " asynchronous ", " cross-browser ", " agile ", " redux ", " design ", " twig ", " composer ", " rabbit ", " pimple ", " docker ", " wordpress ", " elasticsearch ", " amp ", " kibana ", " english ", " mandarin ", " maintainability ", " no sql ", "spark", " hadoop ", " databricks ",  "mongodb ", " mongo ", " postgresql ", " mysql ", " data storage ", " self-driven ", " technical leadership ", " long term ", " cluster ", " security ", " google analytics ", " work ethic ", " independently learn ", " persistent ", " dependable ", " communicate effectively ", " critical thinkng ", " identify issues ", " formulate solutions ", " self starter ", " eagerness ", " coordinate ", " active listening ", " constructive feedback ", " detail oriented ", " interpersonal skills ", " requirejs ", " sass ", " less ", " jasmine ", " geolocation ", " transitions ", " transformations ", " hardware acceleration ", " optimization ", "http", " team player ", " unix ", " redis ", " cassandra ", " voldemort ", " cocoa ", " networking ", " drivers ", " self directed ", " docker ", " google cloud ", " kubernetes ", " jquery ", " social media ", " postgres ", " redshift ", " snowflake ", " aws ", " glue ", " kinesis ", " backbone "];

const wordsToInitallyRemove = [" about ", " all ", " also ", " and ", " as ", " because ", " by ", " can ", " come ", " could ", " day ", " do ", " find ", " for ", " from ", " get ", " give ", " have ", " here ", " how ", " if ", " in ", " into ", " it ", " its ", " just ", " know ", " look ", " make ", " many ", " more ", " no ", " not ", " now ", " of ", " on ", " only ", " or ", " other ", " our ", " out ", " say ", " see ", " so ", " some ", " take ", " tell ", " than ", " that ", " the ", " then ", " there ", " these ", " think ", " this ", " those ", " time ", " to ", " up ", " use ", " very ", " what ", " when ", " which ", " will ", " with ", " would ", " you ", " your ", " part ", " our ", " at "];

// const temp = [" c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ",];

const specialWords = [" c++ "];

const categories = [languages, generalBuzzwords];

function analyzeWords(offers) {
  // console.log(data);
  //TODO: http://compromise.cool/
  //NOTE: Maybe do this on the client side? Can also let user know that data was received, etc

  //Get one string containing all of the offers
  let totalOfferString = "";
  for (offer of offers) {
    totalOfferString += offer.description;
  }
  let cleanedOfferString = striptags(totalOfferString).toLowerCase().replace(/[&\/\\,\(\)$~%\.\-!^'"\;:*?\[\]<>{}]/g, ' ');

  //Remove common words
  for (commonWord of wordsToInitallyRemove) {
    cleanedOfferString.replace(new RegExp(commonWord, 'g'), "");
  }

  //create a map

  for (category of categories) {
    for (word of category) {
      let wordLength = word.length;
      let oldLength = cleanedOfferString.length;
      cleanedOfferString = cleanedOfferString.replace(new RegExp(word, 'g'), "");
      let wordsRemoved = (oldLength - cleanedOfferString.length) / wordLength;
    }
  }
  console.log(cleanedOfferString);

}


module.exports = {
  analyzeWords: analyzeWords,
}

//TODO: create a map
