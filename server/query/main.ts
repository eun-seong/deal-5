const queryGetItemList = ({ location, uid, limit }: { location: string; uid: string; limit: number }) => `SELECT 
i.id, i.price, u.location_1, u.nick_name, i.title, i.img_list,
case 
when timestampdiff(second, i.created ,now()) < 60 then 
  concat(timestampdiff(second,  i.created,now()),'초 전')
when timestampdiff(minute,  i.created,now()) < 60 then 
  concat(timestampdiff(MINUTE, i.created, now()),'분 전')
when timestampdiff(HOUR, i.created, now()) < 24 then 
  concat(timestampdiff(HOUR, i.created, now()),'시간 전')
 when timestampdiff(DAY , i.created, now()) < 30 then 
   concat(timestampdiff(DAY , i.created, now()),'일 전')
 when timestampdiff(MONTH, i.created, now()) < 12 then 
   concat(timestampdiff(MONTH, i.created, now()),'개월 전')
 else concat(timestampdiff(YEAR, i.created, now()),'년 전')
end as created,
 i.sales_type, count(c.item_id) as comments, count(bm.item_id) bookmarks from item i 
inner join user u on i.user_id = u.id
left join chat c on i.id = c.item_id
left join bookmark bm on i.id = bm.item_id
where u.location_1 like '${location}' and i.sales_type < 4 group by i.id order by i.created desc limit ${limit}, ${
  limit + 15
};`;

const queryBookmarkChecked = ({ uid, item_id }: { uid: number; item_id: number }) => `
  SELECT count(*) as count from bookmark where user_id=${uid} and item_id=${item_id};
`;

const queryInsertBookmark = ({ uid, item_id }: { uid: number; item_id: number }) => `
  Insert into bookmark(user_id, item_id) value(${uid}, ${item_id});
`;
const queryDeleteBookmark = ({ uid, item_id }: { uid: number; item_id: number }) => `
  Delete from bookmark where user_id = ${uid} and item_id = ${item_id};
`;

const queryGetItemListByUser = ({ user_id, location }: { user_id: string; location: string }) => ``;
const queryGetItemListByCategory = ({}) => ``;
const queryGetBookMarkList = ({}) => ``;
const queryGetCategory = ({}) => ``;
const queryGetUserLocation = ({}) => ``;
const queryChangeUserLocation = ({}) => ``;

export default {
  queryGetItemList,
  queryBookmarkChecked,
  queryInsertBookmark,
  queryDeleteBookmark,
  queryGetItemListByUser,
  queryGetItemListByCategory,
  queryGetBookMarkList,
  queryGetCategory,
  queryGetUserLocation,
  queryChangeUserLocation,
};
