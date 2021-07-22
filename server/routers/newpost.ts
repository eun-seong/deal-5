import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

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
router.post('/upload-img', upload.array('img', 10), (req, res, next) => {
  console.log(req);
  return res.send({ ok: true, message: '이미지 업로드가 완료되었습니다' });
});

export default router;
