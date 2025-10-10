import api from "@/utils/axios";

const USER_ENDPOINTS = {
    fetchAll: {
        path: "/api/user",
        method: "GET",
    },
    fetchByUuid: {
        path: "/api/user/{uuid}",
        method: "GET",
    },
    create: {
        path: "/api/user",
        method: "POST",
    },
    update: {
        path: "/api/user/{uuid}",
        method: "PUT",
    },
    delete: {
        path: "/api/user/{uuid}",
        method: "DELETE",
    },
};

export const userService = {
    fetchAll: async (params = {}, signal) => {
        try {
            const response = await api.request(USER_ENDPOINTS.fetchAll.path, {
                method: USER_ENDPOINTS.fetchAll.method,
                params: {
                    page: params.page,
                    limit: params.limit,
                    search: params.search,
                },
                signal,
            });
            return response.data;
        } catch (error) {
            if (error.name === "AbortError") {
                throw error;
            }
            throw error?.response?.data || error;
        }
    },

    fetchByUuid: async (uuid) => {
        try {
            const response = await api.request(
                USER_ENDPOINTS.fetchByUuid.path.replace("{uuid}", uuid),
                {
                    method: USER_ENDPOINTS.fetchByUuid.method,
                }
            );
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },

    create: async (data) => {
        try {
            const response = await api.request(USER_ENDPOINTS.create.path, {
                method: USER_ENDPOINTS.create.method,
                data,
            });
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },

    update: async (uuid, data) => {
        try {
            const response = await api.request(
                USER_ENDPOINTS.update.path.replace("{uuid}", uuid),
                {
                    method: USER_ENDPOINTS.update.method,
                    data,
                }
            );
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },

    delete: async (uuid) => {
        try {
            const response = await api.request(
                USER_ENDPOINTS.delete.path.replace("{uuid}", uuid),
                {
                    method: USER_ENDPOINTS.delete.method,
                }
            );
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
};
