import { getCookie } from './cookie';

// const baseURL = 'http://ec2-13-125-215-98.ap-northeast-2.compute.amazonaws.com:81/api/user';
// const dev_baseURL = 'http://localhost:81/api/user';
const baseURL = `http://${location.hostname}:81`;

export const postFetchTemplate = (url: string, args: { [key: string]: any }) =>
  fetch(baseURL + url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('accessToken') || '',
    },
    body: JSON.stringify(args),
  }).then(res => res.json());

export const getFetchTemplate = (url: string) =>
  fetch(baseURL, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());

/*
export const postFetchTemplate = (url: string, args: { [key: string]: any }) =>
  new Promise((resolve, reject) => {
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    })
      .then(res => res.json())
      .then(res => {
        if (!res.user) {
          'refresh'


          '정상발급' - '발급된 정보로 재요청';
          fetch (refresh).then(res => {
            if(res.ok)  {
              fetch(url, {
                method : 'post',

              }).then(res => res.json()).then(res=> resolve(res))
              
            }
          })
          
          'access refresh 가 만료됨.' - throw new error();
        }
        else resolve(res);
      });
  }).catch(err => {
    console.log(err);
  });
*/
