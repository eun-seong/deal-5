// 쿠키 저장 방식 바꾸기
export const setCookie = (cookieName: string, value: string, days: number) => {
  var expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + days);
  // 설정 일수만큼 현재시간에 만료값으로 지정

  var cookie_value = escape(value) + (days == null ? '' : '; expires=' + expireDate.toUTCString());
  document.cookie = `${cookieName}=${cookie_value}`;
};

export const getCookie = (cookieName: string) => {
  var value = document.cookie.match(`(^|;) ?'${cookieName}=([^;]*)(;|$)`);
  return value ? value[2] : null;
};

export const deleteCookie = (cookieName: string) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1999 00:00:10 GMT;`;
};
