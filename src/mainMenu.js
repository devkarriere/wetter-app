import { rootElement } from "../main";
import {
  getForecastWeather,
  getFavoriteCities,
  searchLocation,
  removeCityFromFavorites,
} from "./api";
import { loadDetailView, renderDetailView } from "./detailView";
import { getLoadingHtml, renderLoadingScreen } from "./loading";
import { debounce, formatLocalTime, formatTemperature } from "./utils";

export async function loadMainMenu() {
  renderLoadingScreen("Lade Übersicht...");

  renderMainMenu();
}

export async function renderMainMenu() {
  rootElement.innerHTML = `
        <div class="main-menu">
            ${getMenuHeaderHtml()}
            ${await getCityListHtml()}
        </div>
    `;

  // TODO: register eventlisteners
  registerEventListeners();
}

function getMenuHeaderHtml() {
  return `
    <div class="main-menu__heading">Wetter <button class="main-menu__edit">Bearbeiten</button></div>
    <div class="main-menu__search-bar">
        <input
            type="text"
            class="main-menu__search-input"
            placeholder="Nach Stadt suchen..."
        />
        <div class="main-menu__search-results"></div>
    </div>
    `;
}

async function getCityListHtml() {
  const favoriteCities = getFavoriteCities();
  console.log(favoriteCities);

  if (!favoriteCities || favoriteCities.length < 1) {
    return "Noch keine Favoriten gespeichert.";
  }

  const favoriteCitiesElements = [];

  for (let city of favoriteCities) {
    const weatherData = await getForecastWeather(city, 1);
    console.log(weatherData);

    const { location, current, forecast } = weatherData;
    const forecastDay = forecast.forecastday[0].day;

    const cityHtml = `
        <div class="city-wrapper">
            <button class="city-wrapper__delete" data-city="${city}">Löschen</button>
            <div class="city" data-city="${city}">
                <div class="city__left-column">
                    <h2 class="city__name">${city}</h2>
                    <div class="city__country">${location.country}</div>
                    <div class="city__condition">${current.condition.text}</div>
                </div>
                <div class="city__right-column">
                    <div class="city__temperature">${formatTemperature(
                      current.temp_c
                    )}°</div>
                    <div class="city__min-max-temperature">H:${formatTemperature(
                      forecastDay.maxtemp_c
                    )}° T:${formatTemperature(forecastDay.mintemp_c)}°</div>
                </div>
            </div>
        </div>
    `;

    favoriteCitiesElements.push(cityHtml);
  }

  const favoriteCitiesHtml = favoriteCitiesElements.join("");

  return `
    <div class="main-menu__cities-list">
       ${favoriteCitiesHtml}
    </div>
    `;
}

function renderSearchResults(searchResults) {
  console.log(searchResults);
  const searchResultsElements = searchResults.map(
    (result) =>
      `
        <div class="search-result" data-city="${result.name}" tabindex="0">
            <h3 class="seach-result__name">${result.name}</h3>
            <p class="search-result__country">${result.country}</p>
        </div>
    `
  );

  const searchResultsHtml = searchResultsElements.join("");

  console.log(searchResultsHtml);

  const searchResultsDiv = document.querySelector(".main-menu__search-results");
  searchResultsDiv.innerHTML = searchResultsHtml;
}

function renderSearchResultsLoading() {
  const searchResultsDiv = document.querySelector(".main-menu__search-results");
  searchResultsDiv.innerHTML = `<div class="search-result">Lade Vorschläge...</div>`;
}

function registerSearchResultsEventListeners() {
  const searchResults = document.querySelectorAll(".search-result");

  searchResults.forEach((searchResult) => {
    searchResult.addEventListener("click", (e) => {
      const cityName = searchResult.getAttribute("data-city");
      console.log(cityName);
      loadDetailView(cityName);
    });
  });
}

function bodyClickHandler(e) {
  const searchWrapper = document.querySelector(".main-menu__search-bar");
  if (!searchWrapper) {
    document.removeEventListener("click", bodyClickHandler);
    return;
  }
  console.log(e.target);
  if (!searchWrapper.contains(e.target)) {
    const searchResults = document.querySelector(".main-menu__search-results");
    searchResults.classList.add("main-menu__search-results--hidden");
  }
}

function registerEventListeners() {
  document.removeEventListener("click", bodyClickHandler);

  const editButton = document.querySelector(".main-menu__edit");
  const deleteButtons = document.querySelectorAll(".city-wrapper__delete");

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      removeCityFromFavorites(btn.getAttribute("data-city"));
      btn.parentElement.remove();
    });
  });

  editButton.addEventListener("click", (e) => {
    const EDIT_ATTRIBUTE = "data-edit-mode";

    if (!editButton.getAttribute(EDIT_ATTRIBUTE)) {
      editButton.setAttribute(EDIT_ATTRIBUTE, "true");
      editButton.textContent = "Fertig";

      deleteButtons.forEach((btn) => {
        btn.classList.add("city-wrapper__delete--show");
      });
    } else {
      editButton.removeAttribute(EDIT_ATTRIBUTE);
      editButton.textContent = "Bearbeiten";

      deleteButtons.forEach((btn) => {
        btn.classList.remove("city-wrapper__delete--show");
      });
    }
  });

  const searchBar = document.querySelector(".main-menu__search-input");

  searchBar.addEventListener(
    "input",
    debounce(async (e) => {
      const q = e.target.value;

      let searchResults = [];

      if (q.length > 1) {
        renderSearchResultsLoading();
        searchResults = await searchLocation(q);
      }
      console.log(searchResults);
      renderSearchResults(searchResults);
      registerSearchResultsEventListeners();
    }, 500)
  );

  document.addEventListener("click", bodyClickHandler);

  searchBar.addEventListener("focusin", (e) => {
    const searchResults = document.querySelector(".main-menu__search-results");
    searchResults.classList.remove("main-menu__search-results--hidden");
  });

  const cities = document.querySelectorAll(".city");

  cities.forEach((city) => {
    city.addEventListener("click", (e) => {
      console.log(city);
      const cityName = city.getAttribute("data-city");
      console.log(cityName);
      loadDetailView(cityName);
    });
  });
}
