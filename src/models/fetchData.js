import { renderCity, renderStats} from "../views/render.js";

// eslint-disable-next-line no-undef
const getButton = document.getElementById("searchButton");

export async function getCity(url) {
  try {
    const response = await fetch(url);
    const cityData = await response.json();

    return cityData;

  } catch (error) {
    console.error(error);
  }
}

getButton.addEventListener("click", async () => {
  // eslint-disable-next-line no-undef
  const getCityValue = document.getElementById("searchCity").value;
  const weatherAPIkey = "DJTVV99CV7DMEP7D6GJAQZEG6";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(getCityValue)}?unitGroup=metric&key=${weatherAPIkey}&contentType=json`;
  const cityData = await getCity(url);

  renderCity(cityData);
  renderStats(cityData);
});
