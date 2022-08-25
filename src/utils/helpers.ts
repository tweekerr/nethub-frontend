import {api} from "../api/api";

export const saveImages = async (blobInfo: any) => {
  const id = sessionStorage.getItem('articleId');
  //TODO: check if no id
  if (!id) return;
  const fd = new FormData();
  fd.append('file', blobInfo.blob());
  const { location } = await api.addImagesToArticle(id, fd);
  console.log({ location });
  sessionStorage.removeItem('articleId');
  return location;
};
