import { format, parseISO } from "date-fns";
import {
  clear,
  fog,
  overcast,
  partlyCloudy,
  rain,
  snow,
  thunderStorm,
  windy,
  rainOverCast,
  rainPartialCloud,
  snowRainPartialCloud
} from "../assets/index.js";

export function renderCity(data) {
  console.log(data);
  const cityName = document.getElementById("city-name");
  const cityDate = document.getElementById("city-date");
  if (cityName && cityDate) {
    cityName.textContent = data.resolvedAddress;
    const formatDate = format(parseISO(data.days[0].datetime), "EEEE, MMMM d");
    cityDate.textContent = formatDate;
  }
}

export function renderStats(data) {
  const current = data.currentConditions;

  document.getElementById("humidityValue").textContent = `${current.humidity}%`;
  document.getElementById("humidityBar").style.width = `${current.humidity}%`;
  document.getElementById("humidityBar").style.background = "#378ADD";

  document.getElementById("windValue").textContent =
    `${current.windspeed} km/h`;
  document.getElementById("windBar").style.width =
    `${Math.min((current.windspeed / 60) * 100, 100)}%`;
  document.getElementById("windBar").style.background = "#1D9E75";

  document.getElementById("uvValue").textContent = current.uvindex;
  document.getElementById("uvBar").style.width =
    `${Math.min((current.uvindex / 11) * 100, 100)}%`;
  document.getElementById("uvBar").style.background = "#EF9F27";

  document.getElementById("visibilityValue").textContent =
    `${current.visibility} km`;
  document.getElementById("visibilityBar").style.width =
    `${Math.min((current.visibility / 10) * 100, 100)}%`;
  document.getElementById("visibilityBar").style.background = "#534AB7";

  document.querySelector(".value.sunrise").textContent = formatTime(
    current.sunrise,
  );
  document.querySelector(".value.sunset").textContent = formatTime(
    current.sunset,
  );
  document.querySelector(".value.precip").textContent =
    `${current.precip ?? 0} mm`;
}

export function formatTime(time) {
  if (typeof time === "string") {
    let [hour, minute] = time.split(":").map(Number);
    const suffix = hour >= 12 ? "PM" : "AM";
    hour = ((hour + 11) % 12) + 1; // 12-hour format
    return `${hour}:${minute.toString().padStart(2, "0")} ${suffix}`;
  }

  const suffix = time >= 12 ? "PM" : "AM";
  const hour = ((time + 11) % 12) + 1;
  return `${hour} ${suffix}`;
}

export function renderCurrentWeather(data) {
  const currentTemperature = document.getElementById("currentTemperature");
  const maxTemp = document.getElementById("maxTempValue");
  const minTemp = document.getElementById("minTempValue");

  const current = data.currentConditions;

  currentTemperature.textContent = current.temp;
  maxTemp.textContent = data.days[0].tempmax;
  minTemp.textContent = data.days[0].tempmin;
}

export function renderForecasts(data) {
  const forecastsContainer = document.querySelector(".forecasts");

  const getWeatherContainer = document.querySelector(".weather");

  // Remove the old image div from getWeatherContainer
  const oldWeatherImage = getWeatherContainer.querySelector(
    ".currentWeatherImage",
  );
  if (oldWeatherImage) oldWeatherImage.remove();

  // Create and append the new image div
  const currentWeatherPic = document.createElement("div");
  currentWeatherPic.classList.add("currentWeatherImage");
  getWeatherContainer.appendChild(currentWeatherPic);

  const current = data.days;
  const cardContainer = document.createElement("div");
  cardContainer.className = "cardContainer";

  const oldCardContainer = forecastsContainer.querySelector(".cardContainer");
  if (oldCardContainer) oldCardContainer.remove();

  current.forEach((current) => {
    // Create card
    const card = document.createElement("div");
    card.classList.add("forecast-card");

    // Day
    const day = document.createElement("div");
    day.classList.add("forecast-day");

    // Icon placeholder
    const icon = document.createElement("div");
    icon.classList.add("forecast-icon");

    // Max temp
    const max = document.createElement("div");
    max.classList.add("forecast-max");

    // Min temp
    const min = document.createElement("div");
    min.classList.add("forecast-min");

    // Description
    const desc = document.createElement("div");
    desc.classList.add("forecast-desc");

    // Append all to card
    card.appendChild(day);
    card.appendChild(icon);
    card.appendChild(max);
    card.appendChild(min);
    card.appendChild(desc);

    // Append card to container
    cardContainer.appendChild(card);

    forecastsContainer.appendChild(cardContainer);

    const formatDate = format(parseISO(current.datetime), "EEEE");

    const currentDay = data.currentConditions.conditions;
    const weatherConditions = current.conditions;
    // console.log(currentDay);

    const weatherMap = new Map();

    weatherMap.set("Clear", clear);
    weatherMap.set("Fog", fog);
    weatherMap.set("Overcast", overcast);
    weatherMap.set("Partially cloudy", partlyCloudy);
    weatherMap.set("Rain", rain);
    weatherMap.set("Snow", snow);
    weatherMap.set("Thunderstorm", thunderStorm);
    weatherMap.set("Windy", windy);
    weatherMap.set("Rain, Overcast", rainOverCast);
    weatherMap.set("Rain, Partially cloudy", rainPartialCloud);
    weatherMap.set("Snow, Rain, Partially cloudy", snowRainPartialCloud);

    const iconSrc = weatherMap.get(weatherConditions);
    const iconCurrentWeather = weatherMap.get(currentDay);

    icon.innerHTML = `<img src="${iconSrc}" alt="${weatherConditions}"/>`;
    currentWeatherPic.innerHTML = `<img src="${iconCurrentWeather}" alt="${weatherConditions}"/>`;

    day.textContent = formatDate;
    max.textContent = current.tempmax;
    min.textContent = current.tempmin;
    desc.textContent = current.conditions;
  });

  document.getElementById("visibilityValue").textContent = 
  `${current.visibility ?? "N/A"} km`;
}
