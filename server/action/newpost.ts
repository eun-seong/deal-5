import { Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { execQuery, selectQuery } from '../db';
import NEWPOST_QUERY from '../query/newpost';

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
const actionUploadImg = (req: any, res: Response) => {
  if (req.user) {
    const filePath = new Array();
    req.files.forEach((file: any) => {
      filePath.push(file.path);
    });
    return res.send({ ok: true, message: '이미지 업로드가 완료되었습니다', filePath: filePath });
  } else {
    return res.send({ ok: false, message: req.message });
  }
};

const actionUpload = async (req: any, res: Response) => {
  try {
    if (req.user) {
      const { category, title, discription, price, img_list } = req.body;
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
      return res.send({ ok: true, message: '글쓰기 완료!', id: data.insertId });
    } else {
      return res.send({ ok: false, message: '사용자 인증 실패' });
    }
  } catch (err) {
    return res.send({ ok: false, message: '포스팅 실패' });
  }
};

const actionEdit = async (req: any, res: Response) => {
  console.log(req.body);
  try {
    if (req.user) {
      const { id, category, title, discription, price, img_list, deletedList } = req.body;

      // 글 수정하기에서 서버에 있던 사진을 삭제할 경우 파일 제거
      if (deletedList.length !== 0) {
        deletedList.forEach((imgPath: string) => {
          const delIndex = img_list.indexOf(imgPath);
          img_list.splice(delIndex, 1);
          fs.unlink(imgPath, err => {
            console.log(err);
          });
        });
      }

      const data = await execQuery(
        NEWPOST_QUERY.queryUpdateItem({
          id: id,
          category: category,
          title: title,
          discription: discription,
          price: price,
          img_list: JSON.stringify(img_list),
        })
      );
      return res.send({ ok: true, message: '포스트 수정 완료!', id: id });
    } else {
      return res.send({ ok: false, message: '사용자 인증 실패' });
    }
  } catch (err) {
    return res.send({ ok: false, message: '포스트 수정 실패' });
  }
};

const actionGetPost = async (req: any, res: Response) => {
  try {
    if (req.user) {
      const { id } = req.body;
      const result = await selectQuery(NEWPOST_QUERY.queryGetPostContents(id));
      const data: {
        user_id: number;
        category: number;
        title: string;
        discription: string;
        price: number;
        img_list: string[];
        deletedList: string[];
      } = result[0];
      return res.send({ ok: true, data });
    } else {
      return res.send({ ok: false, message: '사용자 인증 실패' });
    }
  } catch (err) {
    return res.send({ ok: false, message: '포스트 정보 가져오기 실패' });
  }
};

export default { upload, actionUploadImg, actionUpload, actionEdit, actionGetPost };
