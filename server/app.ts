import dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import router from './routers';
import { refresh } from './action/refresh';

const port = process.env.PORT || 81;

const app: Application = express();

const options = {
  origin: 'http://localhost:8080', // 접근 권한을 부여하는 도메인
  credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  optionsSuccessStatus: 200, // 응답 상태 200으로 설정
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'src')));

app.use(cors(options));
app.use('/api', router);
app.use('/refresh', refresh);

app.listen(port, () => {
  console.log(`여기 -> http://localhost:${port}`);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Not Found') as any;
  err.status = 404;
  next(err);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({
    error: err.message,
  });
});
