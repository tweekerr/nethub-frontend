import {articlesApi} from "../../../api/userApi";

export async function loadSavedArticles(){
  return await articlesApi.getSavedArticlesByUser();
}
