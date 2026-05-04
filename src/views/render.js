import { format, parseISO } from "date-fns";

export function renderCity(cityData) {
  console.log(cityData);
  const cityName = document.getElementById("city-name");
  const cityDate = document.getElementById("city-date");
  if (cityName && cityDate) {
    cityName.textContent = cityData.resolvedAddress;
    const formatDate = format(
      parseISO(cityData.days[0].datetime),
      "EEEE, MMMM d",
    );
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
    // If time is a string like "06:12"
    if (typeof time === "string") {
      let [hour, minute] = time.split(":").map(Number);
      const suffix = hour >= 12 ? "PM" : "AM";
      hour = ((hour + 11) % 12) + 1; // 12-hour format
      return `${hour}:${minute.toString().padStart(2, "0")} ${suffix}`;
    }
    // If time is a number (hour only)
    const suffix = time >= 12 ? "PM" : "AM";
    const hour = ((time + 11) % 12) + 1;
    return `${hour} ${suffix}`;
  }

