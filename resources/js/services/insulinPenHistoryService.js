import api from "@/utils/axios";

const INSULIN_PEN_HISTORY_ENDPOINTS = {
    fetchAll: {
        path: "/api/insulin-pen-history",
        method: "GET",
    },
    fetchByUuid: {
        path: "/api/insulin-pen-history/{uuid}",
        method: "GET",
    },
    create: {
        path: "/api/insulin-pen-history",
        method: "POST",
    },
    update: {
        path: "/api/insulin-pen-history/{uuid}",
        method: "PUT",
    },
    delete: {
        path: "/api/insulin-pen-history/{uuid}",
        method: "DELETE",
    },
};

export const insulinPenHistoryService = {
    fetchAll: async (params = {}, signal) => {
        try {
            const response = await api.request(
                INSULIN_PEN_HISTORY_ENDPOINTS.fetchAll.path,
                {
                    method: INSULIN_PEN_HISTORY_ENDPOINTS.fetchAll.method,
                    params: {
                        page: params.page,
                        limit: params.limit,
                        search: params.search,
                    },
                    signal,
                }
            );
            return response.data;
        } catch (error) {
            if (error.name === "AbortError") {
                throw error;
            }
            throw error?.response?.data || error;
        }
    },

    delete: async (uuid) => {
        try {
            const response = await api.request(
                INSULIN_PEN_HISTORY_ENDPOINTS.delete.path.replace(
                    "{uuid}",
                    uuid
                ),
                {
                    method: INSULIN_PEN_HISTORY_ENDPOINTS.delete.method,
                }
            );
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
};
