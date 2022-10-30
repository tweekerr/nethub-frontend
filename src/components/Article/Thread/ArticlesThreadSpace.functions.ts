import {articlesApi} from "../../../api/userApi";

export async function loadLocalizations(code: string) {
  return await articlesApi.getArticles(code);
}
