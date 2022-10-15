import ArticlesThreadSpace from '../pages/Articles/Thread/ArticlesThreadSpace';
import {AuthSpace} from "../components/Auth/AuthSpace";
import ArticleCreatingSpace from "../components/Article/Create/ArticleCreatingSpace";
import ArticleSpace from "../components/Article/One/ArticleSpace";
import SavedSpace from "../pages/Saved/SavedSpace";
import ProfileSpace from "../pages/Profile/ProfileSpace";

interface IPath {
  path: string,
  component: () => JSX.Element,
  authorized: boolean
}

export const paths = [
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
  }
]
