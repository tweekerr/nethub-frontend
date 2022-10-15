import React, {useEffect, useRef, useState} from 'react';
import ArticleSettings from './ArticleSettings';
import Layout from "../../Layout/Layout";
import CreateArticleForm from "./CreateArticleForm";
import ILocalization, {IArticleFormErrors} from "../../../types/ILocalization";
import {arrayMinLength, isNotNullOrWhiteSpace, minLength, regexTest} from "../../../utils/validators";
import {urlRegex} from "../../../utils/regex";
import {useTranslation} from "react-i18next";
import useValidator from "../../../hooks/useValidator";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";
import {ArticleStorage} from "../../../utils/localStorageProvider";
import {useParams} from "react-router-dom";
import {articlesApi} from "../../../api/userApi";
import useLoading from "../../../hooks/useLoading";

type CreateArticleFormRef = React.ElementRef<typeof CreateArticleForm>

const ArticleCreatingSpace = () => {
  const {t} = useTranslation();

  const titles = {
    center: <h2>{t('article.create.mainSettings')}</h2>,
    right: <h2>Налаштування</h2>
  }

  const defaultState = {
    title: ArticleStorage.getTitle() ?? '',
    description: ArticleStorage.getDescription() ?? '',
    html: ArticleStorage.getHtml() ?? '',
    tags: ArticleStorage.getTags() ? JSON.parse(ArticleStorage.getTags()!) : [] as string[],
  } as ILocalization;

  const {error, setError, startLoading, finishLoading} = useLoading();

  const [images, setImages] = useState<string[]>([]);
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      const loadImages = async () => {
        return await articlesApi.getArticleImages()
      };

      loadImages().then(response => {
        setImages(response)
      })
    }
  }, [])

  const [article, setArticle] = useState<ILocalization>(defaultState)

  const {subscribeValidator, unsubscribeValidator, validateAll, errors, setErrors} = useValidator<IArticleFormErrors>();
  const {enqueueError} = useCustomSnackbar();
  const createArticleFormRef = useRef<CreateArticleFormRef>(null);

  const setArticleValue = (key: string) => (value: any) => {
    setArticle((prev) => {
      return {...prev, [key]: value}
    })
  }

  const updateArticle = (article: ILocalization) => setArticle(article);

  async function validateArticleForm() {
    subscribeValidator({
      value: article.title,
      field: 'title',
      validators: [isNotNullOrWhiteSpace, minLength(10)],
      message: 'Мінімальна довжина заголовку - 10 символів'
    })
    subscribeValidator({value: article.description, field: 'description', validators: [isNotNullOrWhiteSpace]})
    subscribeValidator({value: article.html, field: 'html', validators: [isNotNullOrWhiteSpace, minLength(1)]})
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

    if (!await validateArticleForm()) return;

    startLoading();
    (async () => {
      const articleId = await createArticleFormRef
        .current?.getTinyRef()
        .current?.saveImages(null);

      await articlesApi.createLocalization(articleId!, 'ua', article)
    })().then(() => {
    })
      .catch((e) => {
        setError(true);
        enqueueError(e.message)
      })
      .finally(() => {
        finishLoading()
        if (!error.isError) {
          ArticleStorage.clearArticleData()
          setArticle(defaultState);
        }
        // console.log(article)
      })
  };


  return (
    <Layout
      titles={titles}
      rightBar={
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
        article={article}
        setArticleValue={setArticleValue}
        errors={errors}
        ref={createArticleFormRef}
      />
    </Layout>
  );
}
export default ArticleCreatingSpace;
