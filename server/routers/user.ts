import { Router } from 'express';
import USER from '../action/user';

const userRouter = Router();

userRouter.post('/login', USER.actionLogin);
userRouter.post('/register', USER.actionRegister);

export default userRouter;
