import { Router } from 'express';
import userRouter from './user';
import mainRouter from './main';

const router = Router();

router.use('/user', userRouter);
router.use('/main', mainRouter);

export default router;
