import { getCookie } from './cookie';

export const postFetchTemplate = (url: string, args: { [key: string]: any }) =>
  fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('accessToken') || '',
    },
    body: JSON.stringify(args),
  }).then(res => res.json());

export const getFetchTemplate = (url: string) =>
  fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('accessToken') || '',
    },
  }).then(res => res.json());
