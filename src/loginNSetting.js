import axios from "axios";

const api = axios.create({
    baseURL: "https://travel-demo-p3bz.onrender.com/api",
    withCredentials: true,
});

export const userLogin = (username, password) => {
    return  api.post("/auth/login", { username, password }).then((res) => {
         return res.data;
     });
}

export const loginStatus = async () => {
    return api.get("/auth/check-auth").then((res) => {
        return res.data;
    })
}

export const userLogout = () => {
    return api.get("/auth/logout").then((res) => {
        return res.data;
    })
}