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

export default { queryInsertItem };
