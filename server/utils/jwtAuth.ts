import jwt from 'jsonwebtoken';

interface IToken {
  id: number; // user pk
  user_id: string; // user ID
}
const EXPIRED = 'JWT expired';

const sign = ({ id, user_id }: IToken) => {
  // access token 발급
  const payload: IToken = {
    // access token에 들어갈 payload
    id: id,
    user_id: user_id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    // secret으로 sign하여 발급하고 return
    algorithm: 'HS256', // 암호화 알고리즘
    expiresIn: '1h', // 유효기간
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
      user_id: decoded.user_id,
    };
  } catch (err) {
    return {
      ok: false,
      message: EXPIRED,
    };
  }
};

const refresh = () => {
  // refresh token 발급
  return jwt.sign({}, process.env.JWT_SECRET as string, {
    // refresh token은 payload 없이 발급
    algorithm: 'HS256',
    expiresIn: '1d',
  });
};

export { EXPIRED, sign, verify, refresh };
