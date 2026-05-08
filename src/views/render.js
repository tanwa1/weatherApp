import { format, parseISO } from "date-fns";
import { sunny } from "../assets/index.js";

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

  const stats = [
    {
      label: "Humidity: ",
      value: `${current.humidity}%`,
      percent: current.humidty,
      color: "#378ADD",
    },
    {
      label: "Wind Speed: ",
      value: `${current.windspeed} km/h`,
      percent: (current.windspeed / 60) * 100,
      color: "#1D9E75",
    },
    {
      label: "UV Index: ",
      value: `${current.uvindex}`,
      percent: (current.uvindex / 11) * 100,
      color: "#EF9F27",
    },
    {
      label: "Visibility: ",
      value: `${current.visibility} km`,
      percent: (current.visibility / 10) * 100,
      color: "#534AB7",
    },
  ];

  document.querySelector(".value.sunrise").textContent = formatTime(
    current.sunrise,
  );
  document.querySelector(".value.sunset").textContent = formatTime(
    current.sunset,
  );
  document.querySelector(".value.precip").textContent =
    `${current.precip ?? 0} mm`;

  const container = document.getElementById("stat");
  container.innerHTML = stats
    .map(
      (s) => `
    <div class="stat">
      <div class="stat-header">
        <span class="label">${s.label}</span>
        <span class="value">${s.value}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width: ${Math.min(s.percent, 100)}%;">
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  container.querySelectorAll(".bar-fill").forEach((bar, i) => {
    bar.style.background = stats[i].color;
  });
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

  const createForecats = document.createElement("div");
  const current = data.currentConditions;

  currentTemperature.textContent = current.temp;
  maxTemp.textContent = data.days[0].tempmax;
  minTemp.textContent = data.days[0].tempmin;
}

export function renderForecasts(data) {
  const forecastsContainer = document.querySelector(".forecasts");
  forecastsContainer.innerHTML = "";
  const current = data.days;
  const cardContainer = document.createElement("div");
  cardContainer.className = "cardContainer";

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

    day.textContent = formatDate;
    max.textContent = current.tempmax;
    min.textContent = current.tempmin;
    desc.textContent = current.conditions;
    
  });
}

