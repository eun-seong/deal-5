import { Request, Response } from 'express';
import { execQuery, selectQuery } from '../db';
import MAIN_QUERY from '../query/main';

const actionGetItemList = async (req: Request, res: Response) => {
  try {
    const { location, uid, limit } = req.body;
    let rows = JSON.parse(await selectQuery(MAIN_QUERY.queryGetItemList({ location, uid, limit })));

    for (const row of rows) {
      let bookmarked: any = await selectQuery(MAIN_QUERY.queryBookmarkChecked({ uid, item_id: row.id }));
      bookmarked = JSON.parse(bookmarked);
      row.bookmarked = bookmarked[0].count;
    }
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const actionBookMark = async (req: Request, res: Response) => {
  try {
    const { item_id, uid, bookmarked } = req.body;

    if (bookmarked) {
      await execQuery(MAIN_QUERY.queryDeleteBookmark({ uid, item_id }));
    } else {
      await execQuery(MAIN_QUERY.queryInsertBookmark({ uid, item_id }));
    }
    res.send({ message: bookmarked ? '북마크가 삭제되었습니다.' : '북마크가 추가되었습니다' });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const actionGetItemListByUser = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;
    let rows = JSON.parse(await selectQuery(MAIN_QUERY.queryGetItemListByUser({ uid })));

    for (const row of rows) {
      let bookmarked: any = await selectQuery(MAIN_QUERY.queryBookmarkChecked({ uid, item_id: row.id }));
      bookmarked = JSON.parse(bookmarked);
      row.bookmarked = bookmarked[0].count;
    }
    res.send(rows);
  } catch (error) {
    res.status(500).send({ ok: false, error: error, message: error.message });
  }
};
const actionGetItemListByCategory = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500);
  }
};
const actionGetBookMarkList = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500);
  }
};
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
    res.status(500);
  }
};
const actionChangeUserLocation = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500);
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
