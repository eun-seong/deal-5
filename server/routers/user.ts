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

userRouter.post('/upload', authJWT, async (req: any, res) => {
  try {
    console.log(req.user);
    if (req.user) {
      console.log(req.body);
      const { category, title, discription, price, img_list, deletedExistingImages } = req.body;
      console.log(img_list);
      deletedExistingImages((img: string) => {
        const delIndex = img_list.indexOf(img);
        if (delIndex !== -1) {
          console.log('del', img_list[delIndex]);
          img_list.splice(delIndex, 1);
        }
      });
      console.log(img_list);
      // const data = await execQuery(
      //   NEWPOST_QUERY.queryInsertItem({
      //     user_id: req.user.id,
      //     category: category,
      //     title: title,
      //     discription: discription,
      //     price: price,
      //     img_list: JSON.stringify(img_list),
      //   })
      // );
      return res.send({ ok: true, message: '글쓰기 완료!' });
    } else {
      return res.send({ ok: false, message: '사용자 인증 실패' });
    }
  } catch (err) {
    return res.send({ ok: false, message: '포스팅 실패' });
  }
});

export default userRouter;
