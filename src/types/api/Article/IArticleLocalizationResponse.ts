export default interface IArticleLocalizationResponse {
  articleId: number,
  languageCode: string,
  contributors: IContributor[],
  title: string,
  description: string,
  html: string,
  status: 'draft' | 'pending' | 'published' | 'banned',
  views: number,
  rate: number
}

interface IContributor {
  role: 'author' | 'editor',
  userId: number
}
