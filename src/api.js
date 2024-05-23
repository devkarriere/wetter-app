const API_KEY = "7102c30e75ca43b1afa120749241805";
const API_BASE_URL = "https://api.weatherapi.com/v1";

export async function getCurrentWeather(location) {
  const response = await fetch(
    `${API_BASE_URL}/current.json?key=${API_KEY}&q=${location}&lang=de`
  );

  const weatherData = await response.json();

  return weatherData;
}

export async function getForecastWeather(location) {
  // We always just fetch 3 days of forecast, because that's the free plan maximum.
  const response = await fetch(
    `${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=3&lang=de`
  );

  const weatherData = await response.json();

  return weatherData;
}
