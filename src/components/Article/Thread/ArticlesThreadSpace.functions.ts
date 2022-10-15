import {articlesApi} from "../../../api/userApi";

export async function loadLocalizations(code: string) {
  const articles = await articlesApi.getArticles(code);

  return {articles};
}
