import { TECH_TERMS, MERGE } from './wordAnalysisConstants.js';
const striptags = require('striptags');

//TODO: Do these later, when other work is done, this is optimization below:
//TODO: Merge all of these arrays into 'BY-MOST' to maximize efficiency? Make sure repeat entries (java, javascript) arent being procced
//TODO: Make this array better, more comprehensive (note: this is sad slave grunt work, feelsbadman)

//TODO: Include keyword search stuff, maybe limit number of examples (or make parsable on demand, like search 100 at a time until out?)

//TODO: Fix: node, check indvidual categories, etc... start on other functions offered

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

  //Set up array of pairings, total # of words
  let wordFrequencyMaps = {};
  let totalNumWords = 0;

  //Get the frequencies of each word in the word soup.
  for (let category of TECH_TERMS) {
    let frequencies = new Map();

    for (let word of category.data) {
      let wordIndex = cleanOfferString.indexOf(word);
      let numWords = 0;

      while (wordIndex !== -1) {
        numWords++;
        wordIndex = cleanOfferString.indexOf(word, wordIndex + word.length);
      }

      let cleanedWord = clean(word);
      if (frequencies.has(cleanedWord)) {
        frequencies.set(cleanedWord, frequencies.get(cleanedWord) + numWords);
      }
      else frequencies.set(cleanedWord, numWords);

      totalNumWords += numWords;
    }

    wordFrequencyMaps[category.name] = frequencies;
  }

  // Merge associated words
  for (let mergeRequests of MERGE) {
    let targetMap = wordFrequencyMaps[mergeRequests.category];

    for (let changes of mergeRequests.changes) {
      // The first value in change is designated as the actual name.
      let actualName = changes[0];
      let cloneCountSum = 0;
      for (let i = 1; i < changes.length; i++) {
        cloneCountSum += targetMap.get(changes[i]);
        targetMap.delete(changes[i]);
      }
      targetMap.set(actualName, targetMap.get(actualName) + cloneCountSum);
    }
  }

  console.log("Hello");
  console.log(wordFrequencyMaps);

  // Covert maps into lists
  let wordFrequencyPairings = {all: []};
  for (let category of TECH_TERMS) {
    let frequencyList = [];
    for (let entry of wordFrequencyMaps[category.name].entries()) {
      frequencyList.push(entry);
    }
    wordFrequencyPairings[category.name] = frequencyList;
    // Build the "all words" list
    wordFrequencyPairings.all = wordFrequencyPairings.all.concat(frequencyList);
  }

  for (let pairing in wordFrequencyPairings) {
    if (wordFrequencyPairings.hasOwnProperty(pairing)) {
      wordFrequencyPairings[pairing].sort(function(a, b) {
        return b[1] - a[1];
      });
    }
  }

  console.log(wordFrequencyPairings);

  // Return three things:
  // 1) Sorted word frequencies (all categories)
  // 2) Sorted word frequencies (separated by categories)
  // (Both of these ^ are in ONE object)
  // 3) Leftover string? (Is this necessary?)
  return {
    sortedPairings: wordFrequencyPairings,
    leftoverString: cleanOfferString,
  };


}

function clean(word) {
  word = word.replace(new RegExp(',', 'g'), "");
  word = word.trim();
  return word;
}


export { analyzeWords }
