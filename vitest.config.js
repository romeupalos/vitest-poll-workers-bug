import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
    test: {
        mockReset: true,
        restoreMocks: true,
        clearMocks: true,
        poolOptions: {
            workers: {
                miniflare: {
                    compatibilityFlags: ["nodejs_compat"],
                    compatibilityDate: "2024-04-03",
                },
            },
        },
    },
});
