import { TECH_TERMS, MERGE } from './wordAnalysisConstants.js';
const striptags = require('striptags');

//TODO: Make this array better, more comprehensive (note: this is sad slave grunt work, feelsbadman)
//TODO: Include keyword search stuff, maybe limit number of examples (or make parsable on demand, like search 100 at a time until out?)
//TODO: start on other functions offered
//TODO: Add option to let user see words that weren't parsed and removed, give them option to consider?? form to submit additional missed words?

function analyzeWords(offers) {
  //one string consisting of all offers
  let cleanOfferString = getCleanOffers(offers.result);

  //Get the frequencies of each word in the word soup.
  //Returns an object frequencyData with params wordFrequencyMaps and totalNumWords
  let frequencyData = getFrequencyMaps(cleanOfferString);

  //Merge associated words
  mergeAssociatedWords(frequencyData.wordFrequencyMaps);

  // Covert maps into (sorted) lists
  let wordFrequencyPairings = getSortedFrequencyLists(frequencyData.wordFrequencyMaps);

  // Return three things:
  // 1) Sorted word frequencies (all categories, separated by categories)
  // 2) Total number of (terms) processed
  return {
    sortedPairings: wordFrequencyPairings,
    totalNumWords: frequencyData.totalNumWords
  };
}

function getJobs(offers) {
  console.log(offers.result);
  // 
  // processStackOverflowJobs(offers.result[0]);
  return [];
}

function clean(word) {
  word = word.replace(new RegExp(',', 'g'), "");
  word = word.trim();
  return word;
}

function getCleanOffers(jobOffers) {
  let totalOfferString = "";
  for (let offerArray of jobOffers) {
    for (let offerChoice of offerArray) {
      for (let offer of offerChoice) {
        totalOfferString += offer.description;
      }
    }
  }
  return striptags(totalOfferString).toLowerCase().replace(/[&\/\\,\(\)$~%\.\-!^'"\;:*?\[\]<>{}]/g, ' ');
}

function getFrequencyMaps(cleanOfferString) {
  //Set up array of pairings, total # of words
  let wordFrequencyMaps = {};
  let totalNumWords = 0;

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

  return { totalNumWords : totalNumWords, wordFrequencyMaps: wordFrequencyMaps };
}

function mergeAssociatedWords(wordFrequencyMaps) {
  // Merge associated words
  for (let mergeRequests of MERGE) {
    let targetMap = wordFrequencyMaps[mergeRequests.category];

    for (let changes of mergeRequests.changes) {
      // The first value in change is designated as the actual name.
      let actualName = changes[0];
      if (!targetMap.has(actualName)) {
        targetMap.set(actualName, 0);
      }

      let cloneCountSum = 0;
      for (let i = 1; i < changes.length; i++) {
        // Avoid NaN error
        if (targetMap.has(changes[i])) {
          cloneCountSum += targetMap.get(changes[i]);
          targetMap.delete(changes[i]);
        }
      }
      targetMap.set(actualName, targetMap.get(actualName) + cloneCountSum);
    }
  }

  return wordFrequencyMaps;
}

function getSortedFrequencyLists(wordFrequencyMaps) {
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

  //sort the lists
  for (let pairing in wordFrequencyPairings) {
    if (wordFrequencyPairings.hasOwnProperty(pairing)) {
      wordFrequencyPairings[pairing].sort(function(a, b) {
        return b[1] - a[1];
      });
    }
  }

  return wordFrequencyPairings;
}


export { analyzeWords, getJobs }
