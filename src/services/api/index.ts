import axios from "axios";

const apiInstance = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
        "Content-Type": "application/json"
    }
});

export const setAuthToken = (token?: string) => {
    if (token){
        apiInstance.defaults.headers.common["Authorization"] = token;
    } else {
        delete apiInstance.defaults.headers.common["Authorization"]
    }
}

export default apiInstance;