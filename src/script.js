let now = new Date();
console.log(now);

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

function zeroHours() {
  if (hours < 10) {
    hours = `0${hours}`;
  }
}
zeroHours();
let minutes = now.getMinutes();
function zeroMinutes() {
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
}
zeroMinutes();
let currentTime = document.querySelector("#time");
currentTime.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let enteredCity = document.querySelector("#entered-city");
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = enteredCity.value;
  console.log(enteredCity.value);
  let apiKey = "c7763e3941cdedda26666f22c5122f53";
  let city = enteredCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    console.log(temperature);

    let cityTemp = document.querySelector("#temperature");
    cityTemp.innerHTML = `${temperature}`;
    let weatherDescription = document.querySelector("#description");
    weatherDescription.innerHTML = response.data.weather[0].description;
    let windCurrent = Math.round(response.data.wind.speed);
    let wind = document.querySelector("#wind");
    wind.innerHTML = windCurrent;

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
      let temperature = Math.round(response.data.main.temp);
      console.log(temperature);
      let cityTempCurrent = document.querySelector("#temperature");
      cityTempCurrent.innerHTML = `${temperature}`;
      let windCurrent = Math.round(response.data.wind.speed);
      let wind = document.querySelector("#wind");
      wind.innerHTML = windCurrent;

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
