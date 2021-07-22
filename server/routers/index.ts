import { Router } from 'express';
import userRouter from './user';
import mainRouter from './main';
import itemRouter from './itemdetail';

const router = Router();

router.use('/user', userRouter);
router.use('/main', mainRouter);
router.use('/itemdetail', itemRouter);

export default router;
