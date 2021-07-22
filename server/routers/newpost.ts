import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authJWT } from './middlewares';
import { execQuery, selectQuery } from '../db';
import NEWPOST_QUERY from '../query/newpost';
import NEWPOST from '../action/newpost';

const router = Router();

// uploads 디렉토리가 없으면 생성
fs.readdir('uploads', error => {
  if (error) {
    console.error('uploads폴더가 없어 uploads폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
});

// upload.array()의 'img'는 클라이언트에서 formData에 file을 append()할 때의 name(key)와 동일해야 합니다.
router.post('/upload-img', authJWT, NEWPOST.upload.array('img', 10), NEWPOST.actionUploadImg);
router.post('/upload', authJWT, NEWPOST.actionUpload);
router.post('/edit', authJWT, NEWPOST.actionEdit);
router.post('/get-post', authJWT, NEWPOST.actionGetPost);

export default router;
