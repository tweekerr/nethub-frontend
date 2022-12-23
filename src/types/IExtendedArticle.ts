import {ContentStatus} from "./ContentStatus";

export default interface IExtendedArticle {
  // [key: string]: any,
  userId?: number,
  isSaved?: boolean,
  savedDate?: string,
  vote?: 'up' | 'down' | 'none',
  title: string,
  description: string,
  html: string,
  created: string,
  updated?: string
  published?: string
  banned?: string
  views: number,
  articleId: number,
  languageCode: string,
  status: ContentStatus,
  localizationId: number,
  rate: number
}
