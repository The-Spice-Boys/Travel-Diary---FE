import axios from "axios";

const api = axios.create({
  baseURL: "https://travel-diary-be-jfxt.onrender.com",
});

// export const userLogin = (username, password) => {
//   return api.post("/auth/login", { username, password }).then((res) => {
//     return res.data;
//   });
// };

// export const loginStatus = async () => {
//   return api.get("/auth/check-auth").then((res) => {
//     return res.data;
//   });
// };

// export const userLogout = () => {
//   return api.get("/auth/logout").then((res) => {
//     return res.data;
//   });
// };

// export const updateUser = (user) => {
//   return api.patch("/users", user).then((res) => {
//     return res.data;
//   });
// };

// export const updateUserPassword = (passwordMap) => {
//   return api.patch("/auth/password-update", passwordMap).then((res) => {
//     return res.data;
//   });
// };
