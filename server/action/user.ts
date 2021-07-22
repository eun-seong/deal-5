import { Request, Response } from 'express';
import { execQuery, selectQuery } from '../db';
import { sign, refresh } from '../utils/jwtAuth';
import USER_QUERY from '../query/user';
import AUTH_QUERY from '../query/auth';

// 로그인
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
    } = result[0];

    const accessToken = sign(data);
    const refreshToken = refresh();

    // db에 refreshToken 저장
    await execQuery(AUTH_QUERY.querySetUserToken({ id: data.id, token: refreshToken }));

    res.append('Set-Cookie', `refreshToken=${refreshToken}; Path=/refresh; HttpOnly;`);
    res.append('Set-Cookie', `accessToken=${accessToken}; Path=/; HttpOnly;`);
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

// 로그아웃
const actionLogout = async (req: any, res: Response) => {
  try {
    const { id } = req.user;
    const data = await execQuery(USER_QUERY.queryLogout(id));
    res.append('Set-Cookie', `refreshToken=''; Path=/refresh; HttpOnly;`);
    res.append('Set-Cookie', `accessToken=''; Path=/; HttpOnly;`);
    res.send({ ok: true, message: '성공적으로 로그아웃 되었습니다.' });
  } catch (err) {
    res.status(401).send({ ok: false, message: '로그아웃에 실패하였습니다.' });
  }
};

// 회원가입
const actionRegister = async (req: Request, res: Response) => {
  try {
    const { user_id, pw, nickname, location } = req.body;
    const count = await selectQuery(USER_QUERY.queryCheckUser({ user_id }));
    const countNum: { count: number } = count[0];

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

// 로그인이 되었는지 확인
const actionIsLogined = async (req: any, res: Response) => {
  try {
    if (req.user) {
      res.send({ ok: true, message: req.message, user: req.user });
    } else {
      res.send({ ok: false, message: req.message });
    }
  } catch (err) {
    res.send({ ok: false, message: '다시 로그인해야 합니다.' });
  }
};

// 내 지역 추가, 삭제, 설정
const actionSetLocation = async (req: any, res: Response) => {
  try {
    if (req.user) {
      const { location_1, location_2 } = req.body.data;
      console.log(location_1, location_2);
      const data = await execQuery(
        USER_QUERY.querySetLocation({
          id: req.user.id,
          location_1,
          location_2,
        })
      );
      res.send({ ok: true, message: req.message, user: req.user });
    } else {
      res.send({ ok: false, message: req.message });
    }
  } catch (err) {
    res.send({ ok: false, message: '내 지역 추가에 실패하였습니다.' });
  }
};

// 내 지역 가져오기
const actionGetLocation = async (req: any, res: Response) => {
  try {
    if (req.user) {
      const result = await selectQuery(USER_QUERY.queryGetLocation(req.user.id));
      res.send({ ok: true, message: req.message, user: req.user, data: result[0] });
    } else {
      res.send({ ok: false, message: req.message });
    }
  } catch (err) {
    res.send({ ok: false, message: '내 지역 가져오기에 실패하였습니다.' });
  }
};

export default {
  actionLogin,
  actionLogout,
  actionRegister,
  actionIsLogined,
  actionSetLocation,
  actionGetLocation,
};
