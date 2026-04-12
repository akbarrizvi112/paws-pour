import axios from 'axios';


const baseURL = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});


axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};


axiosClient.interceptors.response.use(
    (response) => {
        // Automatically unwrap the nested 'data' object if it exists
        // This handles API responses structured as { data: { ... }, message: "..." }
        if (response.data && Object.prototype.hasOwnProperty.call(response.data, 'data')) {
            return {
                ...response,
                data: response.data.data
            };
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const isAuthRequest = originalRequest.url.includes('/auth/login') || originalRequest.url.includes('/auth/refresh');

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthRequest) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosClient(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {

                const response = await axios.post(`${baseURL}/auth/refresh`, {}, {
                    // WithCredentials might be needed if refresh token is in an httpOnly cookie.
                    // withCredentials: true
                });

                const newToken = response.data.accessToken;
                if (newToken) {
                    localStorage.setItem('accessToken', newToken);
                }

                processQueue(null, newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return axiosClient(originalRequest);
            } catch (err) {
                processQueue(err, null);

                if (err.response?.status === 401) {
                    localStorage.removeItem('accessToken');
                    window.location.href = '/login';
                }

                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
