export default interface IArticle {
  title: string,
  subTitle: string,
  body: string,
  tags: string[],
  originalLink: string | null
}

export interface IArticleFormErrors{
  title: boolean,
  subTitle: boolean,
  body: boolean,
  tags: boolean,
  originalLink: boolean
}
