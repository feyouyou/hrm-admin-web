import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

const whiteList = ["/login"];

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && !whiteList.includes(config.url || "")) {
    config.headers.Authorization = `Bear ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (resp) => {
    const token = resp.headers.authorization;

    if (token) {
      localStorage.setItem("token", token);
    }
    return resp.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const request = async <T>(config: AxiosRequestConfig) => {
  try {
    const respData = await instance<unknown, T>(config);
    return respData;
  } catch (error) {
    throw error;
  }
};

export default request;
