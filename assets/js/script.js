// Variables
var searchInput = document.querySelector("#search-box");
var searchButton = document.querySelector("#searchButton");
var searchedCitiesContainer = document.querySelector("#searchedCities");
var cityTitle = document.querySelector("#city");
var temperatureElement = document.querySelector("#tempEl");
var windElement = document.querySelector("#wind");
var humidityElement = document.querySelector("#humidity");
var forecastContainer = document.querySelector("#forecasting");
var locationSearchSection = document.querySelector("#location-search");
var searchSection = document.querySelector("#search");

// Initialize the page
initializePage();

function initializePage() {
  searchedCitiesContainer.style.display = "none";
  setCurrentTime();
  saveSearchedCities();
}

// Set the current time
function setCurrentTime() {
  function updateTime() {
    let currentTime = dayjs().format("MMM DD, YYYY [at] hh:mm:ss a");
    document.getElementById("currentTime").textContent = currentTime;
  }
  updateTime();
  setInterval(updateTime, 1000);
}

// Search button event listener
searchButton.addEventListener("click", function () {
  var cityToSearch = searchInput.value.trim();
  if (cityToSearch === "") return;
  searchWeather(cityToSearch);
  saveSearchedCityButton(cityToSearch);
  saveCity(cityToSearch);
  searchInput.value = "";
  searchSection.classList.remove("col-12");
  searchSection.classList.add("col-4");
  searchedCitiesContainer.style.display = "";
});

function searchWeather(city) {
  var apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("City not found");
      }
    })
    .then(function (data) {
      displayWeather(data);
    })
    .catch(function (error) {
      console.error(error);
      alert("City not found. Please enter a valid city name.");
    });
}

function displayWeather(data) {
  var cityName = data.name;
  var temperature = data.main.temp;
  var windSpeed = data.wind.speed;
  var humidity = data.main.humidity;

  cityTitle.textContent = cityName;
  temperatureElement.textContent = temperature + "°F";
  windElement.textContent = "Wind: " + windSpeed + " mph";
  humidityElement.textContent = "Humidity: " + humidity + "%";
}
function searchWeather(city) {
  var currentWeatherApiKey = "7122c388f26a175ce76367c47d174de3"; // Replace with your current weather API key
  var forecastApiKey = "7122c388f26a175ce76367c47d174de3"; // Replace with your forecast API key

  // API endpoint for current weather
  var currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${currentWeatherApiKey}`;

  // API endpoint for 5-day/3-hour forecast
  var forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${forecastApiKey}`;

  // Fetch current weather data
  fetch(currentWeatherApiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("City not found");
      }
    })
    .then(function (currentWeatherData) {
      // Fetch forecast data after successfully fetching current weather
      fetch(forecastApiUrl)
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Forecast data not available");
          }
        })
        .then(function (forecastData) {
          displayWeather(currentWeatherData, forecastData);
        })
        .catch(function (error) {
          console.error(error);
          alert("Forecast data not available.");
        });
    })
    .catch(function (error) {
      console.error(error);
      alert("City not found. Please enter a valid city name.");
    });
}

function displayWeather(currentWeatherData, forecastData) {
  // Display current weather information
  var cityName = currentWeatherData.name;
  var temperature = currentWeatherData.main.temp;
  var windSpeed = currentWeatherData.wind.speed;
  var humidity = currentWeatherData.main.humidity;

  cityTitle.textContent = cityName;
  temperatureElement.textContent = temperature + "°F";
  windElement.textContent = "Wind: " + windSpeed + " mph";
  humidityElement.textContent = "Humidity: " + humidity + "%";

  // Display 5-day/3-hour forecast information (modify as needed)
  var forecastList = forecastData.list;
  forecastContainer.innerHTML = ""; // Clear previous forecast data

  for (var i = 0; i < forecastList.length; i += 8) {
    var forecastItem = forecastList[i];
    var forecastTime = forecastItem.dt_txt;
    var forecastTemperature = forecastItem.main.temp;
    var forecastWindSpeed = forecastItem.wind.speed;
    var forecastHumidity = forecastItem.main.humidity;

    var forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");
    forecastCard.innerHTML = `
        <h4>${forecastTime}</h4>
        <p>Temperature: ${forecastTemperature}°F</p>
        <p>Wind: ${forecastWindSpeed} mph</p>
        <p>Humidity: ${forecastHumidity}%</p>
      `;

    forecastContainer.appendChild(forecastCard);
  }
}

// Dynamic searched cities
function saveSearchedCityButton(cityToSearch) {
  var cityButton = document.createElement("button");
  cityButton.classList.add("btn", "btn-outline-secondary", "w-100");
  cityButton.textContent = cityToSearch;
  searchedCitiesContainer.appendChild(cityButton);
  cityButton.addEventListener("click", function (event) {
    var citySearched = event.target.textContent;
    searchCity(citySearched);
  });
}

function searchCity(cityToSearch) {
  searchWeather(cityToSearch);
  searchSection.classList.remove("col-12");
  searchSection.classList.add("col-4");
  searchedCitiesContainer.style.display = "";
}

// Save searched cities in localStorage
function saveCity(cityToSearch) {
  var savedCities = localStorage.getItem("savedCities");
  if (savedCities) {
    savedCities = JSON.parse(savedCities);
  } else {
    savedCities = [];
  }
  savedCities.push(cityToSearch);
  localStorage.setItem("savedCities", JSON.stringify(savedCities));
}

// Save the searched cities
function saveSearchedCities() {
  var savedCities = localStorage.getItem("savedCities");
}
