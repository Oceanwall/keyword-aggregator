# Keyword Aggregator

Search for the keywords present in job listings. Currently parses job listings from Github, Stack Overflow, and IEEE. Built with React (using less as a CSS preprocessor), and uses an Express.js server backend to make API fetch requests.

This project is optimized towards the different flavors of software engineering jobs.

**TODO:**
( ) Get hardcoded JSON data and store in JSON file for example data processing and rendering use
( ) Revamp the word analysis algorithm, making it more comprehensive and also giving it additional capabilities.
( ) Make the search page CSS mobile-friendly, redesign as necessary.
( ) Ensure sanitization of form inputs
( ) Begin work on information display dashboard.
( ) Make sure that app is reusable after a search (reset all fields, etc, etc)
( ) Caching, service workers?

**KNOWN PROBLEMS**
- IEEE search has connection problems when requesting large #s of job searches.

**EXAMPLE IMAGES**

**Option Selection Menu** <br> <br>
![Option Selection Menu](https://raw.githubusercontent.com/Oceanwall/keyword-aggregator/master/demo_pictures/option_selection.png) <br> <br>
**Loading Screen** <br> <br>
![Loading Screen](https://raw.githubusercontent.com/Oceanwall/keyword-aggregator/master/demo_pictures/loading_screen.png) <br> <br>
**Example Raw Data Output (Not yet cleaned up and processed)** <br> <br>
![Raw Data Output](https://raw.githubusercontent.com/Oceanwall/keyword-aggregator/master/demo_pictures/raw_results.png) <br> <br>

Was on hiatus from 07/01 to 09/08 as I prepared for the Fall CS interview season (see the [Interview Practice Repository here!](https://github.com/Oceanwall/InterviewPreparation))
