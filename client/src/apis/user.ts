const baseURL = 'http://ec2-13-125-215-98.ap-northeast-2.compute.amazonaws.com:81/api/user';
const dev_baseURL = 'http://localhost:81/api/user';

const urls: { [key: string]: string } = {
  register: '/register',
  login: '/login',
};

const getURL = (url: string) => dev_baseURL + urls[url];
const fetcthTemplate = (url: string, args: { [key: string]: string }) =>
  fetch(getURL(url), {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(res => res.json());

export const api_register = (args: { [key: string]: string }) => fetcthTemplate('register', args);
export const api_login = (args: { [key: string]: string }) => fetcthTemplate('login', args);

export const api_test = (url: string, args: { [key: string]: string }) =>
  fetch(getURL(url), {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    },
    body: JSON.stringify(args),
  }).then(res => res.json());
