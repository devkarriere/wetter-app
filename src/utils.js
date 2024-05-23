export function formatTemperature(temperature) {
  return Math.floor(temperature);
}

export function formatHourlyTime(time) {
  return time.split(" ")[1].split(":")[0];
}

// Takes forecast.forecastday as param, but name "forecast" is smoother
export function get24HoursForecastFromNow(forecast, lastUpdatedEpoch) {
  const todaysForecast = forecast[0].hour;
  const tomorrowsForecast = forecast[1].hour;

  const newForecast = [];

  const firstFutureTimeIndex = todaysForecast.findIndex(
    (hour) => hour.time_epoch > lastUpdatedEpoch
  );

  for (let i = firstFutureTimeIndex - 1; i < todaysForecast.length; i++) {
    newForecast.push(todaysForecast[i]);
  }

  let tomorrowIndex = 0;
  while (newForecast.length < 24) {
    newForecast.push(tomorrowsForecast[tomorrowIndex]);
    tomorrowIndex++;
  }

  console.log(newForecast);

  return newForecast;
}

export function getDayOfWeek(date) {
  const dateObj = new Date(date);

  const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  return days[dateObj.getDay() - 1];
}
