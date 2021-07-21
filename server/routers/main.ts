import { Router } from 'express';
import MAIN from '../action/main';
import { authJWT } from './middlewares';

const mainRouter = Router();

mainRouter.post('/item-list', authJWT, MAIN.actionGetItemList);
mainRouter.post('/bookmark', authJWT, MAIN.actionBookMark);
mainRouter.get('/category', authJWT, MAIN.actionGetCategory);
mainRouter.get('/item-list-user', authJWT, MAIN.actionGetItemListByUser);
mainRouter.post('/bookmark-list', authJWT, MAIN.actionGetBookMarkList);
mainRouter.post('/GetUserLocation', authJWT, MAIN.actionGetUserLocation);
mainRouter.post('/ChangeUserLocation', authJWT, MAIN.actionChangeUserLocation);
mainRouter.post('/change-location', authJWT, MAIN.actionChangeUserLocation);

export default mainRouter;
