const queryLogin = ({ user_id, pw }: { user_id: string; pw: string }) =>
  `select id, user_id, nick_name, location_1 from user where user_id='${user_id}' and password=SHA2('${pw}', 224)`;

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
  INSERT IGNORE INTO user(user_id, password, nick_name, location_1) VALUES('${user_id}', SHA2('${pw}', 224) , '${nickname}', '${location}');`;

export default { queryLogin, queryRegister, queryCheckUser };
