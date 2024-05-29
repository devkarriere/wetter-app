import {
  getCurrentWeather,
  getForecastWeather,
  searchLocation,
} from "./src/api";
import { renderDetailView } from "./src/detailView";
import { loadMainMenu, renderMainMenu } from "./src/mainMenu";
import "./styles/styles.scss";

export const rootElement = document.getElementById("app");

let weatherData;

async function main() {
  // weatherData = await getForecastWeather("Mannheim");
  // renderDetailView(weatherData);
  loadMainMenu();
}

main();
