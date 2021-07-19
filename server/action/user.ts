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

    console.log(countNum);
    if (!countNum) {
      res.send('있어요 !! 399');
      return;
    }
    const data = await execQuery(USER_QUERY.queryRegister({ user_id, pw, nickname, location }));
    res.send(data);
  } catch (err) {
    await console.error(err);
  }
};

export default {
  actionLogin,
  actionRegister,
};
