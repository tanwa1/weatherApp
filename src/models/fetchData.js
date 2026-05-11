import { spinner, hideSpinner } from "../views/spinner.js";
export async function getCity(url) {
  try {
    spinner();

    const response = await fetch(url);
    const cityData = await response.json();

    await new Promise((resolve, reject) => setTimeout(resolve, 2000));

    return cityData;
  } catch (error) {
    console.error(error);
  }
  finally{
    hideSpinner();
  }
}
