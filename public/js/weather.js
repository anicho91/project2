

//Dynamically generate the weather window on the main page
$(".weathercont").prepend(`<div class="row">
                        <div class="col-md-5 ml-auto">
                            <div class="card">
                              <div class="card-body" id="weather">
                                  <h1 class="display-4">Atlanta, GA</h1>
                              </div>
                            </div>
                        </div>
                    </div>`);

//Dynamically generate the weekly forecast page on click
const forecastPage = $(".forecast");

forecastPage.append(`<div class="card">
                         <div class="card-body">
                            <table class="table" id="forecast-table">
                              <thead id="forecast-head">
                                  <tr class="table-borderless text-center">
                                     
                                  </tr>
                              </thead>
                            </table>
                         </div>
                      </div>`);


//This function converts unixtimestamp to the timezone 12hours based
const convertTime = function (unixTimeStamp) {
  const date = new Date(unixTimeStamp * 1000);
  return date.toLocaleString();
};


//This function converts values into percentages
const getpercentage = function (value) {
  let percent = value * 100;
  percent = `${percent}`;
  if (percent.includes(".")) {
    const dotIndex = percent.indexOf(".");
    percent = percent.substring(0, dotIndex + 3);
  }
  return percent;
}

//This function converts meters per seconds to miles per hour
const getSpeed = function (numb) {
  let mph = numb * (3600 / 1609.3);
  mph = `${mph}`;
  if (mph.includes(".")) {
    const dotIndex = mph.indexOf(".");
    mph = mph.substring(0, dotIndex + 3);
  }
  return mph;
}

//This function gets the day
const getday = function (time) {
  const date = new Date(time);
  let day = date.getDay();
  if (day === 0) {
    day = "Sunday";
  } else if (day === 1) {
    day = "Monday";
  } else if (day === 2) {
    day = "Tuesday";
  } else if (day === 3) {
    day = "Wednesday";
  } else if (day === 4) {
    day = "Thursday";
  } else if (day === 5) {
    day = "Friday";
  } else if (day === 6) {
    day = "Saturday";
  }
  return day;
}

//This function get the hour

// API key
const APIKey = '482352b90547e9e4ea9f55ee0c352d57';

// URL

let queryURL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${APIKey}/33.7490,-84.3880?exclude=minutely,alerts,flags&unit=us`;

//AJAX call to the darksky API
$.ajax({
  url: queryURL,
  method: 'GET'
}).then(function (data) {
  

  //Create elements to append the results
  const weather = $("#weather");
  const forecastTable = $("#forecast-table");
  const forecastHead = $("#forecast-head");
  const forecastBody = $("<tbody>");

  //Append the table body to the forecast table
  forecastTable.append(forecastBody);

  //Append rows to the table body
  forecastBody.append(`<tr id="hour"><th><b>Time: </b></th></tr>
                       <tr id="precipitation"><th><b>Chance of Rain: </b></th></tr>
                       <tr id="temperatures"><th><b>Hourly: </b></th></tr>
                       <tr id="next-day"></tr>
                       `);

  //Grab the values 
  const time = data.currently.time;
  const temp = data.currently.temperature;
  const humidity = data.currently.humidity;
  const rainProba = data.currently.precipProbability;
  const windspeed = data.currently.windSpeed;
  const icon = data.currently.icon;

  //Convert values
  const UTCtime = convertTime(time);
  const humidityPercent = getpercentage(humidity);
  const rainChance = getpercentage(rainProba);
  const mphSpeed = getSpeed(windspeed);

  //Append to the html pages
  weather.append(`<p>${UTCtime}</p>`);
  weather.append(`<p>${icon}</p>`);


  weather.append(`<h2><i class="fas fa-temperature-high"></i>${temp}</h2>`);

  //Create a new div to append geo variables
  const geoVar = $("<div>").addClass("geoVar float-right");

  geoVar.append(`<p>humidity: ${humidityPercent} %</p>
                 <p>Precipitation: ${rainChance} %</p>
                 <p>Wind: ${mphSpeed} mph</p>`);

  weather.append(geoVar);

  //Append a button to the weather card
  // geoVar.append(`<button type="button" class="btn3">See All</button>`);

  //Grab temperatures for the next 6 hours
  const hourlyForecast = data.hourly.data;

  for (let i = 0; i < 12; i++) {
    const hours = hourlyForecast[i].time;
    const formatedHour =convertTime(hours);
    const commaIndex = formatedHour.indexOf(",");
    const columnIndex = formatedHour.indexOf(":");
    const hr = formatedHour.slice(commaIndex + 1, columnIndex);
    const ampm = formatedHour.slice(columnIndex + 7);
    const hTemperatures = Math.round(hourlyForecast[i].temperature);
    const rainChance = Math.round(getpercentage(hourlyForecast[i].precipProbability));
    $("#hour").append(`<td>${hr} ${ampm}</td>`);
    $("#precipitation").append(`<td>${rainChance} %</td>`);
    $("#temperatures").append(`<td>${hTemperatures} º</td>`);
  }

  //Grab temperatures for the week
  const dailyForecast = data.daily.data;

  let today = {};
  let nextday = {};
  for (let i = 0; i < 7; i++) {
    //Today's weather
    today.Date = getday(convertTime(dailyForecast[0].time));
    today.High = Math.round(dailyForecast[0].temperatureHigh);
    today.Low = Math.round(dailyForecast[0].temperatureLow);
    
    //Nextday's weather
    nextday.Date = getday(convertTime(dailyForecast[1].time));
    nextday.icon = dailyForecast[1].icon;
    nextday.High = Math.round(dailyForecast[1].temperatureHigh);
    nextday.Low = Math.round(dailyForecast[1].temperatureLow);


  }
  for (let i = 2; i < 8; i++) {
    const days = dailyForecast[i].time;
    const formatedDay = convertTime(days);
    const whatweekDay = getday(formatedDay);
    const dayIcon = dailyForecast[i].icon;
    const highTemperatures = Math.round(dailyForecast[i].temperatureHigh);
    const lowTemperatures = Math.round(dailyForecast[i].temperatureLow);

    forecastBody.append(`<tr class="table-borderless">
                                     
                            <td colspan="5">${whatweekDay}<br></td>
                            
                            <td colspan="5">${dayIcon}<br></td>
                            <th><b>High</b></th>
                            <td colspan="1">${highTemperatures} º<br></td>
                            <th><b>Low</b></th>
                            <td colspan="1">${lowTemperatures} º<br></td>
                         </tr>`);

  }

  //Append curent weather to the forecast page
  forecastHead.append(`<tr class="table-borderless" id="today">
                          <td scope="col" colspan="10"><b>Today's High & Low</b><br><br></td>
                          <td><b>High:</b> ${today.High} º<br><br></td>
                          <td><b>Low: </b>${today.Low} º<br><br></td>
                       </tr>`);

  //Append next day weather to the forecast page
 $("#next-day").append(`<td colspan="5">${nextday.Date}<br></td>
                        <td colspan="5">${nextday.icon}<br></td>
                        <th><b>High</b></th>
                        <td colspan="1">${nextday.High} º<br></td>
                        <th><b>Low</b></th>
                        <td colspan="1">${nextday.Low} º<br></td>`);


});