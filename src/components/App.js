import React, { Component } from "react";
import { location } from "../apis/location";
import { weatherInfo } from "../apis/weather";
import "./styles.scss";
import defaultImg from "../gallery/default1.jpg";
import SearchBar from "./SearchBar";
import ToggleTemp from "./ToggleTemp";

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

  async componentDidMount() {
    await this.getLocation();
    await this.getWeather();
  }

  componentWillUnmount() {
    clearInterval(this.clearInterval);
    document.body.style.backgroundColor = null;
  }

  onSubmit = async interval => {
    const milliseconds = interval * 360000;
    await this.setState({ updateInterval: milliseconds });

    this.clearInterval = setInterval(() => {
      this.getWeather();
      this.setBackgroundImage();
    }, this.state.updateInterval);
  };

  getLocation = async () => {
    const locationInfo = await location();

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

  getWeather = async () => {
    // get weather if geolocation request succeeded
    if (this.state.coords.latitude && this.state.coords.longitude) {
      const { latitude, longitude } = this.state.coords;
      const weatherDetails = await weatherInfo(latitude, longitude);

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

      // set background
      document.body.style.backgroundImage = `url(${
        this.state.backgroundImageUrl
      })`;
    }
  };

  render() {
    const {
      city,
      region,
      country,
      isLocationLoading,
      locationError,
      updatedTime,
      icon,
      temperature,
      humidity,
      description,
      windSpeed,
      weatherAPIError,
      isWeatherLoading
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
              <div>
                <SearchBar onSubmit={this.onSubmit} />
                <div className="updated">
                  Updated:
                  {isLocationLoading && isWeatherLoading ? (
                    <p> Loading... </p>
                  ) : (
                    updatedTime
                  )}
                </div>
              </div>
            )}
          </header>
          {locationError ? (
            <div className="errorMessage">{locationError}</div>
          ) : weatherAPIError ? (
            <div className="errorMessage">{weatherAPIError}</div>
          ) : (
            <div className="weather">
              <div className="container container-top">
                <div className="inline-details">
                  <img id="icon" src={icon} alt={description} />
                </div>
                {/* wrap the toggle component in "{temperature && }" to be able to pass props which comes from api call*/}
                {temperature && <ToggleTemp temp={temperature} />}
              </div>
              <div className="container">
                <div className="details" id="location">
                  {`${city}, ${region}, ${country}`}
                </div>
                <div className="details" id="summary">
                  {description}
                </div>
                <div className="details" id="windSpeed">
                  WS {windSpeed} m/s
                </div>
                <div className="details" id="humidity">
                  humidity {humidity}%
                </div>
              </div>
            </div>
          )}
        </div>

        <footer>
          <p id="copyright">Written and coded by OxiBo, 2019</p>
        </footer>
      </div>
    );
  }
}
