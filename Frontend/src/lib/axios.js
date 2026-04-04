import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://syncspace-c05l.onrender.com/api",
    withCredentials: true
})