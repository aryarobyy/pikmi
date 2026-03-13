import axios from 'axios';


// process.env.NODE_ENV
const apiHandler = axios.create({
    baseURL: process.env.BACKEND_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

apiHandler.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) config.headers["Authorization"] = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error),
);

apiHandler.interceptors.response.use(
    (response) => {
        const newToken = response.headers["x-new-access-token"];
        if (newToken) {
            localStorage.setItem("token", newToken);
        }
        return response;
    },
    (error) => {
        if (!error.response) return Promise.reject(error);

        if (error.response.status === 401) {
            localStorage.removeItem("token");
        }

        return Promise.reject(error.response?.data?.error || error);
    },
);

export default apiHandler;