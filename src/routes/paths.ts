import MainSpace from '../components/mainSpace/MainSpace';
import ArticleCreatingSpace from '../components/ArticleCreating/ArticleCreatingSpace'
import {AuthSpace} from "../components/Auth/AuthSpace";

interface IPath {
  path: string,
  component: () => JSX.Element,
  authorized: boolean
}

export const paths: IPath[] = [
  {
    path: '/',
    component: MainSpace,
    authorized: false
  },
  {
    path: '/login',
    component: AuthSpace,
    authorized: false
  },
  {
    path: '/articles',
    component: ArticleCreatingSpace,
    authorized: true,
  }
]
