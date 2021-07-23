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

const queryGetItem = ({ item_id }: { item_id: number }) => `
select 
st.type sales_type , 
u.id user_id, 
u.nick_name, 
i.title, 
i.discription, 
u.location_1,
i.price,
cate.kor category,
i.img_list,
count(c.item_id) as comments, 
count(bm.item_id) bookmarks,
i.view_cnt,
${getTimeDiff}
from item i 
inner join user u on u.id = i.user_id 
left join chat c on i.id = c.item_id
left join bookmark bm on i.id= bm.item_id
left join category cate on i.category = cate.id
left join sales_type st on i.sales_type = st.id 
where i.id = ${item_id} and i.sales_type < 4 group by i.id;`;

const queryViewCnt = ({ item_id }: { item_id: number }) => `
  UPDATE item set view_cnt=view_cnt+1 where id = ${item_id};
`;

const queryGetSalesType = () => `
  SELECT * from sales_type where id != 4;
`;

const queryUpdateItemSalesType = ({ uid, item_id, type_id }: { uid: number; item_id: number; type_id: number }) => `
  UPDATE item set sales_type=${type_id} where user_id = ${uid} and id = ${item_id};
`;

export default {
  queryGetItem,
  queryViewCnt,
  queryGetSalesType,
  queryUpdateItemSalesType,
};
