function formatDate(timestamp) {
  //let now = new Date();
  //let date = document.querySelector("#date");
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
  //let hours = date.getHours();
  //if (hours < 10) {
  //hours = `0${hours}`;
  //}
  //let minutes = now.getMinutes();
  //if (minutes < 10) {
  //minutes = `0${minutes}`;
  //}

  //date.innerHTML = `${day}    ${hours}:${minutes}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

//function formatHours(timestamp) {
//let date = document.querySelector("#date");
//let days = [
//"Sunday",
//"Monday",
//"Tuesday",
//"Wednesday",
//"Thursday",
//"Friday",
//"Saturday",
//];
//let day = days[now.getDay()];
//let hours = now.getHours();
//if (hours < 10) {
//hours = `0${hours}`;
//}
//let minutes = now.getMinutes();
//if (minutes < 10) {
//minutes = `0${minutes}`;

//return `${hours}:${minutes}`;
//}

function currentWeather(response) {
  let h1 = document.querySelector("h1");
  let currentTemp = document.querySelector("#current-temp");
  let conditions = document.querySelector("#conditions");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let currentIcon = document.querySelector("#current-icon");
  let code = response.data.weather[0].icon;
  let date = document.querySelector("#date");

  celsiusTemperature = response.data.main.temp;

  h1.innerHTML = response.data.name;
  date.innerHTML = formatDate(response.data.dt * 1000);
  currentTemp.innerHTML = `${Math.round(celsiusTemperature)}°C`;
  conditions.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  if (code === "01d") {
    currentIcon.setAttribute("src", "images/01d.png");
  } else if (code === "01n") {
    currentIcon.setAttribute("src", "images/01n.png");
  } else if (code === "02d") {
    currentIcon.setAttribute("src", "images/02d.png");
  } else if (code === "02n") {
    currentIcon.setAttribute("src", "images/02n.png");
  } else if (code === "03d") {
    currentIcon.setAttribute("src", "images/03d.png");
  } else if (code === "03n") {
    currentIcon.setAttribute("src", "images/03n.png");
  } else if (code === "04d") {
    currentIcon.setAttribute("src", "images/04d.png");
  } else if (code === "04n") {
    currentIcon.setAttribute("src", "images/04n.png");
  } else if (code === "09d") {
    currentIcon.setAttribute("src", "images/09d.png");
  } else if (code === "09n") {
    currentIcon.setAttribute("src", "images/09n.png");
  } else if (code === "10d") {
    currentIcon.setAttribute("src", "images/10d.png");
  } else if (code === "10n") {
    currentIcon.setAttribute("src", "images/10n.png");
  } else if (code === "11d") {
    currentIcon.setAttribute("src", "images/11d.png");
  } else if (code === "11n") {
    currentIcon.setAttribute("src", "images/11n.png");
  } else if (code === "13d") {
    currentIcon.setAttribute("src", "images/13d.png");
  } else if (code === "13n") {
    currentIcon.setAttribute("src", "images/13n.png");
  } else if (code === "50d") {
    currentIcon.setAttribute("src", "images/50d.png");
  } else if (code === "50n") {
    currentIcon.setAttribute("src", "images/50n.png");
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

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2">
            <div class="card">
              <div class="card-body">
                <p class="time">${formatHours(forecast.dt * 1000)}</p>
                <img
                  src="images/cloudgrey.png"
                  class="card-img-top"
                  alt="Cloud"
                />
                <p class="card-text">${Math.round(
                  forecast.main.temp_max
                )}° | ${Math.round(forecast.main.temp_min)}°</p>
              </div>
            </div>
          </div>
          </div>`;
  }
}

function search(city) {
  let apiKey = "e557d742ef6457c9163f2c8c41a40455";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
