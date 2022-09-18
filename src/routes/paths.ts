import MainSpace from '../components/mainSpace/MainSpace';
import {AuthSpace} from "../components/Auth/AuthSpace";
import ArticleCreatingSpace from "../components/Article/Create/ArticleCreatingSpace";

interface IPath {
  path: string,
  component: () => JSX.Element,
  authorized: boolean
}

export const paths = [
  {
    path: '/',
    Component: MainSpace,
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
]
