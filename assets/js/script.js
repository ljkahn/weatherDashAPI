
//define variables for API key and url
var apiKey = "4c52e8bbc2510e2372cef27ffca3a887";
// var apiUrl = "https://api.openweathermap.org/data/2.5/";

var city;

//create a query url to store the weather data url and other variables

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

//create a fettch function
fetch(queryURL) 
    .then(function (response) {
        return response.json();
      });

      console.log(fetch);
