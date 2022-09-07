import React, {useState} from 'react';
import ArticleSettings from './ArticleSettings';
import Layout from "../Layout/Layout";
import CreateArticleForm from "./CreateArticleForm";
import IArticle, {IArticleFormErrors} from "../../types/IArticle";
import {arrayMinLength, isNotNullOrWhiteSpace, minLength, regexTest} from "../../utils/validators";
import useErrors from "../../hooks/useErrors";
import {urlRegex} from "../../utils/regex";
import useValidation from "../../hooks/useValidation";
import {useTranslation} from "react-i18next";

const ArticleCreatingSpace = () => {
  const [article, setArticle] = useState<IArticle>({
    title: '',
    subTitle: '',
    body: '',
    tags: [] as string[],
  } as IArticle)

  const {errors, setErrors} = useErrors<IArticleFormErrors>();
  const {validate} = useValidation();
  const {t} = useTranslation();

  const setArticleValue = (key: string) => (value: any) => {
    setArticle((prev) => {
      return {...prev, [key]: value}
    })
  }
  const updateArticle = (article: IArticle) => setArticle(article);

  const validateArticleForm = (): boolean => {

    const titleValid = validate(article.title, [isNotNullOrWhiteSpace, minLength(10)])
    setErrors('title', !titleValid)

    const subTitleValid = validate(article.subTitle, [isNotNullOrWhiteSpace])
    setErrors('subTitle', !subTitleValid)

    const bodyValid = validate(article.body, [isNotNullOrWhiteSpace, minLength(550)])
    setErrors('body', !bodyValid)

    let originalLinkValid = true
    if (article.originalLink && article.originalLink !== '')
      originalLinkValid = validate(article.originalLink, [regexTest(urlRegex)])
    setErrors('originalLink', !originalLinkValid)

    const tagsValid = validate(article.tags, [arrayMinLength(3)])
    setErrors('tags', !tagsValid)

    return titleValid && subTitleValid && bodyValid && originalLinkValid && tagsValid;
  }

  const createArticle = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log(article)
    if (!validateArticleForm()) {
      return;
    }
    return;
    //TODO: axios request to BACK
  };


  return (
    <Layout rightBar={
      <ArticleSettings
        article={article}
        setArticle={updateArticle}
        errors={errors}
        setErrors={setErrors}
        createArticle={createArticle}
      />
    }>
      <CreateArticleForm
        titleParams={t('article.create.mainSettings')}
        article={article}
        setArticleValue={setArticleValue}
        errors={errors}
      />
    </Layout>
  );
}
export default ArticleCreatingSpace;
