export async function getCity(url) {
  try {
    const response = await fetch(url);
    const cityData = await response.json();

    return cityData;

  } catch (error) {
    console.error(error);
  }
}