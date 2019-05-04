import axios from "axios";

const location = async () => {
  let response = {};

  try {
    const locationDetails = await axios.get("https://ipapi.co/json/");

    response = {
      city: locationDetails.data.city,
      region: locationDetails.data.region_code,
      country: locationDetails.data.country,
      coords: {
        latitude: locationDetails.data.latitude,
        longitude: locationDetails.data.longitude
      },
      isLocationLoading: false,
      locationError: ""
    };
  } catch (error) {
    console.error(error);
    response = {
      isLocationLoading: false,
      isWeatherLoading: false,
      locationError: "Location information is unavailable"
    };
  }

  return response;
};

export { location };
