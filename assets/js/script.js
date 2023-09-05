$(function() {
    
    //define variables for API key, url
    
    var city = "MONACO";
    var apiKey = "4c52e8bbc2510e2372cef27ffca3a887";
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=`;
    
var fiveDayUrl =`https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=`;

    
    
    
    
    //fetch current weather data from OpenWeather API
    
    function daily (city) {
        fetch(apiUrl + city)
        .then(function (response) {
            
            return response.json();
        })
        
        //loop through OpenWeather data
        .then(function(data){
          
            
            var template = `
            <h2>${data.name} <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" /></h2>
            <p>temp: ${data.main.temp}F</p>
            <p>wind: ${data.wind.speed}MPH</p>
            <p>humidity: ${data.main.humidity}%</p>
            `
            $("#daily").empty();
            $("#daily").append(template);
        });
    }
    
    //create a function to fetch five day weather forecast from weather api
    
    function fiveDay (city) {
        fetch(fiveDayUrl + city)
        .then(function (response) {
            
            return response.json();
        })
        
        .then(function(data){
    
            
            //filter the data for the time of day we're going to display the weather (12:00)
            
            let newArray = data.list.filter(function (el) {
                var test = el.dt_txt.split(" ")[1];
                return test === "12:00:00";
            }
            );

            
            
            for (var i = 0; i < newArray.length; i++) {
                // access specific properties within each item
                var wind = newArray[i].wind.speed;
                var temperature = newArray[i].main.temp;
                var humidity = newArray[i].main.humidity;
                console.log(newArray);
                
                //   log the data for the current item
                console.log("Wind", wind);
                console.log("Temp", temperature);
                console.log("Humidity", humidity);

             //display five day weather forecast on webpage               
            var template = `
       
            <img src="https://openweathermap.org/img/wn/${newArray[i].weather[0].icon}.png" alt="${newArray[i].weather[0].description}" />
            <p>temp: ${temperature}
            wind: ${wind}MPH
            humidity: ${humidity}%</p>
            `
            // $("#five-day").empty();
            $("#five-day").append(template);




                 

            }});
        }
        
        
      
    
        $("#button").on("click", function(event){
           var userInput = $("#input").val();
      
           daily(userInput);
           fiveDay(userInput);
        })

    })

    