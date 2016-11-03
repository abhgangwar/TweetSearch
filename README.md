# TweetSearch
A simple NodeJs app to search tweets with hashtags #custserv and re-tweeted at least once.

### Setting up the Application
* Install node. Download the node installer from [here](https://nodejs.org/en/download/) 
* Clone the repo (OR Download and extract the files). Open a terminal and go to code directory.
* Run command `npm install`
* Rename the file default.json.sample from `config/default.json.sample` to `config/default.json`
* Now open the config file `config/default.json` in a text editor and put your consumer key and secret there.
* Additionally, you can also customize other options like 'minRetweets' and 'searchQuery' in config file, based on which the search results are fetched
* Now You can run the tests entering the command `npm run test` from terminal
    * Note: Some tests depend on remote services( twitter APIs here ). So, if your network connection is slow/faulty, tests may timeout ( after 15 seconds )
* To start the node server, run `npm run  start` from terminal.
* Now open `127.0.0.1:3000` from a web browser. Yay ! Tweets search results are displayed :D

![SearchResult](https://github.com/abhgangwar/TweetSearch/blob/master/screenshots/browerView.png)

### Code description
* `lib/` contains all the custom classes/modules
    * `lib/TwitterOAuth.js` - Authenticates to twitter using consumer key and secret and fetches the bearer access token.
    * `lib/TwitterSearch.js` - Contains method that can be called to fetch the search results.
* `routes/RequestHandler.js` - To handle the http request.
* `Utils.js` - Common utility functions
* `test/` - Contains all the tests. [Mocha](https://mochajs.org/) with NodeJs's inbuilt '[assert](https://nodejs.org/api/assert.html) module has been used for testing. 
