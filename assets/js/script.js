$(function () {

    //define variables for API key, url


    var apiKey = "4c52e8bbc2510e2372cef27ffca3a887";
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=`;

    var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=`;





    //fetch current weather data from OpenWeather API

    function daily(city) {
        fetch(apiUrl + city)
            .then(function (response) {

                return response.json();
            })

            //loop through OpenWeather data
            .then(function (data) {


                var template = `
            <h2 class="text-white">${data.name} <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" /></h2>
            <p class="text-white">temp: ${data.main.temp}F</p>
            <p class="text-white">wind: ${data.wind.speed}MPH</p>
            <p class="text-white">humidity: ${data.main.humidity}%</p>
            `

                $("#daily").empty();
                $("#daily").append(template);
            });
    }

    //create a function to fetch five day weather forecast from weather api

    function fiveDay(city) {
        fetch(fiveDayUrl + city)
            .then(function (response) {

                return response.json();
            })

            .then(function (data) {


                //filter the data for the time of day we're going to display the weather (12:00)

                let newArray = data.list.filter(function (el) {
                    var test = el.dt_txt.split(" ")[1];
                    return test === "18:00:00";
                }
                );

                //clear the five day section so its empty
                $("#five-day").empty();

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
            <div class="col card bg-dark" >
            <div class="card-body bg-dark text-white">
              <h5 class="card-title">${newArray[i].dt_txt.split(" ")[0]}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">
                <img src="https://openweathermap.org/img/wn/${newArray[i].weather[0].icon}.png" alt="${newArray[i].weather[0].description}" />
              </h6>
              <p class="card-text color-white">
                temp: ${temperature}
                wind: ${wind}MPH
                humidity: ${humidity}%
              </p>
    
            </div>
            `
                    //add new template to page with five day forecast
                    $("#five-day").append(template);

                }
            });
    }


    //create variable to store search history in localstorage
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];


    //create function to update search history
    function updateHistory() {
        $("#search-history-list").empty();
        searchHistory.forEach(function (city) {
            //add search values to a list and give them button styling
            $("#search-history-list").append(`<button id="savedBtn" class="savedCity rounded-4 m-1">${city}</button>`);
        });


        //add event listener for when the user clicks on a saved city in their search history to display the forecast
        $(".savedCity").on("click", function () {
            console.log(this.textContent);

            daily(this.textContent);
            fiveDay(this.textContent);
        })

    };

    //create event listener so when they click to search --> city name and data is stored in LocalStorage
    $("#button").on("click", function (event) {

        var userInput = $("#input").val();



        //create variable to  store searches in

        var city = $("#input").val();
        searchHistory.unshift(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        updateHistory();

        daily(userInput);
        fiveDay(userInput);
    })
    updateHistory();




});

