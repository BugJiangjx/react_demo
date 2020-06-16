import axios from 'axios';
import { omitBy } from 'lodash';
import { getApiAddress, clear, getToken } from './Session';

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
  'X-Requested-With': 'XMLHttpRequest', // xhr
  'Cache-Control': 'no-cache',
};


function formatUrl(path) {
  if (/^http/.test(path)) {
    return path;
  }
  return `${getApiAddress()}${path}`;
}

export default class Service {
  constructor(_options = {}) {
    const axios_ = axios.create(config);
    axios_.interceptors.request.use(
      (config) => {
        let conf = { ...config, headers: { token: getToken() }};
        return conf;
      },
      (error) => Promise.reject(error)
    );
    axios_.interceptors.response.use(
      // response => response.data.data,
      (response) => {
        const { code, message } = response.data;
        const successCode = [200];
        if (!successCode.includes(code)) {
          throw new Error(message);
        }
        return response.data.data;
      },
      (error) => {
        let err = {};
        if (error.response) {
          const { config: cfg = {} } = error.response;
          const e =
            typeof error.response.data === 'string'
              ? { error_message: error.response.data }
              : error.response.data;
          err = {
            ...e,
            status: error.response.status,
            url: cfg.url || '',
          };
        } else {
          err = error;
        }
        const errortext = err.error_message || err.message;
        clear();
        const e = new Error(errortext);
        e.status = err.status;
        e.response = error.response;
        throw e;
      }
    );
    this.$http = axios_;
    // 支持添加 url 前缀
    this.baseURL = _options.baseURL || '';
  }

  request(url, method, { params, data, headers = {}, isRoot = false, ...others } = {}) {
    if (!url) return;
    const conf = {
      ...others,
      url: formatUrl(`${this.baseURL}${url}`),
      method,
      headers,
      // disable browser's cache
      // always make a new request
      params: {
        ...params,
        timestamp: new Date().getTime()
      },
      data
    };
    conf.headers = omitBy(conf.headers, v => typeof v === 'undefined');
    return this.$http.request(conf);
  }

  get(url, params, config = {}) {
    return this.request(url, 'GET', { ...config, params });
  }

  post(url, data, config = {}) {
    return this.request(url, 'POST', { ...config, data });
  }

  put(url, data, config = {}) {
    return this.request(url, 'PUT', { ...config, data });
  }

  delete(url, data, config = {}) {
    return this.request(url, 'DELETE', { ...config, data });
  }
}
