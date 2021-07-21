import { getFetchTemplate, postFetchTemplate } from '../assets/utils/fetchTemplets';

export const GetItemList = (args: { [key: string]: any }) => postFetchTemplate('/api/main/item-list', args);

export const ChangeBookmark = (args: { [key: string]: any }) => postFetchTemplate('/api/main/bookmark', args);

export const GetCategory = () => getFetchTemplate('/api/main/category');

export const GetItemListByUser = () => getFetchTemplate('/api/main/item-list-user');

export const GetBookMarkList = (args: { [key: string]: any }) => postFetchTemplate('/api/main/bookmark-list', args);
