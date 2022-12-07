import axios from "axios";

const settingaxios = axios.create({
    withCredentials: true,
});

export default settingaxios;