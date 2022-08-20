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

  let humid = document.querySelector("#humid");
  humid.innerHTML = `${response.data.main.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed * 3.6)}km/h`;

  let mainTime = document.querySelector("#main-time");
  let timezone = response.data.timezone;
  mainTime.innerHTML = formatDate(timezone);
}

let apiKey = "7ee6d1b146fe97f48a0778bfde65d48b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showRelInfo);
