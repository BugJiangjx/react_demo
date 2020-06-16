const AUTH_DATA_KEY = 'AUTH_DATA';
const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';
const AUTH_ISLOGIN = 'AUTH_ISLOGIN';

const API_HOST = '192.168.10.6';
const API_PORT = '9000';

export function getApiAddress() {
  const prefix = 'http';
  let port = `:${API_PORT}`;
  return `${prefix}://${API_HOST}${port}`;
}

export function getToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function saveToken(token) {
  return localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function getIsLogin() {
  return localStorage.getItem(AUTH_ISLOGIN || false);
}

export function saveIsLogin(isLogin) {
  return localStorage.setItem(AUTH_ISLOGIN, isLogin);
}

export function getAuthData() {
  let data;
  try {
    data = JSON.parse(localStorage.getItem(AUTH_DATA_KEY));
  } catch (e) {
    // do nothing
    data = null;
  }
  return data;
}

export function setAuthData(data) {
  return localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(data));
}

export function clear() {
  localStorage.removeItem(AUTH_DATA_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_ISLOGIN);
}


export default {
  getApiAddress,
  getAuthData,
  getToken,
  saveToken,
  setAuthData,
  getIsLogin,
  saveIsLogin
};