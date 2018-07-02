# Keyword Aggregator

Search for the keywords present in job listings. Currently parses job listings from Github, Stack Overflow, and IEEE. Built with React (using less as a CSS preprocessor), and uses an Express.js server backend to make API fetch requests.

This project is optimized towards the different flavors of software engineering jobs.

**TODO:**
- Refine IEEE search, troubleshoot connection problems
- Get hardcoded info and store in JSON file for example data rendering use (without having to wait 10 seconds each time)
- Ensure sanitization of form inputs
- Complete data depictions (left to right transitions) (graphs, tables, additional visual depictions, consider cool designs to communicate text data?)
- Make sure that web app is reusable after a search (reset all fields, etc, etc)
- Mobile web app optimizations?
- Caching, service workers?

**KNOWN PROBLEMS**
- IEEE search randomly has connection problems, refuses to load information
- Large information loads cause empty responses (Server seems to have information properly, maybe a client side error?)
- Loading blurb doesn't change until everything has already been processed

**EXAMPLE IMAGES**

**Option Selection Menu** <br> <br>
![Option Selection Menu](https://raw.githubusercontent.com/Oceanwall/keyword-aggregator/master/demo_pictures/option_selection.png) <br> <br>
**Loading Screen** <br> <br>
![Loading Screen](https://raw.githubusercontent.com/Oceanwall/keyword-aggregator/master/demo_pictures/loading_screen.png) <br> <br>
**Example Raw Data Output (Not yet cleaned up and processed)** <br> <br>
![Raw Data Output](https://raw.githubusercontent.com/Oceanwall/keyword-aggregator/master/demo_pictures/raw_results.png) <br> <br>

## On hiatus as I prepare for the Fall CS interview season
**Last update: 07/01**
