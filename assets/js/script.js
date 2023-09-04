$(function() {
    
    //define variables for API key, url
    
    var city = " ";
    var apiKey = "4c52e8bbc2510e2372cef27ffca3a887";
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=`;
    
    
    var fiveDayUrl =`https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=`;

    
    
    
    
    //fetch current weather data from OpenWeather API
    
    function daily (city) {
        fetch(apiUrl + city)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        
        //loop through OpenWeather data
        .then(function(data){
            console.log(data);
            
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
    
    
    function fiveDay (city) {
        fetch(fiveDayUrl + city)
        .then(function (response) {
            // console.log(response);
            
            return response.json();
        })
        
        .then(function(data){
            // console.log(data);
            
            //create a variable 
            
            
            
            let newArray = data.list.filter(function (el) {
                var test = el.dt_txt.split(" ")[1];
                return test === "12:00:00";
            }
            );
            // console.log(newArray);
            
            
            for (var i = 0; i < newArray.length; i++) {
                // Access specific properties within each item
                var wind = newArray[i].wind.speed;
                var temperature = newArray[i].main.temp;
                var humidity = newArray[i].main.humidity;
                
                
                //   Log the data for the current item
                console.log("Wind", wind);
                console.log("Temp", temperature);
                console.log("Humidity", humidity);


            }});
        }
        
        
        
        // daily(city);
        // fiveDay(city);
        $("#button").on("click", function(event){
           var userInput = $("#input").val();
           console.log(userInput);
           daily(userInput);
           fiveDay(userInput)
        })

    })

    