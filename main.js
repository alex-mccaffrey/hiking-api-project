'use strict';


//***** Snow Report API *******//

const apiKey = 'SnoCountry.example'; 
const searchURL = 'http://feeds.snocountry.net/conditions.php';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displaySnow(responseJson) {
  // if there are previous results, remove them
  console.log("displaying snow");
  console.log(responseJson);
  $('#snow-results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.items.length; i++){
    $('#snow-results-list').append(
      `<li><h3>${responseJson.items[i].resortName}</h3>
      <p>Average Base Depth: ${responseJson.items[i].avgBaseDepthMax}</p>
      <p>Today's High Temp: ${responseJson.items[i].weatherToday_Temperature_High}</p>
      <p>Total Acres Open: ${responseJson.items[i].openDownHillAcres}</p>
      <p>Address: ${responseJson.items[i].resortAddress}</p>
      <a href="${responseJson.items[i].resortCovidPage}" target="_blank">COVIDw Info</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getSnow(resort) {
  console.log('getting snow');
  const params = {
    regions: resort,
    apiKey: apiKey,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displaySnow(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function snowForm() {
  $('#js-snow-form').submit(event => {
    console.log('submitting');
    event.preventDefault();
    //const state = $('#js-state').val();
    const resort = $('#js-resort-name').val();
    console.log(resort);
    getSnow(resort);
    $("#js-snow-form")[0].reset();
  });
}

$(snowForm);




//***** Weather API *******//

const weatherKey = '9fc52be9eec442ba9de25202202011'; 
const weatherUrl = 'https://api.weatherapi.com/v1/forecast.json';


function formatWeatherParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayWeather(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#snow-weather-form').empty();
  // iterate through the items array
  console.log($(responseJson.forecast));
  for (let i = 0; i < responseJson.length; i++){
    $('#weather-results').append(
      `<li><h3>${responseJson.current.temp_f}</h3>
      <p>${responseJson.forcast.forcastday.day.maxtemp_f}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getWeather(zip) {
  console.log('getting weather');
  const params = {
    key: weatherKey,
    q: zip,
  };
  const queryString = formatWeatherParams(params)
  const url = weatherUrl + '?' + queryString + '&days=2';

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayWeather(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function weatherForm() {
  $('#js-weather-form').submit(event => {
    console.log('submitting');
    event.preventDefault();
    const zip = $('#js-zip').val();
    console.log(zip);
    getWeather(zip);
  });
}

$(weatherForm);




//***** Stores API *******//