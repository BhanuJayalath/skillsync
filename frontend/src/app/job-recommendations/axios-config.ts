import axios from "axios"

// Create a custom Axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001",
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
})

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`)
    return config
  },
  (error) => {
    console.error("Request error:", error)
    return Promise.reject(error)
  },
)

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      console.error("Network error - Is the backend server running?", error)
      // You could show a user-friendly message here
    } else if (error.response) {
      console.error("Response error:", error.response.status, error.response.data)
    } else {
      console.error("Unexpected error:", error)
    }
    return Promise.reject(error)
  },
)

export default api

