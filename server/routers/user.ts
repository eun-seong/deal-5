import { Router } from 'express';
import USER from '../action/user';
import { authJWT } from './middlewares';

const userRouter = Router();

userRouter.post('/login', USER.actionLogin);
userRouter.post('/register', USER.actionRegister);
userRouter.post('/is-logined', authJWT, USER.actionIsLogined);

export default userRouter;
