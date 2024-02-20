import axios from "axios";

const artistsApi = axios.create({
  baseURL: "https://plausible-aquamarine-midnight.glitch.me/",
});

export default artistsApi;
