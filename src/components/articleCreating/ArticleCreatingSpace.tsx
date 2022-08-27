import React, {useEffect, useState} from 'react';
import ArticleSettings from './ArticleSettings';
import Layout from "../Layout/Layout";
import CreateArticleForm from "./CreateArticleForm";
import IArticle from "../../types/IArticle";

const ArticleCreatingSpace = () => {
  const [article, setArticle] = useState<IArticle>({body: 'test', tags: [] as string[]} as IArticle)

  const setArticleValue = (key: string) => (value: any) => {
    setArticle((prev) => {
      return {...prev, [key]: value}
    })
  }

  const updateArticle = (article: IArticle) => setArticle(article);

  return (
    <Layout rightBar={
      <ArticleSettings
        article={article}
        setArticle={updateArticle}/>
    }>
      <CreateArticleForm
        titleParams={"Загальні налаштування"}
        article={article}
        setArticleValue={setArticleValue}/>
    </Layout>
  );
};

export default ArticleCreatingSpace;
