import { Request, Response, NextFunction } from 'express';
import { verify } from '../utils/jwtAuth';

export const authJWT = (req: any, res: Response, next: NextFunction) => {
  if (req.headers.cookie) {
    const token = req.headers.cookie.split('accessToken=')[1]; // header에서 access token을 가져옵니다.
    if (!token) return next(); // 토큰이 없을 경우 다름 작업을 진행합니다.

    const result = verify(token); // token을 검증합니다.
    if (result.ok) {
      // token이 검증되었으면 req에 값을 세팅하고, 다음 콜백함수로 갑니다.
      req.user = result;
      req.message = '인증되었습니다';
    } else {
      // 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답합니다.
      req.user = null;
      req.message = '로그인이 필요한 기능입니다';
    }
  } else {
    // 쿠키가 없다면 로그인을 먼저 해야 합니다.
    req.user = null;
    req.message = '로그인해야 합니다.';
  }
  return next();
};
