import api from "@/utils/axios";

export const fetchUserData = async () => {
    try {
        const response = await api.get("/api/profile");
        return response.data;
    } catch (error) {
        console.error("Gagal mengambil data user: ", error);
        return null;
    }
};
