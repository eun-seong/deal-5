import { deleteFetchTemplate, getFetchTemplate, postFetchTemplate } from '../assets/utils/fetchTemplets';

export const CheckChatUser = (args: { [key: string]: any }) => postFetchTemplate('/api/chat/user-check', args);
export const GetMessage = (args: { [key: string]: any }) => postFetchTemplate('/api/chat/message', args);
export const MakeChatRoom = (args: { [key: string]: any }) => postFetchTemplate('/api/chat/new-room', args);
export const GetChatList = () => getFetchTemplate('/api/chat/chat-list');
export const DeleteChat = (args: { [key: string]: any }) => postFetchTemplate('/api/chat/chat-remove', args);
export const GetItemChatList = (args: { [key: string]: any }) => postFetchTemplate('/api/chat/item-chat', args);
