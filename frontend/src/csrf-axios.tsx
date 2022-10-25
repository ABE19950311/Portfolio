import axios from "axios";

const axiosCSRF = axios.create({
    withCredentials: true,
    xsrfCookieName: 'CSRF-TOKEN',
    xsrfHeaderName: 'X-CSRF-Token'
});

export default axiosCSRF;