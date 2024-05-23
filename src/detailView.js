import { rootElement } from "../main";
import {
  formatHourlyTime,
  formatTemperature,
  get24HoursForecastFromNow,
} from "./utils";

export function renderDetailView(weatherData) {
  console.log(weatherData);

  const { location, current, forecast } = weatherData;
  const currentDay = forecast.forecastday[0];

  rootElement.innerHTML =
    getHeaderHtml(
      location.name,
      formatTemperature(current.temp_c),
      current.condition.text,
      formatTemperature(currentDay.day.maxtemp_c),
      formatTemperature(currentDay.day.mintemp_c)
    ) +
    getTodayForecastHtml(
      currentDay.day.condition.text,
      currentDay.day.maxwind_kph,
      forecast.forecastday,
      current.last_updated_epoch
    );
}

function getHeaderHtml(location, currentTemp, condition, maxTemp, minTemp) {
  return `
    <div class="current-weather">
        <h2 class="current-weather__location">${location}</h2>
        <h1 class="current-weather__current-temperature">${currentTemp}°</h1>
        <p class="current-weather__condition">${condition}</p>
        <div class="current-weather__day-temperatures">
            <span class="current-weather__max-temperature">H:${maxTemp}°</span>
            <span class="current-weather__min-temperature">L:${minTemp}°</span>
        </div>
    </div> 
    `;
}

function getTodayForecastHtml(
  condition,
  maxWind,
  forecastdays,
  lastUpdatedEpoch
) {
  const hourlyForecastElements = get24HoursForecastFromNow(
    forecastdays,
    lastUpdatedEpoch
  ).map(
    (hour, i) => `
        <div class="hourly-forecast">    
            <div class="hourly-forecast__time">${
              i === 0 ? "Jetzt" : formatHourlyTime(hour.time) + " Uhr"
            }</div>
            <div class="hourly-forecast__icon"><img src="https:${
              hour.condition.icon
            }"/></div>
            <div class="hourly-forecast__temperature">${formatTemperature(
              hour.temp_c
            )}°</div>
        </div>
    `
  );

  const hourlyForecastHtml = hourlyForecastElements.join("");

  return `
    <div class="today-forecast">
      <div class="today-forecast__conditions">
        Heute ${condition}. Wind bis zu ${maxWind} km/h.
      </div>
      <div class="today-forecast__hours">
          ${hourlyForecastHtml}
      </div>
    </div>
    `;
}
