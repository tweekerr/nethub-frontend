import {articlesApi, userApi} from "../../../api/userApi";
import {IContributor} from "../../../types/api/Article/IArticleLocalizationResponse";
import IUserInfoResponse from "../../../types/api/User/IUserInfoResponse";
import {articleUserRoles} from "../../../constants/article";


export async function loadArticleInfo(id: string, code: string, isLogin: boolean | null) {
  const article = await articlesApi.getArticle(id!);
  const localization = await articlesApi.getLocalization(id!, code!);
  const users = await userApi.getUsersInfo(localization.contributors.map(c => c.userId));

  if (isLogin) {
    const isSaved = await articlesApi.isArticleSavedByUser(id, code);
    const rating = await articlesApi.getRate(id);

    return {article, localization, users, isSaved, rating: rating.rating}
  }

  return {article, localization, users}
}

export function getContributorRole(contributors: IContributor[], contributorId: number) {
  const role = contributors.filter(c => c.userId === contributorId)[0].role;

  return articleUserRoles.find(r => r.en.toLowerCase() === role.toLowerCase())?.ua ?? role;
}

export function getAuthor(contributors: IContributor[], users: IUserInfoResponse[]) {
  const userId = contributors.find(a => a.role == 'author')?.userId;

  return users.find(u => u.id === userId);
}
