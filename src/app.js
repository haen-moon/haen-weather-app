function displayTemperature(response) {
  console.log(response.data.data[0]);
  let cityNameElement = document.querySelector("#city-name");
  let iconElement = document.querySelector("#icon");
  let temperatureElement = document.querySelector("#temperature");
  let weatherDescription = document.querySelector("#weather-description");
  let appTempElement = document.querySelector("#app-temp");
  let precipElement = document.querySelector("#precip");
  let windSpdElement = document.querySelector("#wind-spd");
  let humidityElement = document.querySelector("#humidity");
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");
  let uvElement = document.querySelector("#uv");
  let airQualityElement = document.querySelector("#air-quality");
  let code = response.data.data[0].weather.code.toString();
  let icon = response.data.data[0].weather.icon.toString();
  let dayNight = icon.substring(icon.length - 1);
  let svg_file = "";
  let uvIndex = Math.round((response.data.data[0].uv * 100) / 100);
  let uvDesc = "";
  let airIndex = response.data.data[0].aqi;
  let airDesc = "";

  celsiusTemp = response.data.data[0].temp;

  cityNameElement.innerHTML = response.data.data[0].city_name;

  if (code.substring(0, 2) == "20") {
    svg_file = "thunder-w-rain";
  } else if (code.substring(0, 2) == "23") {
    svg_file = "thunder";
  } else if (
    code.substring(0, 1) == "3" ||
    code.substring(0, 1) == "5" ||
    code.substring(0, 1) == "9"
  ) {
    svg_file = "rain";
  } else if (code.substring(0, 1) == "6") {
    svg_file = "snow";
  } else if (code.substring(0, 1) == "7" && dayNight == "d") {
    svg_file = "foggy-d";
  } else if (code.substring(0, 1) == "7" && dayNight == "n") {
    svg_file = "foggy-n";
  } else if (code.substring(0, 3) == "800" && dayNight == "d") {
    svg_file = "clear-d";
  } else if (code.substring(0, 3) == "800" && dayNight == "n") {
    svg_file = "clear-n";
  } else {
    svg_file = "cloud";
  }
  iconElement.setAttribute("src", `src/img/${svg_file}.svg`);

  temperatureElement.innerHTML = Math.round(response.data.data[0].temp);
  weatherDescription.innerHTML = response.data.data[0].weather.description;

  appTempElement.innerHTML = `${response.data.data[0].app_temp}º`;
  precipElement.innerHTML = `${response.data.data[0].precip}%`;
  windSpdElement.innerHTML = `${response.data.data[0].wind_spd}m/s (${response.data.data[0].wind_cdir_full})`;
  humidityElement.innerHTML = `${response.data.data[0].rh}%`;

  sunriseElement.innerHTML = new Date(
    `01/01/1970 ${response.data.data[0].sunrise} UTC`
  ).toLocaleString("en-US", {
    timeStyle: "short",
    timeZone: `${response.data.data[0].timezone}`,
  });
  sunsetElement.innerHTML = new Date(
    `01/01/1970 ${response.data.data[0].sunset} UTC`
  ).toLocaleString("en-US", {
    timeStyle: "short",
    timeZone: `${response.data.data[0].timezone}`,
  });

  if (uvIndex >= 11) {
    uvDesc = `Extreme (${uvIndex})`;
  } else if (uvIndex >= 8 && uvIndex < 11) {
    uvDesc = `Very High (${uvIndex})`;
  } else if (uvIndex >= 6 && uvIndex < 8) {
    uvDesc = `High (${uvIndex})`;
  } else if (uvIndex >= 3 && uvIndex < 6) {
    uvDesc = `Moderate (${uvIndex})`;
  } else if (uvIndex >= 0 && uvIndex < 3) {
    uvDesc = `Low (${uvIndex})`;
  }
  uvElement.innerHTML = uvDesc;

  if (airIndex >= 301) {
    airDesc = `Hazardous (${airIndex})`;
  } else if ((airIndex >= 201) & (airIndex < 301)) {
    airDesc = `Very Unhealthy (${airIndex})`;
  } else if ((airIndex >= 101) & (airIndex < 201)) {
    airDesc = `Unhealthy (${airIndex})`;
  } else if ((airIndex >= 51) & (airIndex < 101)) {
    airDesc = `Moderate (${airIndex})`;
  } else if ((airIndex >= 0) & (airIndex < 51)) {
    airDesc = `Good (${airIndex})`;
  }
  airQualityElement.innerHTML = airDesc;
}

function search(city) {
  let apiKey = "6e11116e2ea242a49ab7f53ad3ff5ae4";
  let units = "M";
  let apiUrl = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFarenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

search("New York");

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);
