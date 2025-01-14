import axios from 'axios';

export const axiosIns = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
})

// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
//   withCredentials: true,
// });