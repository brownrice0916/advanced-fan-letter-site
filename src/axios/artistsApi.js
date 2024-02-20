import axios from "axios";

const artistsApi = axios.create({
  baseURL: "http://localhost:3001",
});

export default artistsApi;
