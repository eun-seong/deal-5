import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { sign, verify, EXPIRED } from '../utils/jwtAuth';
import { selectQuery } from '../db';
import AUTH_QUERY from '../query/auth';

const refreshVerify = async (token: string, id: number) => {
  try {
    const data = await selectQuery(AUTH_QUERY.queryGetUserToken(id));
    if (data === token) {
<<<<<<< HEAD
      jwt.verify(token, process.env.JWT_SECRET as string);
=======
      jwt.verify(token, process.env.JWT_SECRET);
>>>>>>> 06a5cbf46724a990065c757a7e4f595765688442
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const refresh = async (req: Request, res: Response) => {
  // 요청된 헤더에서 access token과 refresh token의 존재 유무를 체크합니다.
  if (req.headers.authorization && req.headers.refresh) {
    const authToken = req.headers.authorization.split('Bearer ')[1];
    const refreshToken = req.headers.refresh as string;

    // access token 검증 -> 만료되어 있어야 함
    const authResult = verify(authToken);

    // access token 디코딩하여 user의 정보를 가져옵니다.
    // 토큰이 만료가 되었어도 디코딩 가능
    const decoded: {
      id: number;
      user_id: string;
      nick_name: string;
      location_1: string;
      location_2: string;
    } = JSON.parse(jwt.decode(authToken) as string);

    // 디코딩 결과가 없으면 권한이 없음을 응답.
    if (decoded === null) {
      res.status(401).send({
        ok: false,
        message: 'No authorized!',
      });
    }

    /* access token의 decoding 된 값에서
      유저의 id를 가져와 refresh token을 검증합니다. */
    const refreshResult = refreshVerify(refreshToken, decoded.id);

    // 재발급을 위해서는 access token이 만료되어 있어야합니다.
    if (!authResult.ok && authResult.message === EXPIRED) {
      // 1. access token이 만료되고, refresh token도 만료 된 경우 => 새로 로그인해야합니다.
      if (!refreshResult) {
        res.status(401).send({
          ok: false,
          message: 'No authorized!',
        });
      } else {
        // 2. access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급
        const newAccessToken = sign(decoded);

        res.status(200).send({
          // 새로 발급한 access token과 원래 있던 refresh token 모두 클라이언트에게 반환합니다.
          ok: true,
          data: {
            accessToken: newAccessToken,
            refreshToken,
          },
        });
      }
    } else {
      // 3. access token이 만료되지 않은경우 => refresh 할 필요가 없습니다.
      res.status(400).send({
        ok: false,
        message: 'Access token is not expired!',
      });
    }
  } else {
    // access token 또는 refresh token이 헤더에 없는 경우
    res.status(400).send({
      ok: false,
      message: 'Access token and refresh token are need for refresh!',
    });
  }
};
