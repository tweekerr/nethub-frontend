import ArticlesThreadSpace from '../pages/Articles/Thread/ArticlesThreadSpace';
import {AuthSpace} from "../pages/Auth/AuthSpace";
import ArticleCreatingSpace from "../pages/Articles/Create/ArticleCreatingSpace";
import ArticleSpace from "../pages/Articles/One/ArticleSpace";
import SavedSpace from "../pages/Saved/SavedSpace";
import ProfileSpace from "../pages/Profile/ProfileSpace";
import ContributorArticlesSpace from "../pages/Articles/Contributor/ContributorArticlesSpace";

interface IPath {
  path: string,
  Component: () => JSX.Element,
  authorized: boolean
}

export const paths: IPath[] = [
  {
    path: '/',
    Component: ArticlesThreadSpace,
    authorized: false
  },
  {
    path: '/login',
    Component: AuthSpace,
    authorized: false
  },
  {
    path: '/articles',
    Component: ArticleCreatingSpace,
    authorized: true,
  },
  {
    path: '/articles/:id/add-localization',
    Component: ArticleCreatingSpace,
    authorized: true
  },
  {
    path: '/article/:id/:code',
    Component: ArticleSpace,
    authorized: false
  },
  {
    path: '/saved',
    Component: SavedSpace,
    authorized: true
  },
  {
    path: '/profile',
    Component: ProfileSpace,
    authorized: true
  },
  {
    path: '/profile/:id',
    Component: ProfileSpace,
    authorized: false
  },
  {
    path: 'articles/by/:contributorId',
    Component: ContributorArticlesSpace,
    authorized: false
  }
]
