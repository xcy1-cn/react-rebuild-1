import axios, {
  AxiosError,
  type Method,
  type InternalAxiosRequestConfig,
} from "axios";

const instance = axios.create({
  baseURL: "https://smart-shop.itheima.net/index.php?s=/api/",
  timeout: 10000,
});

/**
 * 🔥 请求拦截器
 */
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.headers) {
      config.headers = {};
    }

    config.headers["Content-Type"] = "application/json";
    config.headers["platform"] = "H5";

    // ✅ 获取 token
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Access-Token"] = token;
    }

    return config;
  },
  (err) => Promise.reject(err),
);

/**
 * 🔥 响应拦截器
 */
instance.interceptors.response.use(
  (res) => {
    // ✅ 业务状态判断
    if (res.data.status !== 200) {
      return Promise.reject(res.data);
    }

    // ✅ 只返回核心数据
    return res.data.data;
  },
  (err: AxiosError) => {
    // 🔥 token 失效处理
    if (err.response?.status === 401) {
      // ❗一定要清 token
      localStorage.removeItem("token");

      const returnUrl = window.location.pathname + window.location.search;

      window.location.href = `/login?returnUrl=${encodeURIComponent(
        returnUrl,
      )}`;
    }

    return Promise.reject(err);
  },
);

/**
 * 🔥 request 封装（泛型增强）
 */
export const request = <T = any>(
  url: string,
  method: Method = "GET",
  submitData?: object,
): Promise<T> => {
  return instance.request({
    url,
    method,
    [method.toUpperCase() === "GET" ? "params" : "data"]: submitData,
  }) as Promise<T>;
};

export default instance;
