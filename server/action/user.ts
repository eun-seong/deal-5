import { Request, Response } from 'express';
import { execQuery, selectQuery } from '../db';
import { sign } from './auth';
import USER_QUERY from '../query/user';

const actionLogin = async (req: Request, res: Response) => {
  try {
    const { user_id, pw } = req.body;
    const result = await selectQuery(USER_QUERY.queryLogin({ user_id, pw }));
    const data: {
      id: number;
      user_id: string;
      nickname: string;
      location_1: string;
    } = JSON.parse(result)[0];

    const accessToken = sign(data.id, data.nickname);
    res.status(200).send({
      ok: true,
      code: 1,
      message: '성공적으로 로그인 되었습니다.',
      accessToken,
      data: {
        u_id: data.id,
        user_id: data.user_id,
        nickname: data.nickname,
        location: data.location_1,
      },
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
      res.send(JSON.stringify({ message: '성공적으로 회원가입 되었습니다.', code: 1 }));
    }
  } catch (err) {
    res.send(JSON.stringify({ message: '회원가입에 실패하였습니다.', code: 3 }));
  }
};

export default {
  actionLogin,
  actionRegister,
};
