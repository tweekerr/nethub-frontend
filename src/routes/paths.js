import ArticleCreatingSpace from '../components/articleCreating/ArticleCreatingSpace';
import MainSpace from "../components/mainSpace/MainSpace";

export const publicPaths = [
  {
    path: '/createArt',
    Component: ArticleCreatingSpace
  },
  {
    path: '/',
    Component: MainSpace
  },
]