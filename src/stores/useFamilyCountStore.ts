import { create } from "zustand";

import { AppConfig } from "@/constants/appConfigs";

export type CountResponse = { count: number };
export type UpdateType = "increment" | "decrement";

type FamilyCountState = {
    mens: number;
    girls: number;
    isLoading: boolean;
    error: string | null;
    fetchCounts: () => Promise<void>;
    fetchMens: () => Promise<void>;
    fetchGirls: () => Promise<void>;
    updateMens: (type: UpdateType) => Promise<void>;
    updateGirls: (type: UpdateType) => Promise<void>;
};

const parseCountResponse = async (response: Response): Promise<CountResponse> => {
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return (await response.json()) as CountResponse;
};

export const useFamilyCountStore = create<FamilyCountState>((set) => ({
    mens: 0,
    girls: 0,
    isLoading: false,
    error: null,

    fetchCounts: async () => {
        set({ isLoading: true, error: null });

        try {
            const [mensResponse, girlsResponse] = await Promise.all([
                fetch(AppConfig.API_URL_MENS),
                fetch(AppConfig.API_URL_GIRLS),
            ]);
            const [mensData, girlsData] = await Promise.all([
                parseCountResponse(mensResponse),
                parseCountResponse(girlsResponse),
            ]);

            set({
                mens: mensData.count,
                girls: girlsData.count,
                isLoading: false,
            });
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : "Failed to fetch counts",
            });
        }
    },

    fetchMens: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await fetch(AppConfig.API_URL_MENS);
            const data = await parseCountResponse(response);

            set({
                mens: data.count,
                isLoading: false,
            });
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : "Failed to fetch mens count",
            });
        }
    },

    fetchGirls: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await fetch(AppConfig.API_URL_GIRLS);
            const data = await parseCountResponse(response);

            set({
                girls: data.count,
                isLoading: false,
            });
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : "Failed to fetch girls count",
            });
        }
    },

    updateMens: async (type) => {
        set({ isLoading: true, error: null });

        try {
            const response = await fetch(AppConfig.API_URL_MENS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ type }),
            });
            const data = await parseCountResponse(response);

            set({
                mens: data.count,
                isLoading: false,
            });
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : "Failed to update mens count",
            });
        }
    },

    updateGirls: async (type) => {
        set({ isLoading: true, error: null });

        try {
            const response = await fetch(AppConfig.API_URL_GIRLS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ type }),
            });
            const data = await parseCountResponse(response);

            set({
                girls: data.count,
                isLoading: false,
            });
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : "Failed to update girls count",
            });
        }
    },
}));
