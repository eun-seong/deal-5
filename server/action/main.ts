import { Request, Response } from 'express';
import { execQuery, selectQuery } from '../db';
import MAIN_QUERY from '../query/main';

//기본 아이템 목록 리스트
const actionGetItemList = async (req: any, res: Response) => {
  try {
    const id = req.user?.id;
    const { category, location, limit } = req.body;

    let rows = await selectQuery(MAIN_QUERY.queryGetItemList({ category, location, limit }));
    const itemIDs = rows.map((a: any) => a.id);
    if (itemIDs.length) {
      let bmList: any = await selectQuery(MAIN_QUERY.queryBookmarkChecked({ uid: id, item_id: itemIDs }));
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
const actionBookMark = async (req: any, res: Response) => {
  try {
    const id = req.user?.id;
    if (!!!id) return res.status(401).send({ ok: false, message: '로그인이 필요해요!' });
    const { item_id, bookmarked } = req.body;

    if (bookmarked) {
      await execQuery(MAIN_QUERY.queryDeleteBookmark({ uid: id, item_id }));
    } else {
      await execQuery(MAIN_QUERY.queryInsertBookmark({ uid: id, item_id }));
    }
    res.send({ ok: true, message: bookmarked ? '북마크가 삭제되었었어요 !' : '북마크가 추가되었어요 !' });
  } catch (error) {
    res.status(500).send({ ok: false, message: error.message });
  }
};

// 판매목록 유저별 아이템 리스트
const actionGetItemListByUser = async (req: any, res: Response) => {
  try {
    const id = req.user?.id;
    if (!!!id) return res.status(401).send({ ok: false, message: '로그인이 필요해요!' });
    let rows = await selectQuery(MAIN_QUERY.queryGetItemListByUser({ uid: id }));

    const itemIDs = rows.map((a: any) => a.id);
    if (itemIDs.length) {
      let bmList: any = await selectQuery(MAIN_QUERY.queryBookmarkChecked({ uid: id, item_id: itemIDs }));
      bmList.forEach((a: any) => {
        rows[itemIDs.indexOf(a.item_id)].bookmarked = 1;
      });
    }
    const message = rows.length ? '조회가 완료되었습니다.' : '상품을 등록하여 판매를 시작해보세요!';
    res.send({ ok: true, data: rows, message });
  } catch (error) {
    res.status(500).send({ ok: false, error: error, message: error.message });
  }
};

// 북마크 아이템 리스트
const actionGetBookMarkList = async (req: any, res: Response) => {
  try {
    const id = req.user?.id;
    if (!!!id) return res.status(401).send({ ok: false, message: '로그인이 필요해요!' });

    let rows = await selectQuery(MAIN_QUERY.queryGetBookMarkList({ uid: id }));

    const itemIDs = rows.map((a: any) => a.id);
    if (itemIDs.length) {
      let bmList: any = await selectQuery(MAIN_QUERY.queryBookmarkChecked({ uid: id, item_id: itemIDs }));
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
const actionGetCategory = async (req: any, res: Response) => {
  try {
    const rows = await selectQuery(MAIN_QUERY.queryGetCategory());
    res.send({ ok: true, data: rows });
  } catch (error) {
    res.status(500).send({ ok: false, error: error, message: '카테고리 받아오기 오류' });
  }
};
const actionGetUserLocation = async (req: any, res: Response) => {
  try {
    const id = req.user?.id;
    if (!!!id) return res.status(401).send({ ok: false, message: '로그인이 필요해요!' });

    const data = await selectQuery(MAIN_QUERY.queryGetUserLocation({ uid: id }));

    res.send({ ok: true, data: data[0] });
  } catch (error) {
    res.status(500).send({ ok: false, message: error.message });
  }
};

//메인화면 location 1,2 변경
const actionChangeUserLocation = async (req: any, res: Response) => {
  try {
    const id = req.user?.id;
    if (!!!id) return res.status(401).send({ ok: false, message: '로그인이 필요해요!' });

    const { location } = req.body;
    const data = await selectQuery(MAIN_QUERY.queryGetUserLocation({ uid: id }));
    const { location_1, location_2 } = data[0];

    if (location != location_2) {
      return res.status(400).send({ ok: false, message: '위치정보가 다릅니다!' });
    }

    await execQuery(MAIN_QUERY.queryChangeUserLocation({ uid: id, location_1 }));

    res.send({
      ok: true,
      message: '장소가 바뀌었습니다 !',
      location: { location_1: location_2, location_2: location_1 },
    });
  } catch (error) {
    res.status(500).send({ ok: false, message: error.message });
  }
};

const actionDeleteItem = async (req: any, res: Response<any, Record<string, any>>) => {
  try {
    const id = req.user?.id;
    if (!!!id) return res.status(401).send({ ok: false, message: '권한이 없어요!' });
    const { item_id } = req.body;
    await execQuery(MAIN_QUERY.queryItemDelete({ uid: id, item_id }));

    res.send({ ok: true, message: '아이템이 삭제되었어요!' });
  } catch (error) {
    res.status(500).send({ ok: false, message: error.message });
  }
};

export default {
  actionGetItemList,
  actionBookMark,
  actionGetItemListByUser,
  actionGetBookMarkList,
  actionGetCategory,
  actionDeleteItem,
  actionGetUserLocation,
  actionChangeUserLocation,
};
