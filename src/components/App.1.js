import React, { Component } from "react";
import location from "../apis/location";
import weatherDetailsApi from "../apis/weatherApiCall";
import unsplashGetImage from "../apis/unsplashGetImage";
import { findBackground } from "../helpers/helperFuncs";
import "./styles.scss";
import defaultImg from "../gallery/default1.jpg";

// import Test from "./Test";

export default class App extends Component {
  state = {
    city: "",
    region: "",
    country: "",
    coords: {
      latitude: null,
      longitute: null
    },
    locationError: "",
    icon: "",
    temperature: null,
    displayTemp: null,
    fahrenheit: true,
    unit: "\u2103",
    humidity: null,
    description: "",
    additionalDescription: "",
    apiID: null,
    backgroundImgDescription: "",
    backgroundImageUrl: defaultImg,
    weatherAPIError: ""
  };

  async componentDidMount() {
    //get geolocation
    try {
      const locationDetails = await location.get();
      this.setState({
        city: locationDetails.data.city,
        region: locationDetails.data.region_code,
        country: locationDetails.data.country,
        coords: {
          latitude: locationDetails.data.latitude,
          longitude: locationDetails.data.longitude
        },
        locationError: ""
      });
    } catch (error) {
      console.error(error);
      this.setState({
        locationError: "Location information is unavailable"
      });
    }

    // get weather if geolocation request succeeded
    if (this.state.coords.latitude && this.state.coords.latitude) {
      try {
        const weatherResponse = await weatherDetailsApi.get("/weather?", {
          params: {
            lat: this.state.coords.latitude,
            lon: this.state.coords.longitude
          }
        });

        const { main, weather, wind, cod } = weatherResponse.data;

        if (cod === 401) {
          this.setState({
            weatherAPIError: "'Failed to load local weather.'"
          });
        } else {
          this.setState({
            icon: `https://openweathermap.org/img/w/${weather[0].icon}.png`,
            temperature: main.temp,
            displayTemp: main.temp.toFixed(1),
            unit: "\u2103",
            humidity: main.humidity,
            description: weather[0].description,
            additionalDescription: weather[0].main,
            windSpeed: wind.speed.toFixed(2),
            apiID: weather[0].id,
            weatherAPIError: ""
          });
        }
      } catch (error) {
        console.error(error);
        this.setState({
          weatherAPIError: "Failed to load local weather."
        });
      }
    }
    const { temperature: temp, apiID: id, additionalDescription } = this.state;

    // find a query word for searching for background
    this.setState({
      backgroundImgDescription: findBackground(temp, id, additionalDescription)
    });

    //search for the background image
    const responseImage = await unsplashGetImage.get("/search/photos", {
      params: {
        query: this.state.backgroundImgDescription
      }
    });
    const randomImage = Math.floor(Math.random() * 10);
    this.setState({
      backgroundImageUrl: responseImage.data.results[randomImage].urls.regular
    });

    // set background
    document.body.style.backgroundImage = `url(${
      this.state.backgroundImageUrl
    })`;
  }

  // toggle temperature from degrees Celsius to Fahrenheit 
  toggleTemp = () => {
    if (this.state.fahrenheit) {
      this.setState(prevState => ({
        displayTemp: (prevState.temperature * 1.8 + 32).toFixed(2),
        unit: "\u2109",
        fahrenheit: !prevState.fahrenheit
      }));
    } else {
      this.setState(prevState => ({
        displayTemp: prevState.temperature.toFixed(1),
        unit: "\u2103",
        fahrenheit: !prevState.fahrenheit
      }));
    }
  };

