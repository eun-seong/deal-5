import { getFetchTemplate, postFetchTemplate } from '../assets/utils/fetchTemplets';

export const GetItem = (args: { [key: string]: any }) => postFetchTemplate('/api/itemdetail/item', args);

export const UpdateViewCnt = (args: { [key: string]: any }) => postFetchTemplate('/api/itemdetail/view', args);
export const GetSalesType = () => getFetchTemplate('/api/itemdetail/sales-type');
export const UpdateSalesItemState = (args: { [key: string]: any }) =>
  postFetchTemplate('/api/itemdetail/item-sales-type', args);
