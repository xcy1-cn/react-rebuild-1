import axios, { AxiosError, type Method, type InternalAxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: 'https://smart-shop.itheima.net/index.php?s=/api/',
  timeout: 10000,
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || {}

    config.headers['Content-Type'] = 'application/json'
    config.headers['platform'] = 'H5'

    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Access-Token'] = token
    }

    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    if (res.data.status !== 200) {
      return Promise.reject(res.data)
    }

    return res.data.data
  },
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      const returnUrl = window.location.pathname + window.location.search
      window.location.href = `/login?returnUrl=${encodeURIComponent(returnUrl)}`
    }

    return Promise.reject(err)
  }
)

export const request = <T>(
  url: string,
  method: Method = 'GET',
  submitData?: object
) => {
  return instance.request<T>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData,
  })
}

export default instance