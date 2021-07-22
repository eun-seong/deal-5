import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authJWT } from './middlewares';
import { execQuery, selectQuery } from '../db';
import NEWPOST_QUERY from '../query/newpost';

const router = Router();

// uploads 디렉토리가 없으면 생성
fs.readdir('uploads', error => {
  if (error) {
    console.error('uploads폴더가 없어 uploads폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
});

// 이미지 업로드를 위한 미들웨어
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

// upload.array()의 'img'는 클라이언트에서 formData에 file을 append()할 때의 name(key)와 동일해야 합니다.
router.post('/upload-img', authJWT, upload.array('img', 10), (req: any, res, next) => {
  if (req.user) {
    const filePath = new Array();
    req.files.forEach((file: any) => {
      filePath.push(file.path);
    });
    return res.send({ ok: true, message: '이미지 업로드가 완료되었습니다', filePath: filePath });
  } else {
    return res.send({ ok: false, message: req.message });
  }
});

router.post('/upload', authJWT, async (req: any, res) => {
  try {
    console.log(req.user);
    if (req.user) {
      console.log(req.body);
      const { category, title, discription, price, img_list } = req.body;
      console.log({
        user_id: req.user.id,
        category: category,
        title: title,
        discription: discription,
        price: price,
        img_list: JSON.stringify(img_list),
      });
      const data = await execQuery(
        NEWPOST_QUERY.queryInsertItem({
          user_id: req.user.id,
          category: category,
          title: title,
          discription: discription,
          price: price,
          img_list: JSON.stringify(img_list),
        })
      );
      return res.send({ ok: true, message: '글쓰기 완료!' });
    } else {
      return res.send({ ok: false, message: '사용자 인증 실패' });
    }
  } catch (err) {
    return res.send({ ok: false, message: '포스팅 실패' });
  }
});

router.post('/get-post', authJWT, async (req: any, res) => {
  try {
    console.log(req.user);
    if (req.user) {
      console.log(req.body);
      const { id } = req.body;
      const result = await selectQuery(NEWPOST_QUERY.queryGetPostContents(id));
      const data: {
        user_id: number;
        category: number;
        title: string;
        discription: string;
        price: number;
        img_list: string[];
      } = result[0];
      return res.send({ ok: true, data });
    } else {
      return res.send({ ok: false, message: '사용자 인증 실패' });
    }
  } catch (err) {
    return res.send({ ok: false, message: '포스트 정보 가져오기 실패' });
  }
});

export default router;