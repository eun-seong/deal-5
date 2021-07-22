const getTimeDiff = `case 
when timestampdiff(second, m.created ,now()) < 60 then 
  concat(timestampdiff(second,  m.created,now()),'초 전')
when timestampdiff(minute,  m.created,now()) < 60 then 
  concat(timestampdiff(MINUTE, m.created, now()),'분 전')
when timestampdiff(HOUR, m.created, now()) < 24 then 
  concat(timestampdiff(HOUR, m.created, now()),'시간 전')
when timestampdiff(DAY , m.created, now()) < 30 then 
  concat(timestampdiff(DAY , m.created, now()),'일 전')
when timestampdiff(MONTH, m.created, now()) < 12 then 
  concat(timestampdiff(MONTH, m.created, now()),'개월 전')
else concat(timestampdiff(YEAR, m.created, now()),'년 전')
end as created`;

// -- ;검색 유저가 판매자일 경우 구매자 닉네임
const queryGetChatRoomBySeller = ({ uid }: { uid: number }) => `
SELECT c.id cid, i.id item_id, u.id user_id, u.nick_name, c.SellerNoReadCnt noReadCnt from 
item i join chat c on i.id = c.item_id 
left join user u on c.buyer = u.id
where i.user_id = ${uid};
`;

// -- ;검색 유저가 구매입장일 경우 판매자 닉네임
const queryGetChatRoomByBuyer = ({ uid }: { uid: number }) => `
SELECT c.id cid, i.id item_id, u.id user_id, u.nick_name, c.BuyerNoReadCnt noReadCnt from
item i join chat c on i.id = c.item_id
left join user u on i.user_id = u.id
where c.buyer=${uid};
`;

// -- 채팅방 마지막 메세지 가져오기
const queryGetChatLastMessage = ({ cid }: { cid: number }) => `
SELECT c.id cid, c.item_id item_id, m.message, ${getTimeDiff}
from chat c left join messages m on c.id = m.chat_id
where c.id = ${cid}
order BY m.created desc limit 1;
`;

const queryGetRoomsUser = ({ cid }: { cid: number }) => `
  SELECT u.id buyer_id, i.user_id seller_id, i.id item_id, 
  i.title, FORMAT(i.price, 0) price, i.sales_type, i.img_list,
  u.nick_name buyer_nic, u2.nick_name seller_nic from chat c 
  inner join user u on u.id = c.buyer
  left join item i on i.id = c.item_id
  left join user u2 on i.user_id = u2.id
  where c.id = ${cid};
`;

const queryAddBuyerNoReadCnt = ({ cid }: { cid: number }) => `
  UPDATE chat set BuyerNoReadCnt=BuyerNoReadCnt+1 where id=${cid};
`;
const queryAddSellerNoReadCnt = ({ cid }: { cid: number }) => `
  UPDATE chat set SellerNoReadCnt=SellerNoReadCnt+1 where id=${cid};
`;

const queryInitNoReadCnt = ({ type, cid }: { type: string; cid: number }) => `
  UPDATE chat set ${type}=0 where id=${cid};
`;

const querySaveMsg = ({ user, room, data }: { user: number; room: number; data: string }) => `
  INSERT INTO messages(chat_id,user_id,message) values (${room}, ${user}, '${data}');
`;

const getChatData = ({ cid, lastId }: { cid: number; lastId: number }) => `
  SELECT * FROM messages where chat_id=${cid} and id < ${lastId} order by created desc limit 100;
`;

const getLastMessageDataId = ({ cid }: { cid: number }) => `
  SELECT * from message where chat_id=${cid} order by created desc limit 1;
`;

const makeNewRoom = ({ item_id, uid }: { item_id: number; uid: number }) => `
  INSERT INTO chat (item_id, buyer) values(${item_id}, ${uid})
`;

const checkChatRoom = ({ item_id, uid }: { item_id: number; uid: number }) => `
  SELECT id from chat where item_id=${item_id} and buyer=${uid};
`;

const exitChatRoom = ({ cid }: { cid: number }) => `
  DELETE from chat where id=${cid};
`;

export default {
  queryGetChatRoomBySeller,
  queryGetChatRoomByBuyer,
  queryGetChatLastMessage,
  queryGetRoomsUser,
  queryAddBuyerNoReadCnt,
  queryAddSellerNoReadCnt,
  queryInitNoReadCnt,
  querySaveMsg,
  checkChatRoom,
  getChatData,
  makeNewRoom,
  exitChatRoom,
  getLastMessageDataId,
};
