//I need to have a search function that allows a user to view weather data relating to a particular city. 
//When the user clicks on the search button, they will be presented with the following. 
    //- the current weather conditions in that city
        //- city name, the date, an icon representing weather, the temp
    //- the UV index
        //-a color represents favorable, moderate, severe 
    //- a 5 day forecast 
    //- a search history of cities 
    // - upon open, user is presented with most recent search. 


//Open Weather Map API key and One Call API link    
//API key: 9f0120827a50e9a11f1c94d939f4dbfc    

//API call: https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=9f0120827a50e9a11f1c94d939f4dbfc



//API Calls for current weather and 5 day forecast 



//Creating Search button variable 
var searchButton = $(".search-button");
console.log("Working");




//When user clicks search...event listener for click 
searchButton.click(function() {
//current weather conditions 
//var for city search value to insert into api call 
var citySearch = $(".citySearch").val();
console.log(citySearch);

var currentW = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=9f0120827a50e9a11f1c94d939f4dbfc&units=imperial";
console.log(currentW);

var fiveDayW = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=9f0120827a50e9a11f1c94d939f4dbfc&units=imperial"; 
console.log(fiveDayW);

    $.ajax({
        url: currentW, 
        method: "GET"
    }).then(function(response) {
        console.log(currentW);

        console.log(response);

       

        var cWeather = $("#current-weather"); 

        var currentCity = $("<p>").text(response.name + response.dt + response.weather.icon);
        console.log(currentCity);
        var currentTemp = $("<p>").text("Current Temperature: " + response.main.temp);
        console.log(currentTemp);
        var currentHum = $("<p>").text("Current Humidity: " + response.main.humidity);
        console.log(currentHum);
        var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed);

        // var uvIndex = $("<td>").text(response.)
        cWeather.append(currentCity, currentTemp, currentHum, windSpeed); 
        // $("#current-weather").append(cWeather);
        

    });
    


});