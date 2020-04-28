import axios from "axios";
import hex from "crypto-js/enc-hex";
import hmacSHA from "crypto-js/hmac-sha256";
import forEach from "lodash/forEach";
import set from "lodash/set";

const apiRoot = "/api/v1";
const domain = "https://www.bitmex.com";
// : 'https://testnet.bitmex.com';
const baseURL = domain + apiRoot;

export const instance = axios.create();

export function getBitmexSignature(secret, message) {
  console.debug("Bitmex signature message: ", message);
  return hex.stringify(hmacSHA(message, secret));
}

export const signBitmex = (config, { apiKey, apiSecret } = {}) => {
  // Don't do anything is no authentication provided
  if (!apiSecret || !apiKey) {
    return config;
  }

  const { method = "GET", url, data } = config;

  let query = "";
  let postBody = "";

  // This code uses the 'expires' scheme. You can also use the 'nonce' scheme. See
  // https://www.bitmex.com/app/apiKeysUsage for more details.
  const expires = new Date().getTime() + 60 * 1000; // 1 min in the future

  if (config.params) {
    const params = new URLSearchParams();
    forEach(config.params, (v, k) => params.append(k, v));
    query = `?${params.toString()}`;
  }
  if (config.data) {
    /* Pre-compute the reqBody so we can be sure that we're using *exactly*
        the same body in the request and in the signature. If you don't do this,
        you might get differently-sorted keys and blow the signature */
    postBody = JSON.stringify(data);
  }

  const string =
    method.toUpperCase() + apiRoot + url + query + expires + postBody;
  const signature = getBitmexSignature(apiSecret, string);

  set(config, ["headers", "api-expires"], expires);
  set(config, ["headers", "api-signature"], signature);
  set(config, ["headers", "api-key"], apiKey);

  // Fix for fix in axios. Axios will not url encode : in query parameters for ui
  set(config, ["url"], `${config.url}${query}`);
  delete config.params; // eslint-disable-line no-param-reassign
  return config;
};

const proxy = "https://thingproxy.freeboard.io/fetch/";
const bitmex = (config, auth = {}) => {
  const c = signBitmex(config, auth);
  c.url = `${proxy}${baseURL}${c.url}`;
  return instance(c).then((r) => r.data);
};
export default bitmex;
