import Axios from "axios"

export const axios = Axios.create({
  baseURL: "",
  headers: { "Content-Type": "application/json" },
})

axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
