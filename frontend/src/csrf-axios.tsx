import axios from "axios";

const axiosCSRF = axios.create({
    withCredentials: true,
});

export default axiosCSRF;