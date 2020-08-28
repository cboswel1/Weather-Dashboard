//Open Weather Map API key and One Call API link    
//API key: 9f0120827a50e9a11f1c94d939f4dbfc    

//API call: https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=9f0120827a50e9a11f1c94d939f4dbfc


//Creating Search button variable 
var searchButton = $(".search-button");


//loop to append local storage html upon refresh
for (var i = 0; i < localStorage.length; i++) {
    var cityStorage = localStorage.getItem(i);
    var cityChoice = $(".city-list");
    var showCity = $("<li>" + cityStorage + "</li>");
    cityChoice.append(showCity);
}

//local storage value to count up from 0
var userCity = 0;


//When user clicks search...event listener for click 
searchButton.click(function() {

    $("h2").addClass("hide");
    $("h5").removeClass("hide");
    $(".card").removeClass("hide");


    //current weather conditions 
    //var for city search value to insert into api call
    var citySearch = $(".citySearch").val();

    //API Calls for current weather and 5 day forecast 
    var currentW = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=9f0120827a50e9a11f1c94d939f4dbfc&units=imperial";

    var fiveDayW = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=9f0120827a50e9a11f1c94d939f4dbfc&units=imperial"; 
    

    //conditional if for blank search, else for search   
    if (citySearch === "") {
        return;

    } else {

    $.ajax({
        url: currentW, 
        method: "GET"
    }).then(function(response) {
    
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

        //append
        cCity.append(currentCity);
        
    
        //Display Current Date 
        var currentDate = moment().format('L')
        
        var cDate = $(".date").text(currentDate);
        

        //Generating Weather Icon 
        var icons = response.weather[0].icon;

        var weatherIcon = "https://openweathermap.org/img/wn/" + icons + ".png"

        var wi = $(".weather-icon").attr("src", weatherIcon);
        var wi = $(".weather-icon").attr("alt", "current weather icon");

        
        //Current Weather Temp, Humidity, Wind Speed Append
        var cWeather = $("#current-weather"); 

        cWeather.empty();

        var currentTemp = $("<p>").text("Current Temperature: " + response.main.temp + " °F");
        var currentHum = $("<p>").text("Current Humidity: " + response.main.humidity + "%");
        var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + "mph");

        cWeather.append(currentTemp, currentHum, windSpeed); 

        
        //UV Index + string interpo for response value
        var uvIndex = `https://api.openweathermap.org/data/2.5/uvi?appid=9f0120827a50e9a11f1c94d939f4dbfc&lat=${response.coord.lat}&lon=${response.coord.lon}`;


        //UV Call 
        $.ajax({
            url: uvIndex, 
            method: "GET"
        }).then(function(response) {

            var currentUV = $("<p>").text("UV Index: " + response.value);

           $(currentUV).addClass("col-2");

            cWeather.append(currentUV);

            // UV conditional based on severity of UV
            if (response.value <= 2) {
                $(currentUV).addClass("favorable");
            } else if (response.value <= 7) {
                $(currentUV).addClass("moderate");
            } else if (response.value <= 13) {
                $(currentUV).addClass("severe");
            };
 
        }); 
         
    });
    }


    //5 day forecast call
    $.ajax({
        url: fiveDayW,
        method: "GET"
    }).then(function (response) {


        //Day 1 - Worked with TA to re-factor for less code. Original was repeating each day. 

        cardFun(1, i, "one");
        function cardFun(addNumber, apiList, currentCDay) {
            
            //future date
            var dayOneDate = moment().add(addNumber, 'day').format('dddd');
            var dayOne = $(".day-" + currentCDay + "-date").text(dayOneDate);

            //icon for future date
            var dayFiveIcons = response.list[apiList].weather[0].icon;
            var weatherIcon = "https://openweathermap.org/img/wn/" + dayFiveIcons + ".png"
            var oneIcon = $(".day-" + currentCDay + "-icon").attr('src', weatherIcon);
         
            //creating var and clearing for append 
            var fiveDay1 = $(".day-" + currentCDay); 
            fiveDay1.empty();

            //setting temp/hum for var
            var dayOneTemp = $("<p>").text("Temperature: " + response.list[apiList].main.temp + " °F");
            var dayOneHum = $("<p>").text("Humidity: " + response.list[apiList].main.humidity + "%");
        
            //append 5 day 
            fiveDay1.append(dayOneTemp, dayOneHum); 
        }
        
        //Day 2
        cardFun(2, 8, "two");

        //Day 3
        cardFun(3, 16, "three");

        //Day 4
        cardFun(4, 24, "four");
        
        //Day 5
        cardFun(5, 32, "five");
        
    });
}); 



