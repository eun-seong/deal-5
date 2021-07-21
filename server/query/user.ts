const queryLogin = ({ user_id, pw }: { user_id: string; pw: string }) =>
  `select id, user_id, nick_name, location_1, location_2 from user where user_id='${user_id}' and password=SHA2('${pw}', 224)`;

const queryLogout = (id: number) => `DELETE FROM tokens WHERE u_id=${id}`;

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

const queryGetLocation = (id: number) => `SELECT location_1, location_2 FROM user WHERE id=${id}`;
// 지역 추가, 삭제, 내지역 설정
const querySetLocation = ({ id, location_1, location_2 }: { id: number; location_1: string; location_2: string }) =>
  `UPDATE user SET location_1='${location_1}', location_2='${location_2}' WHERE id=${id}`;

export default { queryLogin, queryLogout, queryRegister, queryCheckUser, queryGetLocation, querySetLocation };
