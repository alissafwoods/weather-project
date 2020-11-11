let now = new Date();
let date = document.querySelector("#date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
date.innerHTML = `${day}    ${hours}:${minutes}`;

function currentWeather(response) {
  let h1 = document.querySelector("h1");
  let currentTemp = document.querySelector("#current-temp");
  let conditions = document.querySelector("#conditions");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let currentIcon = document.querySelector("#current-icon");
  let code = response.data.weather[0].icon;

  celsiusTemperature = response.data.main.temp;

  h1.innerHTML = response.data.name;
  currentTemp.innerHTML = `${Math.round(celsiusTemperature)}°C`;
  conditions.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  if (code === "01d") {
    currentIcon.setAttribute("src", "images/sungrey.png");
  } else if (code === "01n") {
    currentIcon.setAttribute("src", "images/moongrey.png");
  } else if (code === "02d") {
    currentIcon.setAttribute("src", "images/sunandcloudgrey.png");
  } else if (code === "02n") {
    currentIcon.setAttribute("src", "images/moonandcloudgrey.png");
  } else if (code === "03d") {
    currentIcon.setAttribute("src", "images/cloudgrey.png");
  } else if (code === "03n") {
    currentIcon.setAttribute("src", "images/cloudgrey.png");
  } else if (code === "04d") {
    currentIcon.setAttribute("src", "images/cloudsgrey.png");
  } else if (code === "04n") {
    currentIcon.setAttribute("src", "images/cloudsgrey.png");
  } else if (code === "09d") {
    currentIcon.setAttribute("src", "images/raingrey.png");
  } else if (code === "09n") {
    currentIcon.setAttribute("src", "images/raingrey.png");
  } else if (code === "10d") {
    currentIcon.setAttribute("src", "images/raingrey.png");
  } else if (code === "10n") {
    currentIcon.setAttribute("src", "images/raingrey.png");
  } else if (code === "11d") {
    currentIcon.setAttribute("src", "images/thundergrey.png");
  } else if (code === "11n") {
    currentIcon.setAttribute("src", "images/thundergrey.png");
  } else if (code === "13d") {
    currentIcon.setAttribute("src", "images/snowgrey.png");
  } else if (code === "13n") {
    currentIcon.setAttribute("src", "images/snowgrey.png");
  } else if (code === "50d") {
    currentIcon.setAttribute("src", "images/cloudgrey.png");
  } else if (code === "50n") {
    currentIcon.setAttribute("src", "images/cloudgrey.png");
  }
}

// document.querySelector("h1").innerHTML = response.data.name;
// document.querySelector("#current-temp").innerHTML = `${Math.round(
// response.data.main.temp
// )}°C`;
// document.querySelector("#conditions").innerHTML =
// response.data.weather[0].description;
// document.querySelector("#humidity").innerHTML = response.data.main.humidity;
// document.querySelector("#wind").innerHTML = Math.round(
// response.data.wind.speed
// );
// }

function search(city) {
  let apiKey = "e557d742ef6457c9163f2c8c41a40455";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  search(city.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temp");
  currentTemperature.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#citySearch");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Vancouver");

// Week 5 Bonus Feature

function showCurrentLocationTemperature(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e557d742ef6457c9163f2c8c41a40455";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(currentWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentLocationTemperature);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);
