export default interface IArticleLocalizationResponse {
  articleId: number,
  languageCode: string,
  contributors: IContributor[],
  title: string,
  description: string,
  html: string,
  status: 'draft' | 'pending' | 'published' | 'banned',
  created: string,
  updated?: string,
  views: number,
  rate: number
}

export interface ISavedLocalization {
  userId: number,
  articleId: number,
  languageCode: string,
  title: string,
  description: string,
  savedDate: string,
  views: number,
  status: string
  rate: number,
  vote?: 'up' | 'down'
}

export interface IContributor {
  role: 'author' | 'editor',
  userId: number
}
