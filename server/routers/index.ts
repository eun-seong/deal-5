import { Router } from 'express';
import userRouter from './user';
import mainRouter from './main';
import itemRouter from './itemdetail';
import newpostRouter from './newpost';
import chatRouter from './chat';

const router = Router();

router.use('/user', userRouter);
router.use('/main', mainRouter);
router.use('/itemdetail', itemRouter);
router.use('/newpost', newpostRouter);
router.use('/chat', chatRouter);

export default router;
