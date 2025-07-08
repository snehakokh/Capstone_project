import axios from "axios";

const token = localStorage.getItem("accessToken");

export const http = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API || "http://localhost:3000",
    headers: {
        Authorization: token ? `Bearer ${token}` : undefined
    }
});

// Add request interceptor to handle token updates
http.interceptors.request.use(
    (config) => {
        const currentToken = localStorage.getItem("accessToken");
        if (currentToken) {
            config.headers.Authorization = `Bearer ${currentToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            // Optionally redirect to login
        }
        return Promise.reject(error);
    }
);