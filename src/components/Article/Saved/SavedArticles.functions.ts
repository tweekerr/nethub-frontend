import {articlesApi} from "../../../api/userApi";

export async function loadSavedArticles(){
  const savedArticles = await articlesApi.getSavedArticlesByUser();

  return {articles: savedArticles}
}
