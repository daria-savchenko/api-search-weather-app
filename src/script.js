function showRelInfo(response) {
  console.log(response.data.main.temp);
}

let apiKey = "7ee6d1b146fe97f48a0778bfde65d48b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showRelInfo);
