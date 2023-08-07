import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    const { data } = response;
    return Promise.reject(data.message);
  }
);

export default instance;
