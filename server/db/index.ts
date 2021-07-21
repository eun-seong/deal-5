import mysql from 'mysql2/promise';

const conn = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DEV_DB_HOST,
  user: process.env.DEV_DB_USER,
  port: 3306,
  password: process.env.DEV_DB_PASSWORD,
  database: process.env.DEV_DB_DATABASE,
});

export const selectQuery = async (query: string) => {
  const _conn = await conn.getConnection();
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
  const _conn = await conn.getConnection();
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

export default conn.getConnection();
