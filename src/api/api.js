import axios from 'axios';

let api = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true
});

axios.defaults.withCredentials = true;

export default api; 