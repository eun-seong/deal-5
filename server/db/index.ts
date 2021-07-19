import mysql from 'mysql2/promise';

const conn = async () => {
  const connection = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: 3306,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  return await connection.getConnection();
};

export const selectQuery = async (query: string) => {
  const _conn = await conn();
  try {
    const [row, _] = await _conn.query(query);
    return JSON.stringify(row);
  } catch (err) {
    throw err;
  } finally {
    _conn.release();
  }
};

export const execQuery = async (query: string) => {
  const _conn = await conn();
  try {
    await _conn.beginTransaction();
    const [row, _] = await _conn.query(query);
    await _conn.commit();
    return JSON.stringify(row);
  } catch (err) {
    await _conn.rollback();
    throw err;
  } finally {
    _conn.release();
  }
};

export default conn();
