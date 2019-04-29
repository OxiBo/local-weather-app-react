const findBackground = (temp, id, additionalDescription) => {

    let backgroundImgDescription;
    switch (true) {
      // winter clouds
      case temp <= 0 && (id >= 801 && id <= 804):
        backgroundImgDescription = "winter clouds";
        break;

      // winter snow
      case temp <= 0 && (id >= 600 && id <= 622):
        backgroundImgDescription = "snow";
        break;

      // winter clear
      case temp <= 0 && id === 800:
      case temp <= 0:
        backgroundImgDescription = "winter";
        break;

      // spring clouds
      case temp > 15 && temp < 23 && (id >= 801 && id <= 804):
        backgroundImgDescription = "summer clouds";
        break;

      // spring rain
      case temp > 15 && temp < 23 && (id >= 200 && id <= 531):
        backgroundImgDescription = "summer rain";
        break;

      // spring clear
      case temp > 15 && temp < 23 && id === 800:
      case temp > 15 && temp < 23:
        backgroundImgDescription = "spring weather";
        break;

      // summer clouds
      case temp > 23 && (id >= 801 && id <= 804):
        backgroundImgDescription = "summer clouds";
        break;

      // summer thunderstorm
      case additionalDescription.toLowerCase() === "thunderstorm" &&
        temp > 23 &&
        (id >= 200 && id <= 531):
        backgroundImgDescription = "summer thunderstorm";
        break;

      // summer rain
      case temp > 23 && (id >= 200 && id <= 531):
        backgroundImgDescription = "summer rain";
        break;

      // summer clear
      case temp > 23 && id === 800:
      case temp > 23:
        backgroundImgDescription = "summer";
        break;

      // autumn rain
      case temp < 15 && temp > 0 && (id >= 200 && id <= 531):
        backgroundImgDescription = "autumn rain";
        break;

      // autumn clouds
      case temp < 15 && temp > 0 && (id >= 801 && id <= 804):
        backgroundImgDescription = "autumn clouds";
        break;

      // autumn clear
      case temp < 23 && temp > 0 && id === 800:
      case temp < 23 && temp > 0:
        backgroundImgDescription = "autumn weather sunny";
        break;

      default:
      backgroundImgDescription = false;
    };

    
    return backgroundImgDescription;
}

export { findBackground };