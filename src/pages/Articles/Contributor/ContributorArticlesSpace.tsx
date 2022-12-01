import React, {useState} from 'react';
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


const ContributorArticlesSpace = () => {
  const {contributorId} = useParams();
  const queryClient = useQueryClient();
  const languages = [{title: 'UA', value: 'ua'}, {title: 'EN', value: 'en'}]
  const [articlesLanguage, setArticlesLanguage] = useState<string>(localStorage.getItem('contributorArticlesLanguage') ?? UkrainianLanguage);
  const handleSetArticlesLanguage = (value: string) => {
    localStorage.setItem('contributorArticlesLanguage', value);
    setArticlesLanguage(value);
  }

  const contributorAccessor = useQuery<IUserInfoResponse>(['contributor', contributorId],
    async () => (await userApi.getUsersInfo([contributorId!]))[0])
  const contributorArticlesAccessor = useQuery<IExtendedArticle[], Error>(['contributor', 'articles', contributorId, articlesLanguage],
    () => articlesApi.getUserArticles(contributorId!, articlesLanguage), {enabled: !!contributorAccessor.data})

  const handleSetArticles = (newArticles: IExtendedArticle[]) => {
    queryClient.setQueryData(['contributor', 'articles', contributorId, articlesLanguage], newArticles);
  }

  const rightBar = {
    children: <Currency/>,
    title: <Text as={'h2'}>Курс</Text>,
    error: {show: true, customMessage: 'Помилка'}
  };

  const title = contributorAccessor.data?.userName
    ? `Статті, написані ${contributorAccessor.data.userName}`
    : <Skeleton height={'auto'}>height</Skeleton>

  return (
    <Layout
      title={
        <ArticlesThreadTitle
          title={title}
          articlesLanguage={articlesLanguage}
          setArticlesLanguage={handleSetArticlesLanguage}
          options={languages}
        />}
      error={{show: true}}
      rightBar={rightBar}
    >
      {
        contributorArticlesAccessor.isLoading || contributorArticlesAccessor.isIdle
          ? <ArticlesThreadSpaceSkeleton/>
          : <ArticlesThread articles={contributorArticlesAccessor.data!} setArticles={handleSetArticles} byUser={true}/>
      }
    </Layout>
  );
};

export default ContributorArticlesSpace;
