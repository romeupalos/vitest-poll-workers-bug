import { describe, it, expect, afterEach, beforeAll } from "vitest";
import { fetchMock } from "cloudflare:test";

beforeAll(() => {
    fetchMock.activate();
    fetchMock.disableNetConnect();
});

afterEach(() => fetchMock.assertNoPendingInterceptors());

describe("fetch-mock", () => {
    it("should work with single key in query params", async () => {
        fetchMock
            .get("https://example.com")
            .intercept({ path: "/index.html?a=1" })
            .reply(200, "body");

        const response = await fetch("https://example.com/index.html?a=1");
        expect(await response.text()).toBe("body");
    });

    // This test fails, however it should pass.
    it("should work with repeated keys in query params", async () => {
        fetchMock
            .get("https://example.com")
            .intercept({ path: "/index.html?a=1&a=2" })
            .reply(200, "body");

        const response = await fetch("https://example.com/index.html?a=1&a=2");
        expect(await response.text()).toBe("body");
    });
});
