import axios from "axios";

const axiosCSRF = axios.create({
    withCredentials: true,
    //xsrfCookieName: 'CSRF-TOKEN',
    //xsrfHeaderName: 'X-CSRF-Token',
    //headers:{
    //    'X-CSRF-Token':'CSRF-TOKEN',
     //   withCredentials: true
    //},
});

export default axiosCSRF;