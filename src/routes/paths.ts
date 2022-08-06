import { AuthSpace } from 'components/Auth/AuthSpace';
import ArticleCreatingSpace from '../components/articleCreating/ArticleCreatingSpace';
import MainSpace from '../components/mainSpace/MainSpace';

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
    Component: AuthSpace,
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
