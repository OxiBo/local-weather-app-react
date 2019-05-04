import axios from "axios";

require('dotenv').config();

const KEY = process.env.REACT_APP_UNSPLASH_KEY;

export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization:
      KEY
  }
});