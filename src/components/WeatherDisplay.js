import React, { Component } from "react";
import { location } from "../apis/location";
import { weatherInfo } from "../apis/weather";
// import defaultImg from "../gallery/default1.jpg";
import ToggleTemp from "./ToggleTemp";

class WeatherDisplay extends Component {
  async componentDidMount() {
    const { coords } = await this.getLocation();
    await this.getWeather(coords.latitude, coords.longitude);
  }

  getLocation = async () => {
    const locationInfo = await location();
    this.props.getLocation(locationInfo);
    return locationInfo;
  };

  getWeather = async (lat, lon) => {
    if (lat && lon) {
      const weatherDetails = await weatherInfo(lat, lon);
      this.props.getWeather(weatherDetails);
    }

    // set background
    document.body.style.backgroundImage = `url(${
        this.props.backgroundImageUrl
      })`;
  };
  render() {
    const {
      city,
      region,
      country,
      locationError,
      icon,
      temperature,
      humidity,
      description,
      windSpeed,
      weatherAPIError
    } = this.props;
    return (
      <main>
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
      </main>
    );
  }
}

export default WeatherDisplay;
