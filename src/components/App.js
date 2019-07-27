import React, { Component } from "react";
// import { location } from "../apis/location";
import { weatherInfo } from "../apis/weather";
import "./styles.scss";
import defaultImg from "../gallery/default1.jpg";
// import SearchBar from "./SearchBar";
import WeatherDisplay from "./WeatherDisplay";
// import ToggleTemp from "./ToggleTemp";
import UpdateInfo from "./UpdateInfo";

export default class App extends Component {
  state = {
    city: "",
    region: "",
    country: "",
    coords: {
      latitude: null,
      longitude: null
    },
    isLocationLoading: true,
    updatedTime: "",
    updateInterval: "",
    interval: "",
    locationError: "",
    icon: "",
    temperature: null,
    humidity: null,
    description: "",
    additionalDescription: "",
    apiID: null,
    backgroundImageUrl: defaultImg,
    weatherAPIError: "",
    isWeatherLoading: true
  };

  componentWillUnmount() {
    clearInterval(this.clearInterval);
    document.body.style.backgroundColor = null;
  }

  onSubmit = async (interval) => {
    const milliseconds = interval * 360000;
    await this.setState({ updateInterval: milliseconds, interval: interval });
    this.clearInterval = setInterval(async () => {
     
      this.getWeather( await weatherInfo(this.state.coords.longitude, this.state.coords.latitude))
    }, this.state.updateInterval);
  };

  getLocation = locationInfo => {
    const {
      city,
      region,
      country,
      coords,
      isLocationLoading,
      locationError,
      isWeatherLoading
    } = locationInfo;

    this.setState({
      city,
      region,
      country,
      coords,
      isLocationLoading,
      locationError,
      isWeatherLoading
    });
  };

  getWeather = weatherDetails => {
    const {
      weatherAPIError,
      updatedTime,
      icon,
      temperature,
      humidity,
      description,
      additionalDescription,
      windSpeed,
      apiID,
      backgroundImageUrl,
      isWeatherLoading,
      isLocationLoading
    } = weatherDetails;

    this.setState({
      weatherAPIError,
      updatedTime,
      icon,
      temperature,
      humidity,
      description,
      additionalDescription,
      windSpeed,
      apiID,
      backgroundImageUrl,
      isWeatherLoading,
      isLocationLoading
    });

    // // set background
    // document.body.style.backgroundImage = `url(${
    //   this.state.backgroundImageUrl
    // })`;
  };

  render() {
    const {
      coords: { longitude, latitude },
      city,
      region,
      country,
      isLocationLoading,
      locationError,
      updatedTime,
      interval,
      icon,
      temperature,
      humidity,
      description,
      windSpeed,
      weatherAPIError,
      isWeatherLoading,
      backgroundImageUrl
    } = this.state;

    return (
      <div className="mainContainer">
        <div className="main">
          <header>
            <h1>Local weather APP</h1>
            <hr />

            {isLocationLoading || isWeatherLoading ? (
              <h3> Loading... </h3>
            ) : locationError || weatherAPIError ? (
              false
            ) : (
              <UpdateInfo
                isLocationLoading={isLocationLoading}
                isWeatherLoading={isWeatherLoading}
                updatedTime={updatedTime}
                interval={interval}
                onSubmit={this.onSubmit}
                lon={longitude}
                lat={latitude}
              />
            )}
          </header>

          <WeatherDisplay
            lat={this.state.coords.latitude}
            lon={this.state.coords.longitude}
            getLocation={this.getLocation}
            getWeather={this.getWeather}
            city={city}
            region={region}
            country={country}
            locationError={locationError}
            icon={icon}
            temperature={temperature}
            humidity={humidity}
            description={description}
            windSpeed={windSpeed}
            weatherAPIError={weatherAPIError}
            backgroundImageUrl={backgroundImageUrl}
          />
        </div>

        <footer>
          <p id="copyright">Written and coded by OxiBo, 2019</p>
        </footer>
      </div>
    );
  }
}
