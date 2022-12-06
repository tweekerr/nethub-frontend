import React, {ReactNode, useState} from 'react';
import {useParams} from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import ArticlesThread from "../../../components/Article/Thread/ArticlesThread";
import {useQuery, useQueryClient} from "react-query";
import IExtendedArticle from "../../../types/IExtendedArticle";
import {articlesApi, userApi} from "../../../api/api";
import ArticlesThreadSpaceSkeleton from "../Thread/ArticlesThreadSpaceSkeleton";
import Currency from "../../../components/Currency/Currency";
import {Skeleton, Text} from "@chakra-ui/react";
import ArticlesThreadTitle from "../../../components/Article/Thread/ArticlesThreadTitle";
import {UkrainianLanguage} from "../../../utils/constants";
import IUserInfoResponse from "../../../types/api/User/IUserInfoResponse";
import {LFC} from "../../../components/Layout/LFC";
import create from 'zustand';
import {proxy} from "valtio";


interface ContributorArticlesSpaceStore {
  title: JSX.Element | string,
  articlesLanguage: string,
  articlesLanguageSetter: (value: string) => void,
  languages: { title: string, value: string }[],
}

const ContributorArticlesSpace: LFC<ContributorArticlesSpaceStore> = () => {
  const {contributorId} = useParams();
  const queryClient = useQueryClient();
  const languages = [{title: 'UA', value: 'ua'}, {title: 'EN', value: 'en'}]
  ContributorArticlesSpace.store.languages = languages;
  const [articlesLanguage, setArticlesLanguage] = useState<string>(localStorage.getItem('contributorArticlesLanguage') ?? UkrainianLanguage);
  ContributorArticlesSpace.store.articlesLanguage = articlesLanguage;

  const handleSetArticlesLanguage = (value: string) => {
    localStorage.setItem('contributorArticlesLanguage', value);
    setArticlesLanguage(value);
  }
  ContributorArticlesSpace.store.articlesLanguageSetter = handleSetArticlesLanguage;


  const contributorAccessor = useQuery<IUserInfoResponse>(['contributor', contributorId],
    async () => (await userApi.getUsersInfo([contributorId!]))[0])
  const contributorArticlesAccessor = useQuery<IExtendedArticle[], Error>(['contributor', 'articles', contributorId, articlesLanguage],
    () => articlesApi.getUserArticles(contributorId!, articlesLanguage), {enabled: !!contributorAccessor.data})

  const handleSetArticles = (newArticles: IExtendedArticle[]) => {
    queryClient.setQueryData(['contributor', 'articles', contributorId, articlesLanguage], newArticles);
  }


  const title = contributorAccessor.data?.userName
    ? `Статті, написані ${contributorAccessor.data.userName}`
    : <Skeleton height={'auto'}>height</Skeleton>
  ContributorArticlesSpace.store.title = title;

  return (
    contributorArticlesAccessor.isLoading || contributorArticlesAccessor.isIdle
      ? <ArticlesThreadSpaceSkeleton/>
      : <ArticlesThread articles={contributorArticlesAccessor.data!} setArticles={handleSetArticles} byUser={true}/>);

}

ContributorArticlesSpace.title = () => <ArticlesThreadTitle
  title={ContributorArticlesSpace.store.title}
  articlesLanguage={ContributorArticlesSpace.store.articlesLanguage}
  setArticlesLanguage={ContributorArticlesSpace.store.articlesLanguageSetter}
  options={ContributorArticlesSpace.store.languages}
/>
ContributorArticlesSpace.config = {error: {show: true}}


ContributorArticlesSpace.Right = () => <Currency/>;
ContributorArticlesSpace.Right.config = {
  title: <Text as={'h2'}>Курс</Text>,
  error: {show: true, customMessage: 'Помилка'}
}

ContributorArticlesSpace.store = proxy({
  title: <></>,
  articlesLanguage: '',
  articlesLanguageSetter: () => {
  },
  languages: [],
});

export default ContributorArticlesSpace;
