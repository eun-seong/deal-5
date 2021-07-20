import { Request, Response } from 'express';
import { execQuery, selectQuery } from '../db';
import { sign, refresh } from '../utils/jwtAuth';
import USER_QUERY from '../query/user';
import AUTH_QUERY from '../query/auth';

const actionLogin = async (req: Request, res: Response) => {
  try {
    const { user_id, pw } = req.body;
    const result = await selectQuery(USER_QUERY.queryLogin({ user_id, pw }));
    const data: {
      id: number;
      user_id: string;
      nick_name: string;
      location_1: string;
      location_2: string;
    } = JSON.parse(result)[0];

    const accessToken = sign(data);
    const refreshToken = refresh();

    // db에 refreshToken 저장
    await execQuery(AUTH_QUERY.querySetUserToken({ id: data.id, token: refreshToken }));

    res.append('Set-Cookie', `refreshToken=${refreshToken}; Path=/refresh; Secure; HttpOnly;`);
    res.append('Set-Cookie', `accessToken=${accessToken}; Path=/api; Secure; HttpOnly;`);
    res.send({
      ok: true,
      code: 1,
      message: '성공적으로 로그인 되었습니다.',
      data: data,
    });
  } catch (err) {
    res.status(401).send({ ok: false, message: '로그인에 실패하였습니다.' });
  }
};

const actionRegister = async (req: Request, res: Response) => {
  try {
    const { user_id, pw, nickname, location } = req.body;
    const count = await selectQuery(USER_QUERY.queryCheckUser({ user_id }));
    const countNum: { count: number } = JSON.parse(count)[0];

    if (!countNum) {
      res.send(
        JSON.stringify({
          message: '이미 존재하는 아이디입니다.',
          code: 2,
        })
      );
      return;
    } else {
      const data = await execQuery(USER_QUERY.queryRegister({ user_id, pw, nickname, location }));
      res.send(JSON.stringify({ ok: true, message: '성공적으로 회원가입 되었습니다.' }));
    }
  } catch (err) {
    res.send(JSON.stringify({ ok: false, message: '회원가입에 실패하였습니다.' }));
  }
};

export default {
  actionLogin,
  actionRegister,
};
