import { getCurrentWeather, getForecastWeather } from "./src/api";
import { renderDetailView } from "./src/detailView";
import "./styles/styles.scss";

export const rootElement = document.getElementById("app");

let weatherData;

async function main() {
  weatherData = await getForecastWeather("Mannheim");

  renderDetailView(weatherData);
}

main();
