import { Request, Response } from 'express';
import { execQuery, selectQuery } from '../db';
import ITEM_DETAIL from '../query/itemdetail';
import MAIN_QUERY from '../query/main';

//아이템 상세페이지
const actionGetItemDetail = async (req: any, res: Response) => {
  try {
    const id = req.user?.id;
    const { item_id } = req.body;

    let row = await selectQuery(ITEM_DETAIL.queryGetItem({ item_id }));
    if (!row.length) return res.status(404).send({ ok: false, message: '상품이 삭제되었어요!' });
    row = row[0];
    if (id == row.user_id) {
      row.isSeller = true;
    }
    if (!!id) {
      let bookmarked = await selectQuery(MAIN_QUERY.queryBookmarkChecked({ uid: id, item_id: [item_id] }));
      if (bookmarked.length) row.bookmarked = 1;
    }
    res.send({ ok: true, data: row, message: '상품조회 완료 !' });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const actionView = async (req: any, res: Response) => {
  try {
    const { item_id } = req.body;
    await execQuery(ITEM_DETAIL.queryViewCnt({ item_id }));
    res.send({ ok: true });
  } catch (error) {
    res.status(500);
  }
};

const actionSalesType = async (req: any, res: Response) => {
  try {
    const data = await selectQuery(ITEM_DETAIL.queryGetSalesType());
    res.send({ ok: true, data });
  } catch (error) {
    res.status(500);
  }
};
const actionUpdateItemSalesType = async (req: any, res: Response) => {
  try {
    const id = req.user?.id;
    if (!!!id) return res.status(401).send({ ok: false, message: '로그인이 필요해요!' });

    const { key, item_id } = req.body;
    const data = await execQuery(ITEM_DETAIL.queryUpdateItemSalesType({ uid: id, type_id: key, item_id }));

    res.send({ ok: true, data, message: '상품 상태가 변경되었어요 !' });
  } catch (error) {
    res.status(500).send({ ok: false, message: error.message });
  }
};

export default { actionGetItemDetail, actionView, actionSalesType, actionUpdateItemSalesType };
