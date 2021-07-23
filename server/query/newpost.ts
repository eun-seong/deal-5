const queryInsertItem = ({
  user_id,
  category,
  title,
  discription,
  price,
  img_list,
}: {
  user_id: number;
  category: string;
  title: string;
  discription: string;
  price: number;
  img_list: string;
}) =>
  `INSERT INTO item(user_id, category, sales_type, title, discription, view_cnt, price, img_list) 
  VALUES(${user_id}, ${category}, 1, '${title}', '${discription}', 0, ${price}, '${img_list}');`;

const queryUpdateItem = ({
  id,
  category,
  title,
  discription,
  price,
  img_list,
}: {
  id: number;
  category: string;
  title: string;
  discription: string;
  price: number;
  img_list: string;
}) => `
  UPDATE item 
  SET category='${category}', title='${title}', discription='${discription}', 
  price=${price}, img_list='${img_list}'
  WHERE id=${id};
`;

const queryGetPostContents = (id: number) =>
  `SELECT user_id, category, title, discription, price, img_list FROM item WHERE id=${id};`;

export default { queryInsertItem, queryGetPostContents, queryUpdateItem };
