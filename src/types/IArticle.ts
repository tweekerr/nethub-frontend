export default interface IArticle {
  title: string,
  subTitle: string,
  body: string,
  tags: string[],
  originalLink: string | null
}
