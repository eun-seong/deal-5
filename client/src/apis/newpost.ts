import { postFetchTemplate, postFileFetchTemplate } from '../assets/utils/fetchTemplets';

const urls: { [key: string]: string } = {
  uploadImg: '/upload-img',
  upload: '/upload',
};

const newpostApiUrl = (url: string) => `/api/newpost${url}`;
export const apiImageUpload = (files: any) => postFileFetchTemplate(newpostApiUrl(urls.uploadImg), files); // 이미지 업로드 api
export const apiNewPost = (args: { [key: string]: string }) => postFetchTemplate(newpostApiUrl(urls.upload), args); // 이미지 제외 컨텐츠 업로드 api
