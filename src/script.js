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

  h1.innerHTML = response.data.name;
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  conditions.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
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

function searchCity(event) {
  event.preventDefault();
  let apiKey = "e557d742ef6457c9163f2c8c41a40455";
  let city = document.querySelector("#city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentWeather);
}

let searchForm = document.querySelector("#citySearch");
searchForm.addEventListener("submit", searchCity);

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
