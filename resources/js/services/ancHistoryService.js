import api from "@/utils/axios";

const ANC_HISTORY_SERVICE_ENDPOINT = {
    fetchAll: {
        path: "/api/anc-history",
        method: "GET",
    },
    fetchByUuid: {
        path: "/api/anc-history/{uuid}",
        method: "GET",
    },
    create: {
        path: "/api/anc-history",
        method: "POST",
    },
    update: {
        path: "/api/anc-history/{uuid}",
        method: "PUT",
    },
    delete: {
        path: "/api/anc-history/{uuid}",
        method: "DELETE",
    },
};

export const ancHistoryService = {
    fetchAll: async (params = {}, signal) => {
        try {
            const response = await api.request(
                ANC_HISTORY_SERVICE_ENDPOINT.fetchAll.path,
                {
                    method: ANC_HISTORY_SERVICE_ENDPOINT.fetchAll.method,
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
                ANC_HISTORY_SERVICE_ENDPOINT.delete.path.replace(
                    "{uuid}",
                    uuid
                ),
                {
                    method: ANC_HISTORY_SERVICE_ENDPOINT.delete.method,
                }
            );
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
};
