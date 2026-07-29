import axios, { AxiosRequestConfig } from "axios";
import { RespType } from "./types";
import { delay, getRandom } from "@src/common/utils";

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
    await delay(getRandom(500, 700));
    const respData = await instance<unknown, RespType<T>>(config);
    // 业务码为错误标识，直接抛出错误让外部处理
    if (respData.code === 1) {
      throw respData.msg || "网络错误";
    }
    return respData.data;
  } catch (error) {
    throw error;
  }
};

export default request;
