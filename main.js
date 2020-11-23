'use strict';


//***** Snow Report API *******//
/*const apiKey = 'SnoCountry.example'; 
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
      <a href="${responseJson.items[i].resortCovidPage}" target="_blank">COVID Info</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getSnow(state) {
  console.log('getting snow');
  const params = {
    //regions: resort,
    apiKey: apiKey,
    states: state,
    resortType: 'Alpine',
    updatesOnly: true,
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
    const state = $('#js-state').val();
    //const resort = $('#js-resort-name').val();
    console.log(state);
    getSnow(state);
    $("#js-snow-form")[0].reset();
  });
}

$(snowForm);/*




/**** Hiking Trails API *****/


const trailKey = '200979560-34016932461a258909dfbe882647288f';
const trailUrl = 'https://www.hikingproject.com/data/get-trails'


function formatTrailParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayTrails(responseJson) {
  console.log(responseJson);
  $('#weather-results').empty();
    $('#weather-results').append(
      `<h3>${responseJson.location.name}, ${responseJson.location.region}</h3>
      <p>Current Condition: ${responseJson.current.condition.text}</p>
      <p>Feels Like ${responseJson.current.feelslike_f}ºF</p>
      <p>Wind Speed: ${responseJson.current.wind_mph}mph</p>
      <p>Last updated at ${responseJson.current.last_updated}</p>`
    ); 
  $('#weather-results').removeClass('hidden');
};

function locationLatLon(){

}



function getTrails(city) {
  console.log('getting trails');
  const params = {
    lat: '',
    lon: '',
    key: trailKey,
  };
  const queryString = formatTrailParams(params)
  const url = trailUrl + '?' + queryString;

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

function trailForm() {
  $('#js-trail-form').submit(event => {
    event.preventDefault();
    const city = $('#js-hike-city').val();
    getWeather(city);
    getTrails(city);
    $("#js-trail-form")[0].reset();
  });
}

$(trailForm());








//***** Weather API *******/

const weatherKey = '9fc52be9eec442ba9de25202202011'; 
const weatherUrl = 'https://api.weatherapi.com/v1/forecast.json';


function formatWeatherParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayWeather(responseJson) {
  console.log(responseJson);
  $('#weather-results').empty();
    $('#weather-results').append(
      `<h3>${responseJson.location.name}, ${responseJson.location.region}</h3>
      <p>Current Condition: ${responseJson.current.condition.text}</p>
      <p>Feels Like ${responseJson.current.feelslike_f}ºF</p>
      <p>Wind Speed: ${responseJson.current.wind_mph}mph</p>
      <p>Last updated at ${responseJson.current.last_updated}</p>`
    ); 
  $('#weather-results').removeClass('hidden');
};

function getWeather(city) {
  console.log('getting weather');
  const params = {
    key: weatherKey,
    q: city,
  };
  const queryString = formatWeatherParams(params)
  const url = weatherUrl + '?' + queryString + '&days=3';

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
    event.preventDefault();
    const city = $('#js-city').val();
    getWeather(city);
    $("#js-weather-form")[0].reset();
  });
}

$(weatherForm);




//***** Stores API *******//