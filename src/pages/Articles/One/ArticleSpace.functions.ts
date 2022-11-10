import {articlesApi, userApi} from "../../../api/api";
import {IContributor} from "../../../types/api/Article/IArticleLocalizationResponse";
import IUserInfoResponse from "../../../types/api/User/IUserInfoResponse";
import {articleUserRoles} from "../../../constants/article";


export async function getArticle(id: string) {
  return await articlesApi.getArticle(id);
}

export async function getLocalization(id: string, code: string) {
  return await articlesApi.getLocalization(id, code)
}

export async function getArticleContributors(contributors: IContributor[]) {
  const ids = contributors.map((contributor: IContributor) => contributor.userId);
  return await userApi.getUsersInfo(ids);
}

export async function getArticleActions(id: string, code: string) {
  const [isSaved, rate] = await Promise.all([
    articlesApi.isArticleSavedByUser(id, code),
    articlesApi.getRate(id)
  ]);
  return {isSaved, rate: rate.rating};
}

export function getContributorRole(contributors: IContributor[], contributorId: number) {
  const role = contributors.filter(c => c.userId === contributorId)[0].role;

  return articleUserRoles.find(r => r.en.toLowerCase() === role.toLowerCase())?.ua ?? role;
}

export function getAuthor(contributors: IContributor[], users: IUserInfoResponse[]) {
  const userId = contributors.find(a => a.role == 'author')?.userId;

  return users.find(u => u.id === userId);
}
