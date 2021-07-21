const baseURL = 'http://ec2-13-125-215-98.ap-northeast-2.compute.amazonaws.com:81/api/user';
const dev_baseURL = 'http://localhost:81/api/user';

const urls: { [key: string]: string } = {
  register: '/register',
  login: '/login',
  isLogined: '/is-logined',
};

const getURL = (url: string) => dev_baseURL + url;
const fetcthTemplate = (url: string, args: { [key: string]: string }) =>
  fetch(getURL(url), {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(res => res.json());

export const api_register = (args: { [key: string]: string }) => fetcthTemplate(urls.register, args);
export const api_login = (args: { [key: string]: string }) => fetcthTemplate(urls.login, args);
export const api_isLogined = (args: { [key: string]: string }) => fetcthTemplate(urls.isLogined, args);

export const api_test = (url: string, args: { [key: string]: string }) =>
  fetch(getURL(url), {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorizaiton: 'Bearer access-token',
      Refresh: 'refresh-token',
    },
    body: JSON.stringify(args),
  }).then(res => res.json());
