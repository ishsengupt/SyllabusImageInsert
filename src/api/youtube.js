import axios from "axios";

export const KEY = "AIzaSyCA63h_OTE0dyLzRYYgZQJBivpLlZdLDoA";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3"
});
