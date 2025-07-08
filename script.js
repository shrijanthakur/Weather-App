const weatherIcons = {
    Clear: "clear.png",
    Clouds: "clouds.png",
    Rain: "rain.png",
    Snow: "snow.png",
    Drizzle: "drizzle.png",
    Mist: "mist.png",
    Haze: "mist.png",
    Thunderstorm: "rain.png" 
};

async function updateWeather() {
let value = input.value;

 if (value === "") {
        alert("Please enter a city name");
        return;
    }

    await checkWeather(value);

    if (data.cod === "404") {
        alert("City not found, Please try again");
        return;
    }

    if(data && data.main) {
    temperature.innerHTML = `${data.main.temp}°C`;
     humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${data.wind.speed}Km/hr`;
      city.innerHTML = `${data.name}`;
    image.innerHTML = `<img src="images/${weatherIcons[data.weather[0].main] || "clear.png"}" class="weather-icon" alt="">`

    localStorage.setItem("lastCity", data.name);
    }
    input.value = "";
}

const apiKey = "2327ab3fff4b8697cecf7f79f9f1d425";



let input = document.querySelector(".input-bar"); 
let searchButton = document.querySelector(".search-button"); 
let image = document.querySelector(".image-div"); 
let temperature = document.querySelector(".temperature"); 
let city = document.querySelector(".city"); 
let humidity = document.querySelector(".data1"); 
let wind = document.querySelector(".data2"); 

let data;

async function checkWeather(cityname) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityname}&appid=${apiKey}`;
    try{
    const response = await fetch(apiUrl);
    data = await response.json();
    } catch (error) {
        alert("Unable to fetch weather data");
    }
}


searchButton.addEventListener("click", updateWeather);

input.addEventListener("keydown", (event) => {
    if(event.key ==="Enter") {
        updateWeather();
    }
})

window.addEventListener("DOMContentLoaded", () => {
const lastCity = localStorage.getItem("lastCity");
if (lastCity) {
    input.value =lastCity;
    updateWeather();
}
})
