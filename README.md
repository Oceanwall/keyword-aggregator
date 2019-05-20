# Keyword Aggregator

```
5/20/19: Permanently on Hiatus.
```

When I created this project, I had never developed a "full-stack" application, and honestly speaking, wasn't entirely certain what a "full-stack" application even entitled.

The way that I designed this application would have doomed it to fail. Imagine making an API call to another source's rate-limited API every time a user wanted to get results about some keyword. Not only would the multiple calls made to different API sources have taken a significant chunk of user time, but it would have also placed the application at high risk of failure or incomplete results.

If I were to redesign this application from the ground up, I would use a responsive framework (React and Bootstrap) to handle responsive design, create a database that automatically seeds itself from the other job API sources, and create my own API hosted on an AWS server to respond to user requests made via this application. In fact, if you want to see such a project I've developed that follows these standards, you can check out [FindADogForMe](https://github.com/Oceanwall/FindADogForMe), a full-stack application that I developed for CS 373 at the University of Texas at Austin.

However, I like this concept a lot. I might resurrect a similar project, using the concepts I've learned since last year when I began work on this project, to experiment with new technologies and frameworks, and if I do, it may or may not be under this same repository.

Until then, I'm just freezing this README in time so that I can come back and understand what features I wanted to implement as inspiration for future projects.

```
Old (Archived) Description
```

Search for the keywords present in job listings. Currently parses job listings from Github, Stack Overflow, and IEEE. Built with React (using less as a CSS preprocessor), and uses an Express.js server backend to make API fetch requests.

This project is optimized towards the different flavors of software engineering jobs.

**TODO:**
- ( ) Get hardcoded JSON data and store in JSON file for example data processing and rendering use
- ( ) Revamp the word analysis algorithm, making it more comprehensive and also giving it additional capabilities.
  - Method 1: Overall word popularity
  - Method 2: Specific keywords
  - Method 3: Job Listings in general (?)
- ( ) Make the search page CSS mobile-friendly, redesign as necessary. (add exit button on currently fetching job data?) (error handling on server disconnect and error?)
- ( ) Ensure sanitization of form inputs
- ( ) Begin work on information display dashboard.
- ( ) Make sure that app is reusable after a search (reset all fields, etc, etc)
- ( ) Caching, service workers?

**KNOWN PROBLEMS**
- IEEE search has connection problems when requesting large #s of job searches.

**EXAMPLE IMAGES**

**Option Selection Menu** <br> <br>
![Option Selection Menu](https://raw.githubusercontent.com/Oceanwall/keyword-aggregator/master/demo_pictures/option_selection.png) <br> <br>
**Loading Screen** <br> <br>
![Loading Screen](https://raw.githubusercontent.com/Oceanwall/keyword-aggregator/master/demo_pictures/loading_screen.png) <br> <br>
**Example Raw Data Output (Not yet cleaned up and processed)** <br> <br>
![Raw Data Output](https://raw.githubusercontent.com/Oceanwall/keyword-aggregator/master/demo_pictures/raw_results.png) <br> <br>

**Was on hiatus from 07/01 to 09/08 as I prepared for the Fall CS interview season (see the [Interview Practice Repository here!](https://github.com/Oceanwall/InterviewPreparation))**
