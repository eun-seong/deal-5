import { Router } from 'express';
import CHAT from '../action/chat';
import { authJWT } from './middlewares';

const chatRouter = Router();

chatRouter.post('/user-check', authJWT, CHAT.actionGetChatInfo);
chatRouter.post('/message', authJWT, CHAT.getChatData);
chatRouter.post('/item-chat', authJWT, CHAT.actionGetChatListByItem);
chatRouter.post('/new-room', authJWT, CHAT.makeNewChatRoom);
chatRouter.get('/chat-list', authJWT, CHAT.actionGetChatList);
chatRouter.post('/chat-remove', authJWT, CHAT.DeleteChat);

export default chatRouter;
