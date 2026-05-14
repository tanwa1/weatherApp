import "./styles/index.scss";
import "./styles/mobileUI.scss";
import "./models/fetchData.js";
import "./controllers/controller.js";
import { loadCityData } from "./models/storage.js";
import { renderCity, renderStats, renderCurrentWeather, renderForecasts } from "./views/render.js";

const cachedData = loadCityData();
if (cachedData && cachedData.resolvedAddress) {
  renderCity(cachedData);
  renderStats(cachedData);
  renderCurrentWeather(cachedData);
  renderForecasts(cachedData);
}