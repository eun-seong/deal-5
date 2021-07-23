const queryGetUserToken = (id: number) => `SELECT refreshToken as token FROM tokens WHERE u_id=${id}`;
const querySetUserToken = ({ id, token }: { id: number; token: string }) => `
    INSERT INTO tokens(u_id, refreshToken) VALUES(${id}, '${token}') 
    ON DUPLICATE KEY UPDATE u_id=${id}, refreshToken='${token}'
`;

export default { queryGetUserToken, querySetUserToken };
