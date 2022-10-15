export default interface ILocalization {
  title: string,
  description: string,
  html: string,
  tags: string[],
  originalLink: string | null
}

export interface IArticleFormErrors{
  title: boolean,
  description: boolean,
  html: boolean,
  tags: boolean,
  originalLink: boolean
}
