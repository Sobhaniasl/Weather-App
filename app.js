// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const windElement = document.querySelector(".wind p")
const search = document.getElementById("add")

// App data

const weather = {};

weather.temperature = {
    unit: "celsius"
}


// App Const and Vars
const KELVIN = 273
//API Key
const key = "fc10ba00ea743d18df7d6f3a06dcab3e";

// //Check if Browser Supports Geolocation
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser does not Support Geolocation</p>";
}

// Set User's Position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);

}

//Show Error When there is an Issue with Geolocation Service

function showError(error){
    notificationElement.style.display ="block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}

//Get Weather from API Provider
function getWeather(latitude, longitude){
    let api = 
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api);
    fetch(api)
    .then(function(respone){
        let data = respone.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp-KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
        wind = data.wind.speed
    })
    .then(function(){
        displayWeather();
    })
}

// //Display Weather To UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    windElement.innerHTML = `<p>Wind speed</p>${wind}`;
}
// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});


