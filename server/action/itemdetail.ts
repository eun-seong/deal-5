import { Request, Response } from 'express';
import { execQuery, selectQuery } from '../db';
import ITEM_DETAIL from '../query/itemdetail';
import MAIN_QUERY from '../query/main';

//기본 아이템 목록 리스트
const actionGetItemDetail = async (req: any, res: Response) => {
  try {
    const id = req.user?.id;
    const { item_id } = req.body;

    let row = await selectQuery(ITEM_DETAIL.queryGetItem({ item_id }));
    row = row[0];
    if (id == row.user_id) {
      row.isSeller = true;
    }
    if (!!id) {
      let bookmarked = await selectQuery(MAIN_QUERY.queryBookmarkChecked({ uid: id, item_id: [item_id] }));
      if (bookmarked.length) row.bookmarked = 1;
    }

    res.send({ ok: true, data: row });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const actionView = async (req: any, res: Response) => {
  try {
    const { item_id } = req.body;
    const error = await execQuery(ITEM_DETAIL.queryViewCnt({ item_id }));
    res.send({ ok: true, message: error });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

export default { actionGetItemDetail, actionView };
