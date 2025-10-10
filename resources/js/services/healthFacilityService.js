import api from "@/utils/axios";

const HEALTH_FACILITY_ENDPOINTS = {
    fetchAll: {
        path: "/api/health-facility",
        method: "GET",
    },
    fetchByUuid: {
        path: "/api/health-facility/{uuid}",
        method: "GET",
    },
    create: {
        path: "/api/health-facility",
        method: "POST",
    },
    update: {
        path: "/api/health-facility/{uuid}",
        method: "PUT",
    },
    delete: {
        path: "/api/health-facility/{uuid}",
        method: "DELETE",
    },
};

export const healthFacilityService = {
    fetchAll: async (params = {}, signal) => {
        try {
            const response = await api.request(HEALTH_FACILITY_ENDPOINTS.fetchAll.path, {
                method: HEALTH_FACILITY_ENDPOINTS.fetchAll.method,
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
                HEALTH_FACILITY_ENDPOINTS.fetchByUuid.path.replace("{uuid}", uuid),
                {
                    method: HEALTH_FACILITY_ENDPOINTS.fetchByUuid.method,
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
                HEALTH_FACILITY_ENDPOINTS.delete.path.replace("{uuid}", uuid),
                {
                    method: HEALTH_FACILITY_ENDPOINTS.delete.method,
                }
            );
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
};
