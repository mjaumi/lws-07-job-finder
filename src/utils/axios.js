import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://job-finder-ena7.onrender.com',
});

export default axiosInstance;