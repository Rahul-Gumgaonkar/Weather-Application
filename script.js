const apiKey = "d1845658f92b31c64bd94f06f7188c9c";
const formContainer = document.querySelector(".form-container");
const innerContainer = document.querySelector(".inner-container");
const leftNav = document.getElementById("left-nav");
const rightNav = document.getElementById("right-nav");
const grantLocation = document.querySelector(".grant-location-container");
const loadingElement = document.querySelector(".loading");

rightNav.addEventListener("click", () => {
  formContainer.classList.remove("active-location");
  grantLocation.classList.add("active-location");
});

leftNav.addEventListener("click", () => {
  formContainer.classList.add("active-location");
  grantLocation.classList.remove("active-location");
  innerContainer.classList.add("active-location");
});

formContainer.addEventListener("submit", () => {
  innerContainer.classList.remove("active-location");
});

// Handle form submission
const form = document.querySelector("form");
const cityNameInput = document.getElementById("city-name");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityName = cityNameInput.value;
  if (cityName.trim() !== "") {
    fetchWeatherData(cityName);
  }
  cityNameInput.value = "";
});

// Fetch weather data from the OpenWeatherMap API
const fetchWeatherData = async (cityName) => {
  try {
    loadingElement.classList.remove("active-location");
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    );
    loadingElement.classList.add("active-location");
    const jsonData = await response.json();

    // Update UI with weather data

    if (response.ok) {
      // Data found, update UI with weather data
      updateUI(jsonData);
      errorElement.classList.remove("active"); // Hide error message
    } else {
      // Data not found, display error message
      errorElement.classList.add("active");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    // Handle error: Display a message or take appropriate action
  }
};

// Update UI with weather data
const updateUI = (data) => {
  const cityElement = document.querySelector(".city-name");
  const weatherConditionElement = document.querySelector(".weather-condition");
  const weatherIconElement = document.querySelector(".weather-icon img");
  const temperatureElement = document.querySelector(".temp");
  const windSpeedElement = document.querySelector(".left-img p:last-child");
  const humidityElement = document.querySelector(".middle-img p:last-child");
  const cloudsElement = document.querySelector(".right-img p:last-child");

  cityElement.textContent = data.name;
  weatherConditionElement.textContent = data.weather[0].main;
  weatherIconElement.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  temperatureElement.textContent = (data.main.temp - 273.15).toFixed(2); // Convert to Celsius
  windSpeedElement.textContent = data.wind.speed;
  humidityElement.textContent = data.main.humidity;
  cloudsElement.textContent = data.clouds.all;
};
