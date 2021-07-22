import { postFetchTemplate, postFileFetchTemplate, deleteFetchTemplate } from '../assets/utils/fetchTemplets';

const urls: { [key: string]: string } = {
  uploadImg: '/upload-img',
  upload: '/upload',
  getPost: '/get-post',
};

const newpostApiUrl = (url: string) => `/api/newpost${url}`;
export const apiImageUpload = (files: any) => postFileFetchTemplate(newpostApiUrl(urls.uploadImg), files); // 이미지 업로드 api
// export const apiNewPost = (args: { [key: string]: any }) => deleteFetchTemplate(newpostApiUrl(urls.upload), args); // 이미지 제외 컨텐츠 업로드 api
export const apiNewPost = (args: { [key: string]: any }) => postFetchTemplate('/api/user/upload', args); // 이미지 제외 컨텐츠 업로드 api
export const apiGetPost = (args: { [key: string]: any }) => postFetchTemplate(newpostApiUrl(urls.getPost), args); // 포스트 수정
