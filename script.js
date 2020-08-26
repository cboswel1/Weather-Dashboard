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



//Creating Search button variable 
var searchButton = $(".search-button");
console.log("Working");

//loop to append local storage html upon refresh
for (var i = 0; i < localStorage.length; i++) {

    var cityStorage = localStorage.getItem(i);

    var cityChoice = $(".city-list");

    var showCity = $("<li>" + cityStorage + "</li>");

    cityChoice.append(showCity);
    

}

//local storage 0 value
var userCity = 0;



//When user clicks search...event listener for click 
searchButton.click(function() {

    $("h1").addClass("hide");
    $("h5").removeClass("hide");



    //current weather conditions 
    //var for city search value to insert into api call
    var citySearch = $(".citySearch").val();
    console.log(citySearch);


    //API Calls for current weather and 5 day forecast 
    var currentW = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=9f0120827a50e9a11f1c94d939f4dbfc&units=imperial";
    console.log(currentW);

    var fiveDayW = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=9f0120827a50e9a11f1c94d939f4dbfc&units=imperial"; 
    console.log(fiveDayW);


    //conditional if for blank search, else for search   
    if (citySearch === "") {
        return;

    } else {

    $.ajax({
        url: currentW, 
        method: "GET"
    }).then(function(response) {
        console.log(currentW);

        console.log(response);

        

        //appending city name search to ul 
        var cityChoice = $(".city-list");

        var showCity = $("<li>" + response.name + "</li>");

        cityChoice.append(showCity);

        //collect user city submission for local storage 
        localStorage.setItem(userCity, response.name);

        userCity = userCity + 1;



        //Display Current City
        var cCity = $(".current-city");

        var currentCity = $("<h3>").text(response.name); 

        // only way I could find to clear
        cCity.empty();
        console.log(currentCity);

        cCity.append(currentCity);
        
    

        //Display Current Date 
        var currentDate = moment().format('L')
        console.log(currentDate);

        

        var cDate = $(".date").text(currentDate);
        
        

        
        //Generating Weather Icon 
        var icons = response.weather[0].icon;
        console.log(icons);


        var weatherIcon = "http://openweathermap.org/img/wn/" + icons + ".png"

        var wi = $(".weather-icon").attr('src', weatherIcon);

        
        //Current Weather Temp, Humidity, Wind Speed Append
        var cWeather = $("#current-weather"); 

        cWeather.empty();
        var currentTemp = $("<p>").text("Current Temperature: " + response.main.temp + " °F");
        console.log(currentTemp);
        
        var currentHum = $("<p>").text("Current Humidity: " + response.main.humidity + "%");
        console.log(currentHum);
        
        var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + "mph");
        
        cWeather.append(currentTemp, currentHum, windSpeed); 
        
        //UV Index 
        var uvIndex = `http://api.openweathermap.org/data/2.5/uvi?appid=9f0120827a50e9a11f1c94d939f4dbfc&lat=${response.coord.lat}&lon=${response.coord.lon}`;
        console.log(uvIndex);

        $.ajax({
            url: uvIndex, 
            method: "GET"
        }).then(function(response) {

            var currentUV = $("<p>").text("UV Index: " + response.value);
            cWeather.append(currentUV);

             
        });   
    });
    }

    //5 day forecast 
    $.ajax({
        url: fiveDayW,
        method: "GET"
    }).then(function (response) {

        console.log(fiveDayW);

        //Day 1
        var fiveDay1 = $(".day-one"); 

        fiveDay1.empty();
        var dayOneTemp = $("<p>").text("Current Temperature: " + response.list[0].main.temp + " °F");
        console.log(dayOneTemp);
        
        var dayOneHum = $("<p>").text("Current Humidity: " + response.list[0].main.humidity + "%");
        console.log(dayOneHum);
        
        
        fiveDay1.append(dayOneTemp, dayOneHum); 

        //Day 2
        var fiveDay2 = $(".day-two"); 

        fiveDay2.empty();
        var dayTwoTemp = $("<p>").text("Current Temperature: " + response.list[1].main.temp + " °F");
        console.log(dayTwoTemp);
        
        var dayTwoHum = $("<p>").text("Current Humidity: " + response.list[1].main.humidity + "%");
        console.log(dayTwoHum);
        
        
        fiveDay2.append(dayTwoTemp, dayTwoHum); 

    });



 


}); 



