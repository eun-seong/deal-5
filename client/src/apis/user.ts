import { postFetchTemplate } from '../assets/utils/fetchTemplets';

const urls: { [key: string]: string } = {
  register: '/register',
  login: '/login',
  logout: '/logout',
  isLogined: '/is-logined',
  getLocation: '/get-location',
};

const userApiUrl = (url: string) => `/api/user${url}`;
export const api_register = (args: { [key: string]: string }) => postFetchTemplate(userApiUrl(urls.register), args);
export const api_login = (args: { [key: string]: string }) => postFetchTemplate(userApiUrl(urls.login), args);
export const api_logout = (args: { [key: string]: string }) => postFetchTemplate(userApiUrl(urls.logout), args);
export const api_isLogined = (args: { [key: string]: string }) => postFetchTemplate(userApiUrl(urls.isLogined), args);
export const api_getLocation = (args: { [key: string]: string }) =>
  postFetchTemplate(userApiUrl(urls.getLocation), args);
