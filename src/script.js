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

  let mainPic = document.querySelector("#main-pic");
  let descr = response.data.weather[0].description;
  mainPic.setAttribute("alt", `${descr}`);

  let weatherDesc = response.data.weather[0].main;

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

  if (sunny.includes(weatherDesc)) {
    mainPic.setAttribute("src", "img/sunny-main.png");
  } else if (snowy.includes(weatherDesc)) {
    mainPic.setAttribute("src", "img/snowy-main.png");
  } else if (rainy.includes(weatherDesc)) {
    mainPic.setAttribute("src", "img/rainy-main.png");
  } else if (clouds.includes(weatherDesc)) {
    mainPic.setAttribute("src", "img/cloudy-main.png");
  }

  // °F to °C part 2

  let switchToFahr = document.querySelector("#switch-to-fahr");
  switchToFahr.classList.remove("hidden-metric");

  let cels = document.querySelector("#main-temp");
  cels.innerHTML = celsTemp;
  cels.classList.remove("fahr-color");
  cels.classList.add("cels-color");

  let metricName = document.querySelector("#metric-name");
  metricName.innerHTML = "°C";
  metricName.classList.remove("fahr-color");
  metricName.classList.add("cels-color");

  let switchToCels = document.querySelector("#switch-to-cels");
  switchToCels.classList.add("hidden-metric");
}

function showthroughAxios(event) {
  event.preventDefault();
  let inputValue = document.querySelector("#search-input").value;
  let city = document.querySelector("#city");
  city.innerHTML = inputValue;

  let apiKey = "7ee6d1b146fe97f48a0778bfde65d48b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showRelInfo);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showthroughAxios);

// °F to °C part 1
function showInFahr(event) {
  event.preventDefault();
  let fahr = document.querySelector("#main-temp");
  fahr.innerHTML = Math.round((celsTemp * 9) / 5 + 32);
  fahr.classList.remove("cels-color");
  fahr.classList.add("fahr-color");

  let metricName = document.querySelector("#metric-name");
  metricName.innerHTML = "°F";
  metricName.classList.remove("cels-color");
  metricName.classList.add("fahr-color");

  let switchToCels = document.querySelector("#switch-to-cels");
  switchToCels.classList.remove("hidden-metric");
  let switchToFahr = document.querySelector("#switch-to-fahr");
  switchToFahr.classList.add("hidden-metric");
}

celsTemp = null;

let switchToFahr = document.querySelector("#switch-to-fahr");
switchToFahr.addEventListener("click", showInFahr);

function showInCels(event) {
  event.preventDefault();
  let cels = document.querySelector("#main-temp");
  cels.innerHTML = celsTemp;
  cels.classList.remove("fahr-color");
  cels.classList.add("cels-color");

  let metricName = document.querySelector("#metric-name");
  metricName.innerHTML = "°C";
  metricName.classList.remove("fahr-color");
  metricName.classList.add("cels-color");

  let switchToFahr = document.querySelector("#switch-to-fahr");
  switchToFahr.classList.remove("hidden-metric");
  let switchToCels = document.querySelector("#switch-to-cels");
  switchToCels.classList.add("hidden-metric");
}

let switchToCels = document.querySelector("#switch-to-cels");
switchToCels.addEventListener("click", showInCels);
