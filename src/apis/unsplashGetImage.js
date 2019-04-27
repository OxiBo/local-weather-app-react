import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization:
      "Client-ID 90c7a57a72b423b8bbac1c2dd86564084e032466deedb0864148599ca17d88e7"
  }
});
