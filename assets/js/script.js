
//define variables for API key and url

var lat = "39.7392";
var lon = "104.9903";
var apiKey = "4c52e8bbc2510e2372cef27ffca3a887";
var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;





fetch(apiUrl)
  .then(function (response) {
    console.log(response);
    return response.json();
  })


  .then(function(data){
    console.log(data);
});