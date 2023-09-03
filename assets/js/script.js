
//define variables for API key and url
var apiKey = "4c52e8bbc2510e2372cef27ffca3a887";
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={apiKey}";

var city;




fetch(apiUrl)
  .then(function (response) {
    return response.json();
  });