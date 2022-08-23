import MainSpace from '../components/mainSpace/MainSpace';
import ArticleCreatingSpace from '../components/ArticleCreating/ArticleCreatingSpace'

export const publicPaths = [
  {
    path: '/createArt',
    Component: ArticleCreatingSpace,
  },
  {
    path: '/',
    Component: MainSpace,
  },
  {
    path: '/login',
    Component: ArticleCreatingSpace,
  },
];
export const privatePaths = [
  {
    path: '/createArt',
    Component: ArticleCreatingSpace,
  },
  {
    path: '/',
    Component: MainSpace,
  },
];
