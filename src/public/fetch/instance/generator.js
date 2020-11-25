import axios from "axios";
import * as responseFormatInterceptor from "../interceptors/response-format";
import { message } from "antd";

const defaultConfig = {
  timeout: 1000 * 60 // 请求超时时间
};

/**
 * axios工厂方法
 *
 * @export
 * @param {AxiosRequestConfig} [config={}]
 * @returns
 */
export function generator(config = {}) {
  const instance = axios.create(Object.assign(defaultConfig, config));
  instance.interceptors.response.use(undefined, (error) => {
    if (error.message.indexOf("timeout") > -1) {
      message.error("请求超时");
    } else {
      message.error("请求异常，请重试");
    }
  });
  instance.interceptors.response.use(responseFormatInterceptor.responseInterceptor);
  return instance;
}
