export function getConditionImagePath(code, isNight = false) {
  const condition = CONDITION_IMAGES.find((cond) => cond.code === code);

  if (!condition) return null;

  return "/wetter-app/conditionImages/" + condition[isNight ? "night" : "day"];
}

const CONDITION_IMAGES = [
  {
    code: 1000,
    day: "day/sunny.jpg",
    night: "night/clear.jpg",
  },
  {
    code: 1003,
    day: "day/partly_cloudy_day.jpg",
    night: "night/partly_cloudy_night.jpg",
  },
  {
    code: 1006,
    day: "day/cloudy_day.jpg",
    night: "night/cloudy_night.jpg",
  },
  {
    code: 1009,
    day: "Overcast",
    night: "Overcast",
  },
  {
    code: 1030,
    day: "Mist",
    night: "Mist",
  },
  {
    code: 1063,
    day: "Patchy rain possible",
    night: "Patchy rain possible",
  },
  {
    code: 1066,
    day: "Patchy snow possible",
    night: "Patchy snow possible",
  },
  {
    code: 1069,
    day: "Patchy sleet possible",
    night: "Patchy sleet possible",
  },
  {
    code: 1072,
    day: "Patchy freezing drizzle possible",
    night: "Patchy freezing drizzle possible",
  },
  {
    code: 1087,
    day: "Thundery outbreaks possible",
    night: "Thundery outbreaks possible",
  },
  {
    code: 1114,
    day: "Blowing snow",
    night: "Blowing snow",
  },
  {
    code: 1117,
    day: "Blizzard",
    night: "Blizzard",
  },
  {
    code: 1135,
    day: "Fog",
    night: "Fog",
  },
  {
    code: 1147,
    day: "Freezing fog",
    night: "Freezing fog",
  },
  {
    code: 1150,
    day: "Patchy light drizzle",
    night: "Patchy light drizzle",
  },
  {
    code: 1153,
    day: "Light drizzle",
    night: "Light drizzle",
  },
  {
    code: 1168,
    day: "Freezing drizzle",
    night: "Freezing drizzle",
  },
  {
    code: 1171,
    day: "Heavy freezing drizzle",
    night: "Heavy freezing drizzle",
  },
  {
    code: 1180,
    day: "Patchy light rain",
    night: "Patchy light rain",
  },
  {
    code: 1183,
    day: "Light rain",
    night: "Light rain",
  },
  {
    code: 1186,
    day: "Moderate rain at times",
    night: "Moderate rain at times",
  },
  {
    code: 1189,
    day: "Moderate rain",
    night: "Moderate rain",
  },
  {
    code: 1192,
    day: "Heavy rain at times",
    night: "Heavy rain at times",
  },
  {
    code: 1195,
    day: "Heavy rain",
    night: "Heavy rain",
  },
  {
    code: 1198,
    day: "Light freezing rain",
    night: "Light freezing rain",
  },
  {
    code: 1201,
    day: "Moderate or heavy freezing rain",
    night: "Moderate or heavy freezing rain",
  },
  {
    code: 1204,
    day: "Light sleet",
    night: "Light sleet",
  },
  {
    code: 1207,
    day: "Moderate or heavy sleet",
    night: "Moderate or heavy sleet",
  },
  {
    code: 1210,
    day: "Patchy light snow",
    night: "Patchy light snow",
  },
  {
    code: 1213,
    day: "Light snow",
    night: "Light snow",
  },
  {
    code: 1216,
    day: "Patchy moderate snow",
    night: "Patchy moderate snow",
  },
  {
    code: 1219,
    day: "Moderate snow",
    night: "Moderate snow",
  },
  {
    code: 1222,
    day: "Patchy heavy snow",
    night: "Patchy heavy snow",
  },
  {
    code: 1225,
    day: "Heavy snow",
    night: "Heavy snow",
  },
  {
    code: 1237,
    day: "Ice pellets",
    night: "Ice pellets",
  },
  {
    code: 1240,
    day: "Light rain shower",
    night: "Light rain shower",
  },
  {
    code: 1243,
    day: "Moderate or heavy rain shower",
    night: "Moderate or heavy rain shower",
  },
  {
    code: 1246,
    day: "Torrential rain shower",
    night: "Torrential rain shower",
  },
  {
    code: 1249,
    day: "Light sleet showers",
    night: "Light sleet showers",
  },
  {
    code: 1252,
    day: "Moderate or heavy sleet showers",
    night: "Moderate or heavy sleet showers",
  },
  {
    code: 1255,
    day: "Light snow showers",
    night: "Light snow showers",
  },
  {
    code: 1258,
    day: "Moderate or heavy snow showers",
    night: "Moderate or heavy snow showers",
  },
  {
    code: 1261,
    day: "Light showers of ice pellets",
    night: "Light showers of ice pellets",
  },
  {
    code: 1264,
    day: "Moderate or heavy showers of ice pellets",
    night: "Moderate or heavy showers of ice pellets",
  },
  {
    code: 1273,
    day: "Patchy light rain with thunder",
    night: "Patchy light rain with thunder",
  },
  {
    code: 1276,
    day: "Moderate or heavy rain with thunder",
    night: "Moderate or heavy rain with thunder",
  },
  {
    code: 1279,
    day: "Patchy light snow with thunder",
    night: "Patchy light snow with thunder",
  },
  {
    code: 1282,
    day: "Moderate or heavy snow with thunder",
    night: "Moderate or heavy snow with thunder",
  },
];
