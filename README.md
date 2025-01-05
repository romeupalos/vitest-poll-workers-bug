# Cloudflare Workers Vitest Pool Issue Demo

```
TLDR; `fetchMock` interceptor is not able to match URLs with repeated query parameters. e.g., ?a=1&a=2
```

This repository demonstrates an issue with query parameter handling in Cloudflare's `vitest-pool-workers` package, specifically with the `fetchMock` functionality.

## The Issue

https://github.com/cloudflare/workers-sdk/issues/7667

When using `fetchMock` to intercept requests, there's a bug in handling URL query parameters with repeated keys. While single key-value pairs work correctly, the mock fails to properly match URLs that contain multiple values for the same parameter key.

### Working Example

```javascript
// This works fine
fetchMock
.get("https://example.com")
.intercept({ path: "/index.html?a=1" })
.reply(200, "body");
```

### Failing Example

```javascript
// This fails to match
fetchMock
.get("https://example.com")
.intercept({ path: "/index.html?a=1&a=2" })
.reply(200, "body");
```


## Steps to Reproduce

1. Clone this repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`

You'll notice that the test case with repeated query parameters fails, while the single parameter test passes successfully.

## Expected Behavior

The fetch mock should properly match URLs with repeated query parameters, as this is valid URL syntax and commonly used in web applications.

## Environment

- `vitest-pool-workers: 0.5.40`
- `wrangler: 3.99.0`
- `Node.js: v20.18.1`

## Related Links

- [Cloudflare Test APIs](https://developers.cloudflare.com/workers/testing/vitest-integration/test-apis/)
- [Workers SDK Github Repo](https://github.com/cloudflare/workers-sdk)
