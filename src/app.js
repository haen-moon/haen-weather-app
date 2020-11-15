function displayTemperature(response){
  console.log(response.data);
  console.log(response.data.data[0].temp);
  let cityNameElement = document.querySelector("#city-name");

  let temperatureElement = document.querySelector("#temperature");
  
  let weatherDescription = document.querySelector("#weather-description");
  
  let appTempElement = document.querySelector("#app-temp");
  let precipElement = document.querySelector("#precip");
  let windSpdElement = document.querySelector("#wind-spd");
  let humidityElement = document.querySelector("#humidity");

  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");
  let uvElement = document.querySelector("#uv")
  let airQualityElement = document.querySelector("#air-quality")

  temperatureElement.innerHTML = Math.round(response.data.data[0].temp);

  cityNameElement.innerHTML = response.data.data[0].city_name;
  
  weatherDescription.innerHTML = response.data.data[0].weather.description;
  
  appTempElement.innerHTML = `${response.data.data[0].app_temp}º`;
  precipElement.innerHTML = `${response.data.data[0].precip}%`;
  windSpdElement.innerHTML = `${response.data.data[0].wind_spd}m/s (${response.data.data[0].wind_cdir_full})`;
  humidityElement.innerHTML = `${response.data.data[0].rh}%`;

  sunriseElement.innerHTML = response.data.data[0].sunrise;
  sunsetElement.innerHTML = response.data.data[0].sunset;
  
  let uvIndex = response.data.data[0].uv
  let uvDesc =""

  if (uvIndex>=11) {
    uvDesc = `Extreme (${uvIndex})`;
  } else if (uvIndex>=8 & uvIndex<11){
    uvDesc = `Very High (${uvIndex})`;
  } else if (uvIndex>=6 & uvIndex<8){
    uvDesc = `High (${uvIndex})`;
  } else if (uvIndex>=3 & uvIndex<6){
    uvDesc = `Moderate (${uvIndex})`;
  } else if (uvIndex>=0 & uvIndex<3){
    uvDesc = `Low (${uvIndex})`;
  }
  uvElement.innerHTML = uvDesc;

  let airIndex = response.data.data[0].aqi
  let airDesc =""

  if (airIndex>=301) {
    airDesc = `Hazardous (${airIndex})`;
  } 
  else if (airIndex>=201 & airIndex<301){
    airDesc = `Very Unhealthy (${airIndex})`;
  } 
  else if (airIndex>=101 & airIndex<201){
    airDesc = `Unhealthy (${airIndex})`;
  } 
  else if (airIndex>=51 & airIndex<101){
    airDesc = `Moderate (${airIndex})`;
  } 
  else if (airIndex>=0 & airIndex<51){
    airDesc = `Good (${airIndex})`;
  }
  airQualityElement.innerHTML =airDesc;
}


apiKey ="6e11116e2ea242a49ab7f53ad3ff5ae4"
units = 'M'
apiUrl = `https://api.weatherbit.io/v2.0/current?city=Singapore&key=${apiKey}&units=${units}`

console.log(apiUrl)

axios.get(apiUrl).then(displayTemperature);