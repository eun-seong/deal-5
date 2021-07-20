import { getFetchTemplate, postFetchTemplate } from '../assets/utils/fetchTemplets';

const url = 'http://ec2-13-125-215-98.ap-northeast-2.compute.amazonaws.com:81';
const dev_baseURL = 'http://localhost:81';

export const GetItemList = (args: { [key: string]: any }) => postFetchTemplate(url + '/api/main/item-list', args);

export const ChangeBookmark = (args: { [key: string]: any }) => postFetchTemplate(url + '/api/main/bookmark', args);

export const GetCategory = () => getFetchTemplate(url + '/api/main/category');

export const GetItemListByUser = (args: { [key: string]: any }) =>
  postFetchTemplate(url + '/api/main/item-list-user', args);

export const GetBookMarkList = (args: { [key: string]: any }) =>
  postFetchTemplate(url + '/api/main/bookmark-list', args);
