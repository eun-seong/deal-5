const getTimeDiff = `case 
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
end as created`;

const queryGetItemList = ({
  category,
  location,
  limit,
}: {
  category: number;
  location: string;
  limit: number;
}) => `SELECT 
i.id, concat(FORMAT(i.price,0),'원') price, u.location_1, u.nick_name, i.title, i.img_list,
${getTimeDiff},
 i.sales_type, count(c.item_id) as comments, count(bm.item_id) bookmarks from item i 
inner join user u on i.user_id = u.id
left join chat c on i.id = c.item_id
left join bookmark bm on i.id = bm.item_id
where u.location_1 like '${location || '쥄실'}' and ${
  category ? `i.category=${category} and ` : ''
} i.sales_type < 4 group by i.id order by i.created desc limit ${limit}, ${limit + 14};`;

const queryBookmarkChecked = ({ uid, item_id }: { uid: any; item_id: number[] }) => `
  SELECT item_id from bookmark where user_id='${uid || -1}' and item_id in(${item_id.join(',')});
`;

const queryInsertBookmark = ({ uid, item_id }: { uid: number; item_id: number }) => `
  Insert into bookmark(user_id, item_id) value(${uid}, ${item_id});
`;
const queryDeleteBookmark = ({ uid, item_id }: { uid: number; item_id: number }) => `
  Delete from bookmark where user_id = ${uid} and item_id = ${item_id};
`;

const queryGetItemListByUser = ({ uid }: { uid: any }) => `
SELECT i.id, concat(FORMAT(i.price,0),'원') price, u.location_1, i.title, i.img_list,
${getTimeDiff},
i.sales_type, count(c.item_id) as comments, count(bm.item_id) bookmarks from item i 
inner join user u on i.user_id = u.id
left join chat c on i.id = c.item_id
left join bookmark bm on i.id = bm.item_id
where u.id=${uid} and i.sales_type < 4 GROUP by i.id order by i.created desc`;

const queryGetCategory = () => `SELECT id, kor from category;`;

const queryGetBookMarkList = ({ uid }: { uid: number }) => `
  SELECT i.id, concat(FORMAT(i.price,0),'원') price, u.location_1, i.title, i.img_list, ${getTimeDiff}, i.sales_type, count(c.item_id) comments, count(bm.item_id) bookmarks
  from item i inner join user u on i.user_id = u.id
    left join chat c on i.id = c.item_id
    left join bookmark bm on i.id = bm.item_id
  where bm.user_id=${uid} and i.sales_type < 4 GROUP by i.id order by i.created desc`;

const queryGetUserLocation = ({ uid }: { uid: number }) => `
  SELECT location_1, location_2 from user where id= ${uid};
`;

const queryChangeUserLocation = ({ uid, location_1 }: { uid: number; location_1: string }) => `
  UPDATE user set location_1 = location_2, location_2 = '${location_1}' where id = ${uid};
`;

const queryItemDelete = ({ uid, item_id }: { uid: number; item_id: number }) => `
  UPDATE item set sales_type='4' where id = ${item_id} and user_id = ${uid};
`;

export default {
  queryGetItemList,
  queryBookmarkChecked,
  queryInsertBookmark,
  queryDeleteBookmark,
  queryGetItemListByUser,
  queryGetBookMarkList,
  queryGetCategory,
  queryGetUserLocation,
  queryItemDelete,
  queryChangeUserLocation,
};
