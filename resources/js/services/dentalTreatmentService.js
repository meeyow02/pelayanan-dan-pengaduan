import api from "@/utils/axios";

const DENTAL_TREATMENT_HISTORY_SERVICE_ENDPOINT = {
    fetchAll: {
        path: "/api/dental-treatment-history",
        method: "GET",
    },
    fetchByUuid: {
        path: "/api/dental-treatment-history/{uuid}",
        method: "GET",
    },
    create: {
        path: "/api/dental-treatment-history",
        method: "POST",
    },
    update: {
        path: "/api/dental-treatment-history/{uuid}",
        method: "PUT",
    },
    delete: {
        path: "/api/dental-treatment-history/{uuid}",
        method: "DELETE",
    },
};

export const dentalTreatmentHistoryService = {
    fetchAll: async (params = {}, signal) => {
        try {
            const response = await api.request(
                DENTAL_TREATMENT_HISTORY_SERVICE_ENDPOINT.fetchAll.path,
                {
                    method: DENTAL_TREATMENT_HISTORY_SERVICE_ENDPOINT.fetchAll
                        .method,
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
                DENTAL_TREATMENT_HISTORY_SERVICE_ENDPOINT.delete.path.replace(
                    "{uuid}",
                    uuid
                ),
                {
                    method: DENTAL_TREATMENT_HISTORY_SERVICE_ENDPOINT.delete
                        .method,
                }
            );
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
};