  render() {
    const {
      city,
      region,
      country,
      icon,
      displayTemp,
      unit,
      humidity,
      description,
      windSpeed
    } = this.state;

    return (
      <div className="mainContainer">
        <div className="main">
          <header>
            <h1>Local weather APP</h1>
            <hr />
          </header>
          {this.state.locationError ? (
            <div className="errorMessage">{this.state.locationError}</div>
          ) : this.state.weatherAPIError ? (
            <div className="errorMessage">{this.state.weatherAPIError}</div>
          ) : (
            <div className="weather">
              <div className="container container-top">
                <div className="inline-details">
                  <img id="icon" src={icon} alt={description} />
                </div>
                <div className="inline-details" id="temp">
                  {displayTemp}
                </div>
                <div className="inline-details" onClick={this.toggleTemp}>
                  <div id="degrees">{unit}</div>
                </div>
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

        {/* <Test test={this.state.testing}/> */}

        <footer>
          <p id="copyright">Written and coded by OxiBo, 2019</p>
        </footer>
      </div>
    );
  }
}


___________________

import React, { Component } from "react";
import location from "../apis/location";
import weatherDetailsApi from "../apis/weatherApiCall";
import unsplashGetImage from "../apis/unsplashGetImage";
import { findBackground } from "../helpers/helperFuncs";
import "./styles.scss";
import defaultImg from "../gallery/default1.jpg";
import SearchBar from "./SearchBar";

export default class App extends Component {
  state = {
    city: "",
    region: "",
    country: "",
    coords: {
      latitude: null,
      longitute: null
    },
    updatedTime: "",
    updateInterval: "",
    locationError: "",
    icon: "",
    temperature: null,
    displayTemp: null,
    fahrenheit: true,
    unit: "\u2103",
    humidity: null,
    description: "",
    additionalDescription: "",
    apiID: null,
    backgroundImgDescription: "",
    backgroundImageUrl: defaultImg,
    weatherAPIError: ""
  };

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    clearInterval(this.clearInterval);
    document.body.style.backgroundColor = null;
  }

  onSubmit = async interval => {
    const milliseconds = interval * 60000;
    await this.setState({ updateInterval: milliseconds });
    
    // this.clearInterval = setInterval(() => {
    //   this.getData();
    // }, this.state.updateInterval);
    
  };

  async getData() {
    //get geolocation
    try {
      const locationDetails = await location.get();
      this.setState({
        city: locationDetails.data.city,
        region: locationDetails.data.region_code,
        country: locationDetails.data.country,
        coords: {
          latitude: locationDetails.data.latitude,
          longitude: locationDetails.data.longitude
        },
        locationError: ""
      });
    } catch (error) {
      console.error(error);
      this.setState({
        locationError: "Location information is unavailable"
      });
    }

    // get weather if geolocation request succeeded
    if (this.state.coords.latitude && this.state.coords.latitude) {
      try {
        const weatherResponse = await weatherDetailsApi.get("/weather?", {
          params: {
            lat: this.state.coords.latitude,
            lon: this.state.coords.longitude
          }
        });

        const { main, weather, wind, cod } = weatherResponse.data;

        if (cod === 401) {
          this.setState({
            weatherAPIError: "'Failed to load local weather.'"
          });
        } else {
          this.setState({
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
            displayTemp: main.temp.toFixed(1),
            unit: "\u2103",
            humidity: main.humidity,
            description: weather[0].description,
            additionalDescription: weather[0].main,
            windSpeed: wind.speed.toFixed(2),
            apiID: weather[0].id,
            weatherAPIError: ""
          });
        }
      } catch (error) {
        console.error(error);
        this.setState({
          weatherAPIError: "Failed to load local weather."
        });
      }
    }

    // destructuring state values
    const { temperature: temp, apiID: id, additionalDescription } = this.state;

    // find a query word for searching for background
    this.setState({
      backgroundImgDescription: findBackground(temp, id, additionalDescription)
    });

    //search for the background image
    const responseImage = await unsplashGetImage.get("/search/photos", {
      params: {
        query: this.state.backgroundImgDescription
      }
    });

    // generate a random number to choose a background image
    const randomImage = Math.floor(Math.random() * 10);
    this.setState({
      backgroundImageUrl: responseImage.data.results[randomImage].urls.regular
    });

    // set background
    document.body.style.backgroundImage = `url(${
      this.state.backgroundImageUrl
    })`;
  }

  // toggle temperature from degrees Celsius to Fahrenheit
  toggleTemp = () => {
    if (this.state.fahrenheit) {
      this.setState(prevState => ({
        displayTemp: (prevState.temperature * 1.8 + 32).toFixed(2),
        unit: "\u2109",
        fahrenheit: !prevState.fahrenheit
      }));
    } else {
      this.setState(prevState => ({
        displayTemp: prevState.temperature.toFixed(1),
        unit: "\u2103",
        fahrenheit: !prevState.fahrenheit
      }));
    }
  };

  render() {
    const {
      city,
      region,
      country,
      updatedTime,
      icon,
      displayTemp,
      unit,
      humidity,
      description,
      windSpeed
    } = this.state;

    return (
      <div className="mainContainer">
        <div className="main">
          <header>
            <h1>Local weather APP</h1>
            <hr />
            <div>
              <SearchBar onSubmit={this.onSubmit} />
              <div className="updated">Updated: {updatedTime}</div>
            </div>
          </header>
          {this.state.locationError ? (
            <div className="errorMessage">{this.state.locationError}</div>
          ) : this.state.weatherAPIError ? (
            <div className="errorMessage">{this.state.weatherAPIError}</div>
          ) : (
            <div className="weather">
              <div className="container container-top">
                <div className="inline-details">
                  <img id="icon" src={icon} alt={description} />
                </div>
                <div className="inline-details" id="temp">
                  {displayTemp}
                </div>
                <div className="inline-details" onClick={this.toggleTemp}>
                  <div id="degrees">{unit}</div>
                </div>
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

        {/* <Test test={this.state.testing}/> */}

        <footer>
          <p id="copyright">Written and coded by OxiBo, 2019</p>
        </footer>
      </div>
    );
  }
}
