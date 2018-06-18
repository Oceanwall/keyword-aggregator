const striptags = require('striptags');

//TODO: Do these later, when other work is done, this is optimization below:
//TODO: Merge all of these arrays into 'BY-MOST' to maximize efficiency?
//TODO: Make this array better, more comprehensive (note: this is sad slave grunt work, feelsbadman)


//TODO: combine similar terms?
//TODO: Add option to let user see words that weren't parsed and removed, give them option to consider?? form to submit additional missed words?

const techTerms = ["asp.net", "c#", "objective c", "obj c", " c ", "visual basic", " .net ", "shell", "assembly", "f#", " cfml ", " lisp ", "fortran", " go ", " haskell ", " javascript ", "java", " scala ", "mathematica", "matlab", " lingo ", "julia", "pascal", "ecmascript ", " es2015 ", " es6 ", " ocaml ", " perl ", "php", "python", " ruby ", " rust ", " scheme ", " tex ", " latex ", "swift", " oracle ", " xml ", "html", "css", "json", "rails", "git", "linux", "node", "golang", "apache", " kotlin ", " typescript ", " coffeescript ", " js ", " sql ", "nosql", " mvc ", "restful api", "posegresql", "laravel", " caches ", " failover ", " cloud ", " architectural patterns ", " amazon web services ", " open source ", " vuejs ", " vue js ", " angular cli ", " angularjs ", "angular 5", "reactjs", " angular ", " react ", " object-oriented ", " jira ", " agile ", " scrum ", " databases ", " software engineering ", " data structures ", " algorithms ", " ux ", " user experience ", " qa ", " test ", " web development ", " opengl ", " graphics ", "mockup", "prototype", " scalable ", " infrastructure ", " automation ", " platform ", " software architecture ", " s3 storage ", " scripting ", " continuous delivery ", " distributed systems ", " saltstack ", " puppet ", " ansible ", " gulp ", " continuous integration ", " grunt ", " babel ", " express ", " asynchronous ", " cross-browser ", " agile ", " redux ", " design ", " twig ", " composer ", " rabbit ", " pimple ", " docker ", " wordpress ", " elasticsearch ", " amp ", " kibana ", " english ", " mandarin ", " maintainability ", " no sql ", "spark", " hadoop ", " databricks ",  "mongodb ", " mongo ", " postgresql ", " mysql ", " data storage ", " self-driven ", " technical leadership ", " long term ", " cluster ", " security ", " google analytics ", " work ethic ", " independently learn ", " persistent ", " dependable ", " communicate effectively ", " critical thinkng ", " identify issues ", " formulate solutions ", " self starter ", " eagerness ", " coordinate ", " active listening ", " constructive feedback ", " detail oriented ", " interpersonal skills ", " requirejs ", " sass ", " less ", " jasmine ", " geolocation ", " transitions ", " transformations ", " hardware acceleration ", " optimization ", "http", " team player ", " unix ", " redis ", " cassandra ", " voldemort ", " cocoa ", " networking ", " drivers ", " self directed ", " docker ", " google cloud ", " kubernetes ", " jquery ", " social media ", " postgres ", " redshift ", " snowflake ", " aws ", " glue ", " kinesis ", " backbone "];

const wordsToInitallyRemove = [" about ", " all ", " also ", " and ", " as ", " because ", " by ", " can ", " come ", " could ", " day ", " do ", " find ", " for ", " from ", " get ", " give ", " have ", " here ", " how ", " if ", " in ", " into ", " it ", " its ", " just ", " know ", " look ", " make ", " many ", " more ", " no ", " not ", " now ", " of ", " on ", " only ", " or ", " other ", " our ", " out ", " say ", " see ", " so ", " some ", " take ", " tell ", " than ", " that ", " the ", " then ", " there ", " these ", " think ", " this ", " those ", " time ", " to ", " up ", " use ", " very ", " what ", " when ", " which ", " will ", " with ", " would ", " you ", " your ", " part ", " our ", " at "];

// const temp = [" c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ", " c ",];

const specialWords = [" c++ "];

function analyzeWords(offers) {
  //TODO: Definitely do this on the client side? Can also let user know that data was received, etc

  //Get one string containing all of the offers
  let totalOfferString = "";
  for (let offer of offers.result) {
    totalOfferString += offer.description;
  }
  let cleanOfferString = striptags(totalOfferString).toLowerCase().replace(/[&\/\\,\(\)$~%\.\-!^'"\;:*?\[\]<>{}]/g, ' ');

  //Remove common words
  for (let commonWord of wordsToInitallyRemove) {
    cleanOfferString.replace(new RegExp(commonWord, 'g'), "");
  }

  //Set up array of pairings, index
  let wordFreqPairings = [];
  let index = 0;

  //Go through each of the (normal regex-able) tech terms
  for (let word of techTerms) {
    let wordLength = word.length;
    let oldLength = cleanOfferString.length;
    cleanOfferString = cleanOfferString.replace(new RegExp(word, 'g'), "");
    let wordsRemoved = (oldLength - cleanOfferString.length) / wordLength;
    wordFreqPairings[index] = [word, wordsRemoved];
    index++;
  }

  //Go through the special terms that refuse regex
  for (let word of specialWords) {
    let wordIndex = cleanOfferString.indexOf(word);
    let numWords = 0;
    while (wordIndex !== -1) {
      numWords++;
      wordIndex = cleanOfferString.indexOf(word, wordIndex + word.length);
    }
    //TODO: remove spaces from word before placing it into array
    wordFreqPairings[index] = [word, numWords];
    index++;
  }

  wordFreqPairings.sort(function(a, b) {
    return b[1] - a[1];
  });

  return {
    sortedPairings: wordFreqPairings,
    leftoverString: cleanOfferString,
  };

}


module.exports = {
  analyzeWords: analyzeWords,
}
