import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface IToken {
  id: number;
  nickname: string;
}

const sign = (id: number, nickname: string) => {
  // access token 발급
  const payload: IToken = {
    // access token에 들어갈 payload
    id: id,
    nickname: nickname,
  };

  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    // secret으로 sign하여 발급하고 return
    algorithm: 'HS256', // 암호화 알고리즘
    expiresIn: '1m', // 유효기간
    issuer: 'deal5',
  });
};

const verify = (token: string) => {
  // access token 검증
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IToken;
    return {
      ok: true,
      id: decoded.id,
      nickname: decoded.nickname,
    };
  } catch (err) {
    return {
      ok: false,
      message: err.message,
    };
  }
};

export { sign, verify };
