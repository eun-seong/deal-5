import { Request, Response } from 'express';
import { execQuery, selectQuery } from '../db';
import USER_QUERY from '../query/user';

const actionLogin = async (req: Request, res: Response) => {
  try {
    const { user_id, pw } = req.body;
    console.log(user_id, pw);
    const data = await selectQuery(USER_QUERY.queryLogin({ user_id, pw }));
    res.send(data);
  } catch (err) {
    await console.error(err);
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
      const affectedRows = JSON.parse(data).affectedRows;
      if (!affectedRows) res.send(JSON.stringify({ message: '회원가입에 실패하였습니다.', code: 3 }));
      else res.send(JSON.stringify({ message: '성공적으로 회원가입 되었습니다.', code: 1 }));
    }
  } catch (err) {
    await console.error(err);
  }
};

export default {
  actionLogin,
  actionRegister,
};
