import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8080/api",
// });

const api = axios.create({
  baseURL: "https://school-management-backend-v1k3.onrender.com/api",
});


// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token && !config.url?.includes("login")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // For FormData requests
    if (config.data instanceof FormData) {

      // Let browser automatically set:
      // multipart/form-data; boundary=...
      delete config.headers["Content-Type"];

    } else {

      // For normal JSON requests
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,

  (error) => {

    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;