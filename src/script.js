function search(event) {
  event.preventDefault();
  let enteredCity = document.querySelector("#entered-city");
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = enteredCity.value;
  console.log(enteredCity.value);
  let apiKey = "c7763e3941cdedda26666f22c5122f53";
  let city = enteredCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
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
    let time = `${day} ${hours}:${minutes}`;
    return time;
  }

  function showTemperature(response) {
    console.log(response.data);

    celsiusTemp = response.data.main.temp;

    let temperature = Math.round(celsiusTemp);
    console.log(temperature);

    let cityTemp = document.querySelector("#temperature");
    cityTemp.innerHTML = `${temperature}`;
    let dateTime = document.querySelector("#time");
    dateTime.innerHTML = formatDate(response.data.dt * 1000);
    let weatherDescription = document.querySelector("#description");
    weatherDescription.innerHTML = response.data.weather[0].description;
    let windCurrent = Math.round(response.data.wind.speed);
    let wind = document.querySelector("#wind");
    wind.innerHTML = windCurrent;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    let feelsLike = Math.round(response.data.main.temp);
    let feelsLikeCurrent = document.querySelector("#feelsLike");
    feelsLikeCurrent.innerHTML = `${feelsLike}`;
  }

  axios.get(`${apiUrl}`).then(showTemperature);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", search);

function currentLocation(event) {
  event.preventDefault();
  function showPosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "c7763e3941cdedda26666f22c5122f53";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    function showTemperature(response) {
      let cityCurrent = response.data.name;
      let currentCity = document.querySelector("#city");
      currentCity.innerHTML = cityCurrent;
      let iconElement = document.querySelector("#icon");
      iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      celsiusTemp = response.data.main.temp;
      let temperature = Math.round(celsiusTemp);
      console.log(temperature);
      let cityTempCurrent = document.querySelector("#temperature");
      cityTempCurrent.innerHTML = `${temperature}`;
      let dateTime = document.querySelector("#time");
      dateTime.innerHTML = formatDate(response.data.dt * 1000);
      let windCurrent = Math.round(response.data.wind.speed);
      let wind = document.querySelector("#wind");
      wind.innerHTML = windCurrent;
      let weatherDescription = document.querySelector("#description");
      weatherDescription.innerHTML = response.data.weather[0].description;
      let feelsLike = Math.round(response.data.main.temp);
      let feelsLikeCurrent = document.querySelector("#feelsLike");
      feelsLikeCurrent.innerHTML = `${feelsLike}`;
    }

    axios.get(`${apiUrl}`).then(showTemperature);
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}

let current = document.querySelector("#current");
current.addEventListener("click", currentLocation);

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let celsiusTemp = null;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = `
      <div class="row">
        <div class="col-2">
          <div class="card">
            <div class="days">Tuesday</div>
            <img
              class="mini-icon"
              src="http://openweathermap.org/img/wn/10d@2x.png"
              alt=""
              width="36"
            />
            <div class="weather-forecast-temperature">
              <span class="high">22°C </span>
              <span class="night">18°C</span>
            </div>
          </div>
        </div>
      </div>
    `;
}
displayForecast();
