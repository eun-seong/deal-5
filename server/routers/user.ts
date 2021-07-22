import { Router } from 'express';
import USER from '../action/user';
import { authJWT } from './middlewares';

const userRouter = Router();

userRouter.post('/login', authJWT, USER.actionLogin);
userRouter.post('/logout', authJWT, USER.actionLogout);
userRouter.post('/register', USER.actionRegister);
userRouter.post('/is-logined', authJWT, USER.actionIsLogined);
userRouter.post('/set-location', authJWT, USER.actionSetLocation);
userRouter.post('/get-location', authJWT, USER.actionGetLocation);

export default userRouter;
