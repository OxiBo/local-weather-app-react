import axios from "axios";
import unsplashGetImage from "./unsplashGetImage";
import { findBackground } from "../helpers/helperFuncs";
require("dotenv").config();

const KEY = process.env.REACT_APP_WEATHER_KEY;

const getWeather = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: KEY,
    units: "metric"
  }
});

const weatherInfo = async (lat, lon) => {
  let response = {};

  // get weather if geolocation request succeeded
  if (lat && lon) {
    try {
      const weatherResponse = await getWeather.get("/weather?", {
        params: {
          lat,
          lon
        }
      });

      const { main, weather, wind, cod } = weatherResponse.data;

      if (cod === 401) {
        response = {
          weatherAPIError: "Failed to load local weather."
        };
      } else {
        response = {
          updatedTime: new Date().toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            month: "2-digit",
            day: "2-digit",
            year: "2-digit"
          }),
          icon: `https://openweathermap.org/img/w/${weather[0].icon}.png`,
          temperature: main.temp,
          humidity: main.humidity,
          description: weather[0].description,
          additionalDescription: weather[0].main,
          windSpeed: wind.speed.toFixed(2),
          apiID: weather[0].id,
          weatherAPIError: "",
          isWeatherLoading: false
        };
      }
    } catch (error) {
      console.error(error);

      response = {
        isLocationLoading: false,
        isWeatherLoading: false,
        weatherAPIError: "Failed to load local weather."
      };
    }
  }

  // find URL for background image with splash API
  const { temperature, apiID, additionalDescription } = response;

  // find a query word for searching for background

  if (temperature && apiID) {
    const backgroundImgDescription = findBackground(
      temperature,
      apiID,
      additionalDescription
    );

    //search for the background image
    try {
      const responseImage = await unsplashGetImage.get("/search/photos", {
        params: {
          query: backgroundImgDescription
        }
      });

      // generate a random number to choose a background image
      const randomImage = Math.floor(Math.random() * 10);
      if (responseImage.data.results.length) {
        response.backgroundImageUrl =
          responseImage.data.results[randomImage].urls.regular;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return response;
};

export { weatherInfo };
