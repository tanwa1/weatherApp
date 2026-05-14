import { renderCity, renderStats, renderCurrentWeather, renderForecasts} from "../views/render.js";
import {getCityData } from "../models/storage.js";
import { getCity } from "../models/fetchData.js";

const getButton = document.getElementById("searchButton");

async function fetchWeather() {
  const input = document.getElementById("searchCity");
  const getCityValue = input.value;
  const weatherAPIkey = "DJTVV99CV7DMEP7D6GJAQZEG6";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(getCityValue)}?unitGroup=metric&key=${weatherAPIkey}&contentType=json`;
  
  const cityData = await getCity(url);

  renderCity(cityData);
  renderStats(cityData);
  renderCurrentWeather(cityData);
  renderForecasts(cityData);
  getCityData(cityData);
}

// Button click
getButton.addEventListener("click", fetchWeather);

// Enter key
document.getElementById("searchCity").addEventListener("keydown", (e) => {
  if (e.key === "Enter") fetchWeather();
});