const baseURL = 'https://ec2-13-125-215-98.ap-northeast-2.compute.amazonaws.com:81/api/user';
const dev_baseURL = 'http://localhost:81/api/user';

const urls: { [key: string]: string } = {
  login: '/login',
  register: '/register',
};

const getURL = (url: string) => dev_baseURL + urls[url];

export const api_register = ({ user_id, pw, nickname, location }: { [key: string]: string }) =>
  fetch(getURL('register'), {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: user_id,
      pw: pw,
      nickname: nickname,
      location: location,
    }),
  }).then(res => res.json());
