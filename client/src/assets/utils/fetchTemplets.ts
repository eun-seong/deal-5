export const postFetchTemplate = (url: string, args: { [key: string]: any }) =>
  fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(res => res.json());

export const getFetchTemplate = (url: string) =>
  fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
