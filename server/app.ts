import express from 'express';
import path from 'path';
import routers from './routers';

const port = process.env.PORT || 3000;

const app: express.Application = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'src')));
app.use(routers);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('start');
});

app.listen(port, () => {
  console.log(`여기 -> http://localhost:${port}`);
});
