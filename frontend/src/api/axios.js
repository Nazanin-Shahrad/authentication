import axios from 'axios';

const BASE_URL="http://localhost:3500/api";



 const axiosRequest = axios.create({
    baseURL : BASE_URL,
})

export default axiosRequest;

