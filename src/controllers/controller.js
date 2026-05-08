import { renderCity, renderStats, renderCurrentWeather, renderForecasts} from "../views/render.js";
import { loadCityData, getCityData } from "../models/storage.js";
import { getCity } from "../models/fetchData.js";


const getButton = document.getElementById("searchButton");

getButton.addEventListener("click", async () => {
  // eslint-disable-next-line no-undef
  const getCityValue = document.getElementById("searchCity").value;
  const weatherAPIkey = "DJTVV99CV7DMEP7D6GJAQZEG6";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(getCityValue)}?unitGroup=metric&key=${weatherAPIkey}&contentType=json`;
  const cityData = await getCity(url);

  renderCity(cityData);
  renderStats(cityData);
  renderCurrentWeather(cityData);
  renderForecasts(cityData);
  getCityData(cityData);

});
