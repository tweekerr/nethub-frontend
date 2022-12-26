import ArticlesThreadSpace from '../pages/Articles/Thread/ArticlesThreadSpace';
import {Page} from "../components/Layout/Layout";
import ArticleSpace from "../pages/Articles/One/ArticleSpace";
import ArticleCreatingSpace from '../pages/Articles/Create/ArticleCreatingSpace';
import SavedSpace from "../pages/Saved/SavedSpace";
import ProfileSpace from "../pages/Profile/ProfileSpace";
import ContributorArticlesSpace from "../pages/Articles/Contributor/ContributorArticlesSpace";
import TestSpace from "../pages/TestSpace";
import AuthSpace from "../pages/Auth/AuthSpace";
import TeamSpace from "../pages/Team/TeamSpace";

interface IPath {
  path: string,
  Component: Page,
  authorized: boolean,
}

export const paths: IPath[] = [
  {
    path: '/',
    Component: ArticlesThreadSpace,
    authorized: false,
  },
  {
    path: '/login',
    Component: AuthSpace,
    authorized: false
  },
  {
    path: '/articles/add',
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
    path: '/articles/by/:contributorId',
    Component: ContributorArticlesSpace,
    authorized: false
  },
  {
    path: '/team',
    Component: TeamSpace,
    authorized: false
  },
  {
    path: '/test',
    Component: TestSpace,
    authorized: false
  }
]
