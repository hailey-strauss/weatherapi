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
  searchedCitiesContainer.style.display = 'none';
  setCurrentTime();
  saveSearchedCities();
}

// Set the current time
function setCurrentTime() {
  function updateTime() {
    let currentTime = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    document.getElementById("currentTime").textContent = currentTime;
  }
  updateTime();
  setInterval(updateTime, 1000);
}

// Search button event listener
searchButton.addEventListener("click", function () {
  var cityToSearch = searchInput.value.trim();
  if (cityToSearch === '') return;
  searchWeather(cityToSearch);
  saveSearchedCityButton(cityToSearch);
  saveCity(cityToSearch);
  searchInput.value = "";
  searchSection.classList.remove('col-12')
  searchSection.classList.add('col-4')
  searchedCitiesContainer.style.display = '';
});

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
  searchSection.classList.remove('col-12')
  searchSection.classList.add('col-4')
  searchedCitiesContainer.style.display = '';
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
