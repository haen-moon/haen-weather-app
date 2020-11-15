function displayTemperature(response){
  console.log(response.data);
  console.log(response.data.data[0].temp);
}

apiKey ="6e11116e2ea242a49ab7f53ad3ff5ae4"
units = 'M'
apiUrl = `https://api.weatherbit.io/v2.0/current?city=Paris,FR&key=${apiKey}&units=${units}`

console.log(apiUrl)

axios.get(apiUrl).then(displayTemperature);