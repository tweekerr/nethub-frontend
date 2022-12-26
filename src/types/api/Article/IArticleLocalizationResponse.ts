export default interface IArticleLocalizationResponse {
  articleId: number;
  languageCode: string;
  contributors: IContributor[];
  title: string;
  description: string;
  html: string;
  status: 'draft' | 'pending' | 'published' | 'banned';
  created: string;
  updated?: string;
  published?: string;
  banned?: string;
  views: number;
  rate: number;
  isSaved: boolean;
  savedDate?: string;
  vote?: 'Up' | 'Down';
}

export interface IContributor {
  role: 'author' | 'editor';
  userId: number;
}
