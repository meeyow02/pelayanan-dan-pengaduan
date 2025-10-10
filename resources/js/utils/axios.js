import axios from "axios";

// Konfigurasi default axios
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Ganti dengan URL backend Laravel
});

export default api;
