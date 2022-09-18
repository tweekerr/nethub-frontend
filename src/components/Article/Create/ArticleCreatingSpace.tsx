import React, {FC, useEffect, useRef, useState} from 'react';
import ArticleSettings from './ArticleSettings';
import Layout from "../../Layout/Layout";
import CreateArticleForm from "./CreateArticleForm";
import IArticle, {IArticleFormErrors} from "../../../types/IArticle";
import {arrayMinLength, isNotNullOrWhiteSpace, minLength, regexTest} from "../../../utils/validators";
import {urlRegex} from "../../../utils/regex";
import {useTranslation} from "react-i18next";
import useValidator from "../../../hooks/useValidator";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";
import {ArticleStorage} from "../../../utils/localStorageProvider";
import {useParams} from "react-router-dom";
import {api} from "../../../api/api";

type CreateArticleFormRef = React.ElementRef<typeof CreateArticleForm>

const ArticleCreatingSpace = () => {
  const defaultState = {
    title: ArticleStorage.getTitle() ?? '',
    subTitle: ArticleStorage.getSubTitle() ?? '',
    body: ArticleStorage.getBody() ?? '',
    tags: ArticleStorage.getTags() ? JSON.parse(ArticleStorage.getTags()!) : [] as string[],
  } as IArticle;

  const [images, setImages] = useState<string[]>([]);
  const {id} = useParams();

  useEffect(() => {
    if (id){
      const loadImages = async () => {
        return await api.getArticleImages()
      };

      loadImages().then(response => {
        setImages(response)
      })
    }
  }, [])

  const [article, setArticle] = useState<IArticle>(defaultState)

  const {subscribeValidator, unsubscribeValidator, validateAll, errors, setErrors} = useValidator<IArticleFormErrors>();
  const {t} = useTranslation();
  const {enqueueError} = useCustomSnackbar();
  const createArticleFormRef = useRef<CreateArticleFormRef>(null);

  const setArticleValue = (key: string) => (value: any) => {
    setArticle((prev) => {
      return {...prev, [key]: value}
    })
  }

  const updateArticle = (article: IArticle) => setArticle(article);

  async function validateArticleForm() {
    subscribeValidator({
      value: article.title,
      field: 'title',
      validators: [isNotNullOrWhiteSpace, minLength(10)],
      message: 'Мінімальна довжина заголовку - 10 символів'
    })
    subscribeValidator({value: article.subTitle, field: 'subTitle', validators: [isNotNullOrWhiteSpace]})
    subscribeValidator({value: article.body, field: 'body', validators: [isNotNullOrWhiteSpace, minLength(1)]})
    subscribeValidator({
      value: article.tags,
      field: 'tags',
      validators: [arrayMinLength(3)],
      message: 'Мінімальна кількість тегів - 3'
    })

    if (article.originalLink && article.originalLink !== '')
      subscribeValidator({
        value: article.originalLink,
        field: 'originalLink',
        validators: [regexTest(urlRegex)],
        message: 'Не вірне посилання'
      })
    else
      unsubscribeValidator('originalLink');

    const {isSuccess, errors} = await validateAll();
    if (!isSuccess) errors.forEach(enqueueError)

    return isSuccess;
  }

  const setTagsError = (flag: boolean) => {
    setErrors(prev => {
      return {...prev, tags: flag}
    })
  }

  const createArticle = async () => {

    if (!await validateArticleForm()) {
      return;
    }

    await createArticleFormRef
      .current?.getTinyRef()
      .current?.saveImages(null);

    console.log(article)
    //TODO: axios request to BACK

    ArticleStorage.clearArticleData()
    setArticle(defaultState);
  };


  return (
    <Layout rightBar={
      <ArticleSettings
        article={article}
        setArticle={updateArticle}
        errors={errors}
        setError={setTagsError}
        createArticle={createArticle}
        images={images}
      />
    }>
      <CreateArticleForm
        titleParams={t('article.create.mainSettings')}
        article={article}
        setArticleValue={setArticleValue}
        errors={errors}
        ref={createArticleFormRef}
      />
    </Layout>
  );
}
export default ArticleCreatingSpace;
