import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import db from './db';

const port = process.env.PORT || 81;

const app: express.Application = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'src')));
// app.use(routers);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('start');

  db.query('select * from category', function (err: any, rows: any, _: any) {
    if (err) throw err;
    console.log(rows);
  });
});

app.listen(port, () => {
  console.log(`여기 -> http://localhost:${port}`);
});
