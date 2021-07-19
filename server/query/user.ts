const queryLogin = ({ user_id, pw }: { user_id: string; pw: string }) =>
  `select * from user where user_id='${user_id}' and password='${pw}'`;

const queryCheckUser = ({ user_id }: { user_id: string }) =>
  `select count(*) as count from user where user_id='${user_id}'`;

const queryRegister = ({
  user_id,
  pw,
  nickname,
  location,
}: {
  user_id: string;
  pw: string;
  nickname: string;
  location: string;
}) => `
  INSERT INTO user(user_id, password, nick_name, location_1) VALUES('${user_id}', '${pw}', '${nickname}', '${location}');`;

export default { queryLogin, queryRegister, queryCheckUser };
