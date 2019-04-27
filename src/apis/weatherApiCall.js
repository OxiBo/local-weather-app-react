import axios from "axios";

const KEY = "e005b47d860a06d7e4e18d731fa3e7a4";
export default axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5",
    params: {
        appid: KEY,
        units: "metric"
    }
});

