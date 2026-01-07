import axios from "axios";

const API = axios.create({
  baseURL: "https://flamius-2.onrender.com/api",
  withCredentials: true,
});

// ✅ User Authentication APIs
export const registerUser = (data) => API.post("/user/register", data);
export const loginUser = (data) => API.post("/user/login", data);
export const logoutUser = () => API.post("/user/logout");

// Admin OTP
export const sendAdminOTP = (data) => API.post("/admin/send-otp", data);
export const verifyAdminOTP = (data) => API.post("/admin/verify-otp", data);

// ✅ Protected Route Check (for AuthContext)
export const getProtectedHome = () => API.get("/user/home");
