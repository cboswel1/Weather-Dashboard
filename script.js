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

        var wi = $(".weather-icon").attr('src', weatherIcon);

        
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


        //Day 1

        // Future Date
        var dayOneDate = moment().add(1, 'day').format('dddd');
        var dayOne = $(".day-one-date").text(dayOneDate);

        //Icon for Future Date
        var dayOneIcons = response.list[i].weather[0].icon;
        var weatherIcon = "https://openweathermap.org/img/wn/" + dayOneIcons + ".png"
        var oneIcon = $(".day-one-icon").attr('src', weatherIcon);

        //Creating var and clearing for append
        var fiveDay1 = $(".day-one"); 
        fiveDay1.empty();

        //setting temp / hum to var
        var dayOneTemp = $("<p>").text("Temperature: " + response.list[0].main.temp + " °F");
        var dayOneHum = $("<p>").text("Humidity: " + response.list[0].main.humidity + "%");

        //appending to 5 day
        fiveDay1.append(dayOneTemp, dayOneHum); 


        //Day 2

        var dayTwoDate = moment().add(2, 'day').format('dddd');
        var dayTwo = $(".day-two-date").text(dayTwoDate);

        var dayTwoIcons = response.list[8].weather[0].icon;
        var weatherIcon2 = "https://openweathermap.org/img/wn/" + dayTwoIcons + ".png"
        var twoIcon = $(".day-two-icon").attr('src', weatherIcon2);

        var fiveDay2 = $(".day-two"); 
        fiveDay2.empty();

        var dayTwoTemp = $("<p>").text("Temperature: " + response.list[8].main.temp + " °F");
        var dayTwoHum = $("<p>").text("Humidity: " + response.list[8].main.humidity + "%");
        
        fiveDay2.append(dayTwoTemp, dayTwoHum); 


        //Day 3

        var dayThreeDate = moment().add(3, 'day').format('dddd');
        var dayThree = $(".day-three-date").text(dayThreeDate);

        var dayThreeIcons = response.list[16].weather[0].icon;
        var weatherIcon3 = "https://openweathermap.org/img/wn/" + dayThreeIcons + ".png"
        var threeIcon = $(".day-three-icon").attr('src', weatherIcon3);

        var fiveDay3 = $(".day-three"); 
        fiveDay3.empty();

        var dayThreeTemp = $("<p>").text("Temperature: " + response.list[16].main.temp + " °F");
        var dayThreeHum = $("<p>").text("Humidity: " + response.list[16].main.humidity + "%");
    
        fiveDay3.append(dayThreeTemp, dayThreeHum); 


        //Day 4

        var dayFourDate = moment().add(4, 'day').format('dddd');
        var dayFour = $(".day-four-date").text(dayFourDate);

        var dayFourIcons = response.list[16].weather[0].icon;
        var weatherIcon4 = "https://openweathermap.org/img/wn/" + dayFourIcons + ".png"
        var fourIcon = $(".day-four-icon").attr('src', weatherIcon4);
        
        var fiveDay4 = $(".day-four"); 
        fiveDay4.empty();

        var dayFourTemp = $("<p>").text("Temperature: " + response.list[24].main.temp + " °F");
        var dayFourHum = $("<p>").text("Humidity: " + response.list[24].main.humidity + "%");
        
        fiveDay4.append(dayFourTemp, dayFourHum); 


        //Day 5

        var dayFiveDate = moment().add(5, 'day').format('dddd');
        var dayFive = $(".day-five-date").text(dayFiveDate);

        var dayFiveIcons = response.list[24].weather[0].icon;
        var weatherIcon5 = "https://openweathermap.org/img/wn/" + dayFiveIcons + ".png"
        var fiveIcon = $(".day-five-icon").attr('src', weatherIcon5);
         
        var fiveDay5 = $(".day-five"); 
        fiveDay5.empty();

        var dayFiveTemp = $("<p>").text("Temperature: " + response.list[24].main.temp + " °F");
        var dayFiveHum = $("<p>").text("Humidity: " + response.list[24].main.humidity + "%");
        
        fiveDay5.append(dayFiveTemp, dayFiveHum); 

    });



 


}); 



