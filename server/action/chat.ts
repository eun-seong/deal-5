import { Request, Response } from 'express';
import { execQuery, selectQuery } from '../db';
import CHAT_QUERY from '../query/chat';

//채팅 목록 가져오기
const actionGetChatList = async (req: any, res: Response) => {
  try {
    const id = req.user?.id;
    if (!!!id) return res.status(401).send({ ok: false, message: '로그인이 팔요합니다 !' });

    const sellerList = await selectQuery(CHAT_QUERY.queryGetChatRoomBySeller({ uid: id }));
    const buyerList = await selectQuery(CHAT_QUERY.queryGetChatRoomByBuyer({ uid: id }));
    const chatRooms = [...sellerList, ...buyerList];

    // c.id cid, i.id item_id, u.id user_id, u.nick_name, c.SellerNoReadCnt
    // c.id, c.item_id, m.message, ${getTimeDiff}
    const rows = [];
    for (let data of chatRooms) {
      const message = await selectQuery(CHAT_QUERY.queryGetChatLastMessage({ cid: data.cid }));
      rows.push({
        ...data,
        ...message[0],
      });
    }

    res.send({ ok: true, data: rows, message: rows.length ? '' : '채팅방이 없습니다' });
  } catch (error) {
    res.status(500).send({ ok: false, message: error.message });
  }
};

const actionGetChatInfo = async (req: any, res: Response) => {
  try {
    const id = req.user?.id;
    if (!!!id) return res.status(401).send({ ok: false, message: '권한이 없어요!' });

    const { chat_id } = req.body;
    const row = await selectQuery(CHAT_QUERY.queryGetRoomsUser({ cid: chat_id }));

    console.log(row);
    const { buyer_id, seller_id, item_id, title, price, sales_type, buyer_nic, seller_nic, img_list } = row[0];
    if (id !== buyer_id && id !== seller_id) res.send({ ok: false, message: '권한이 없어요!' });

    let type = 'seller';
    let nic = buyer_nic;
    if (buyer_id == id) {
      type = 'buyer';
      nic = seller_nic;
    }

    res.send({ ok: true, data: { buyer_id, seller_id, type, item_id, nic, title, price, sales_type, img_list } });
  } catch (error) {
    res.status(500).send({ ok: false, message: error.message });
  }
};

const getChatData = async (req: any, res: Response) => {
  try {
    const uid = req.user?.id;
    if (!!!uid) return res.status(401).send({ ok: false, message: '권한이 없어요!' });
    const { chat_id, lastId } = req.body;

    const data = await selectQuery(CHAT_QUERY.getChatData({ cid: chat_id, lastId }));
    data.forEach((a: any, i: number) => {
      a.user_id === uid ? (data[i].type = 'me') : (data[i].type = 'yu');
    });

    res.send({ ok: true, data: data.reverse() });
  } catch (error) {
    res.status(500).send({ ok: false, message: error.message });
  }
};

const makeNewChatRoom = async (req: any, res: Response) => {
  try {
    const uid = req.user?.id;
    if (!!!uid) return res.status(401).send({ ok: false, message: '권한이 없어요!' });
    const { item_id } = req.body;

    const room = await selectQuery(CHAT_QUERY.checkChatRoom({ item_id, uid }));

    if (room.length) {
      return res.send({ ok: true, message: '채팅방이 있어요!', data: room[0].id });
    }

    await execQuery(CHAT_QUERY.makeNewRoom({ item_id, uid }));
    const room2 = await selectQuery(CHAT_QUERY.checkChatRoom({ item_id, uid }));

    res.send({ ok: true, message: '채팅방을 만들었습니다.', data: room2[0].id });
  } catch (error) {
    res.status(500).send({ ok: false, message: error.message });
  }
};

const AddBuyerNoReadCnt = async (chatId: number) => {
  try {
    await execQuery(CHAT_QUERY.queryAddBuyerNoReadCnt({ cid: chatId }));
  } catch (error) {
    console.error(error);
  }
};

const AddSellerNoReadCnt = async (chatId: number) => {
  try {
    await execQuery(CHAT_QUERY.queryAddSellerNoReadCnt({ cid: chatId }));
  } catch (error) {
    console.error(error);
  }
};

const InitNoReadCnt = async ({ type, chatId }: { type: string; chatId: number }) => {
  try {
    let _type = 'BuyerNoReadCnt';
    if (type == 'seller') {
      _type = 'SellerNoReadCnt';
    }
    const d = await execQuery(CHAT_QUERY.queryInitNoReadCnt({ type: _type, cid: chatId }));
    console.log(d, _type, chatId);
  } catch (error) {
    console.error(error);
  }
};

const SaveMsg = async ({ user, room, data }: { user: number; room: number; data: string }) => {
  try {
    await execQuery(CHAT_QUERY.querySaveMsg({ user, room, data }));
  } catch (error) {
    console.error(error);
  }
};

const DeleteChat = async (req: any, res: Response) => {
  try {
    const id = req.user?.id;
    if (!!!id) return res.status(401).send({ ok: false, message: '로그인이 팔요합니다 !' });
    const { cid } = req.body;
    await execQuery(CHAT_QUERY.exitChatRoom({ cid: cid }));

    res.send({ ok: true, message: '채팅방이 삭제되었어요' });
  } catch (error) {
    console.log(error);
  }
};

export default {
  actionGetChatList,
  actionGetChatInfo,
  AddBuyerNoReadCnt,
  AddSellerNoReadCnt,
  makeNewChatRoom,
  InitNoReadCnt,
  DeleteChat,
  SaveMsg,
  getChatData,
};
