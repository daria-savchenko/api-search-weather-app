function formatDate(timez) {
  let now = new Date();
  localTime = now.getTime();
  localOffset = now.getTimezoneOffset() * 60000;
  utc = localTime + localOffset;
  let relCity = utc + 1000 * timez;
  let nd = new Date(relCity);
  let minutes = nd.getMinutes();
  let hours = nd.getHours();
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = nd.getDay();
  let weekDay = weekDays[day];

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${weekDay}, ${hours}:${minutes}`;
}

//weather pic

function showPicAccToWeather(weather) {
  let sunny = ["Clear"];
  let snowy = ["Snow"];
  let rainy = ["Rain", "Drizzle", "Thunderstorm"];
  let clouds = [
    "Clouds",
    "Tornado",
    "Squall",
    "Ash",
    "Dust",
    "Sand",
    "Fog",
    "Dust",
    "Haze",
    "Smoke",
    "Mist",
  ];

  if (sunny.includes(weather)) {
    return "sunny";
  } else if (snowy.includes(weather)) {
    return "snowy";
  } else if (rainy.includes(weather)) {
    return "rainy";
  } else if (clouds.includes(weather)) {
    return "cloudy";
  }
}

// forecast 2

function forecastWeekDay(day, offset) {
  let now = new Date();
  localTime = now.getTime();
  localOffset = now.getTimezoneOffset() * 60000;
  utc = localTime + localOffset;
  let relCity = utc + 1000 * offset;
  let nd = new Date(relCity);
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let getToday = nd.getDay();
  let today = weekDays[getToday];

  if (today == "Sun") {
    forecastDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  } else if (today == "Mon") {
    forecastDays = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
  } else if (today == "Tue") {
    forecastDays = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  } else if (today == "Wed") {
    forecastDays = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  } else if (today == "Thu") {
    forecastDays = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];
  } else if (today == "Fri") {
    forecastDays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  } else if (today == "Sat") {
    forecastDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  }

  return forecastDays[day];
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = response.data.daily;
  days.forEach(function (forecastDay, index) {
    let weatherForPic = forecastDay.weather[0].main;
    let offset = response.data.timezone_offset;
    let forecastTemp = forecastDay.temp.day;
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col forecast-card">
      <p class="forecast-day">${forecastWeekDay(index, offset)}</p>
        
        <img
          src="img/${showPicAccToWeather(weatherForPic)}-forecast.png"
          alt="${weatherForPic}"
          class="forecast-pic"
        />
      <p class="forecast-temp cels-color" id="forecast-temp">${Math.round(
        forecastTemp
      )}°</p>
    </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML + `</div>`;
}

function getForecast(coordinates) {
  let apiKey = "7ee6d1b146fe97f48a0778bfde65d48b";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

//

function showRelInfo(response) {
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = Math.round(response.data.main.temp);

  celsTemp = Math.round(response.data.main.temp);

  let humid = document.querySelector("#humid");
  humid.innerHTML = `${response.data.main.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed * 3.6)}km/h`;

  let mainTime = document.querySelector("#main-time");
  let timezone = response.data.timezone;
  mainTime.innerHTML = formatDate(timezone);

  // mainPic
  let mainPic = document.querySelector("#main-pic-container");
  let descr = response.data.weather[0].description;
  let weatherDesc = response.data.weather[0].main;

  let mainPicHTML = `<img src="img/${showPicAccToWeather(
    weatherDesc
  )}-main.png" 
  alt="${descr}" 
  class="main-pic"/>`;

  mainPic.innerHTML = mainPicHTML;

  //

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  // forecast part 1

  getForecast(response.data.coord);
}

// current info on default city upon page loading

function showDefaultInfo(defCity) {
  let apiKey = "7ee6d1b146fe97f48a0778bfde65d48b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showRelInfo);
}

showDefaultInfo("New York");

//

function showthroughAxios(event) {
  event.preventDefault();
  let inputValue = document.querySelector("#search-input").value;

  let apiKey = "7ee6d1b146fe97f48a0778bfde65d48b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showRelInfo);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showthroughAxios);
