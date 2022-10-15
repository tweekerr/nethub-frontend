import {DateTime} from "luxon";

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
  views: number,
  articleId: number,
  languageCode: string,
  localizationId: number,
  rate: number
}
