import { TECH_TERMS, MERGE } from './techConstants.js';
const striptags = require('striptags');

//TODO: Do these later, when other work is done, this is optimization below:
//TODO: Merge all of these arrays into 'BY-MOST' to maximize efficiency? Make sure repeat entries (java, javascript) arent being procced
//TODO: Make this array better, more comprehensive (note: this is sad slave grunt work, feelsbadman)

//TODO: Include keyword search stuff, maybe limit number of examples (or make parsable on demand, like search 100 at a time until out?)


//TODO: combine similar terms? (Example: objective-c, obj-c)
//TODO: Add option to let user see words that weren't parsed and removed, give them option to consider?? form to submit additional missed words?

//TODO: Reorder this? bruh i have no idea this algorithm is wacky yo

//TODO: modularize the algorithm?
function analyzeWords(offers) {
  console.log(offers.result);

  //one string consisting of all offers
  let totalOfferString = "";

  for (let offerArray of offers.result) {
    for (let offerChoice of offerArray) {
      for (let offer of offerChoice) {
        totalOfferString += offer.description;
      }
    }
  }

  let cleanOfferString = striptags(totalOfferString).toLowerCase().replace(/[&\/\\,\(\)$~%\.\-!^'"\;:*?\[\]<>{}]/g, ' ');

  //Set up array of pairings, index
  let wordFrequencyPairings = {};
  let order = TECH_TERMS[0];

  for (let i = 0; i < order.length; i++) {
    wordFrequencyPairings[order[i]] = [];
  }

  //Get the frequencies of each word in the word soup.
  for (let word of TECH_TERMS) {
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

  // Return three things:
  // 1) Sorted word frequencies (all categories)
  // 2) Sorted word frequencies (separated by categories)
  // 3) Leftover string? (Is this necessary?)
  return {
    sortedPairings: wordFreqPairings,
    leftoverString: cleanOfferString,
  };


}


export { analyzeWords }
