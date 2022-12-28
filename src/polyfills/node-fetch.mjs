import realFetch from 'node-fetch'

const fetch = (url, options) => {
    const secureUrl = (/^\/\//.test(url))
        ? `https:${url}`
        : url;
    return realFetch.call(this, secureUrl, options);
};

if (!global.fetch) {
  global.fetch = fetch;
  global.Response = realFetch.Response;
  global.Headers = realFetch.Headers;
  global.Request = realFetch.Request;
}
