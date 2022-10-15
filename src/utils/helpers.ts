import {articlesApi} from "../api/userApi";

export const saveImages = async (blobInfo: any) => {
  const id = sessionStorage.getItem('articleId');
  //TODO: check if no id
  //TODO: Test Mirroring 2
  if (!id) return;
  const fd = new FormData();
  fd.append('file', blobInfo.blob());
  const { location } = await articlesApi.addImagesToArticle(id, fd);
  console.log({ location });
  sessionStorage.removeItem('articleId');
  return location;
};
