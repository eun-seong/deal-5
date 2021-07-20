import { Request, Response } from 'express';
import { verify } from './auth';
import { execQuery, selectQuery } from '../db';
import MAIN_QUERY from '../query/main';

const verifyUser = (req: Request) => {
  const _user = verify(req.headers.authorization as string);

  return _user.id || undefined;
};

//기본 아이템 목록 리스트
const actionGetItemList = async (req: Request, res: Response) => {
  try {
    const uid = verifyUser(req);
    const { location, limit } = req.body;
    let rows = JSON.parse(await selectQuery(MAIN_QUERY.queryGetItemList({ location, limit })));

    const itemIDs = rows.map((a: any) => a.id);
    if (itemIDs.length) {
      let bmList: any = await selectQuery(MAIN_QUERY.queryBookmarkChecked({ uid, item_id: itemIDs }));
      bmList = JSON.parse(bmList);
      bmList.forEach((a: any) => {
        rows[itemIDs.indexOf(a.item_id)].bookmarked = 1;
      });
    }
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

// 북마크 추가삭제
const actionBookMark = async (req: Request, res: Response) => {
  try {
    const uid = verifyUser(req);
    if (!!!uid) return res.status(401).send({ ok: false, message: '로그인이 필요해요!' });
    const { item_id, bookmarked } = req.body;

    if (bookmarked) {
      await execQuery(MAIN_QUERY.queryDeleteBookmark({ uid, item_id }));
    } else {
      await execQuery(MAIN_QUERY.queryInsertBookmark({ uid, item_id }));
    }
    res.send({ ok: true, message: bookmarked ? '북마크가 삭제되었습니다.' : '북마크가 추가되었습니다' });
  } catch (error) {
    res.status(500).send({ ok: false, message: error.message });
  }
};

// 판매목록 유저별 아이템 리스트
const actionGetItemListByUser = async (req: Request, res: Response) => {
  try {
    const uid = verifyUser(req);
    if (!!!uid) return res.status(401).send({ ok: false, message: '로그인이 필요해요!' });

    let rows = JSON.parse(await selectQuery(MAIN_QUERY.queryGetItemListByUser({ uid })));

    const itemIDs = rows.map((a: any) => a.id);
    if (itemIDs.length) {
      let bmList: any = await selectQuery(MAIN_QUERY.queryBookmarkChecked({ uid, item_id: itemIDs }));
      bmList = JSON.parse(bmList);
      bmList.forEach((a: any) => {
        rows[itemIDs.indexOf(a.item_id)].bookmarked = 1;
      });
    }
    res.send({ ok: true, data: rows, message: '상품을 등록하여 판매를 시작해보세요!' });
  } catch (error) {
    res.status(500).send({ ok: false, error: error, message: error.message });
  }
};
const actionGetItemListByCategory = async (req: Request, res: Response) => {
  try {
    const uid = verifyUser(req);

    let rows = JSON.parse(await selectQuery(MAIN_QUERY.queryGetItemListByUser({ uid })));
  } catch (error) {
    res.status(500).send({ ok: false, message: error.message });
  }
};

// 북마크 아이템 리스트
const actionGetBookMarkList = async (req: Request, res: Response) => {
  try {
    const uid = verifyUser(req);
    if (!!!uid) return res.status(401).send({ ok: false, message: '로그인이 필요해요!' });

    let rows = JSON.parse(await selectQuery(MAIN_QUERY.queryGetBookMarkList({ uid })));

    const itemIDs = rows.map((a: any) => a.id);
    if (itemIDs.length) {
      let bmList: any = await selectQuery(MAIN_QUERY.queryBookmarkChecked({ uid, item_id: itemIDs }));
      bmList = JSON.parse(bmList);
      bmList.forEach((a: any) => {
        rows[itemIDs.indexOf(a.item_id)].bookmarked = 1;
      });
    }

    res.send({ ok: true, data: rows, message: '하트를 클릭하여 관심목록을 추가해보세요!' });
  } catch (error) {
    res.status(500).send({ ok: false, error: error, message: error.message });
  }
};

//카테고리 리스트
const actionGetCategory = async (req: Request, res: Response) => {
  try {
    const rows = await selectQuery(MAIN_QUERY.queryGetCategory());
    res.send({ ok: true, data: JSON.parse(rows) });
  } catch (error) {
    res.status(500).send({ ok: false, error: error, message: '카테고리 받아오기 오류' });
  }
};
const actionGetUserLocation = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).send({ ok: false, message: error.message });
  }
};
const actionChangeUserLocation = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).send({ ok: false, message: error.message });
  }
};

export default {
  actionGetItemList,
  actionBookMark,
  actionGetItemListByUser,
  actionGetItemListByCategory,
  actionGetBookMarkList,
  actionGetCategory,
  actionGetUserLocation,
  actionChangeUserLocation,
};
