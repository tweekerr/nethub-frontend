import React, {useRef, useState} from 'react';
import ArticleSettings from '../../../components/Article/Create/ArticleSettings';
import Layout from "../../../components/Layout/Layout";
import CreateArticleForm from "../../../components/Article/Create/CreateArticleForm";
import ILocalization, {IArticleFormErrors} from "../../../types/ILocalization";
import {regexTest} from "../../../utils/validators";
import {urlRegex} from "../../../utils/regex";
import {useTranslation} from "react-i18next";
import useValidator from "../../../hooks/useValidator";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";
import {ArticleStorage} from "../../../utils/localStorageProvider";
import {useNavigate, useParams} from "react-router-dom";
import {articlesApi} from "../../../api/api";
import {useMutation, useQuery} from 'react-query';
import {getArticleValidators} from "./ArticleCreatingSpace.functions";

type CreateArticleFormRef = React.ElementRef<typeof CreateArticleForm>

const ArticleCreatingSpace = () => {
  const {t} = useTranslation();

  const defaultState = () => {
    return {
      title: ArticleStorage.getTitle() ?? '',
      description: ArticleStorage.getDescription() ?? '',
      html: ArticleStorage.getHtml() ?? '',
      // tags: ArticleStorage.getTags() ? JSON.parse(ArticleStorage.getTags()!) : [] as string[],
      tags: ArticleStorage.getTags() ? JSON.parse(ArticleStorage.getTags()!) : ['test1', 'test2', 'test3'],
    } as ILocalization
  };

  const {id} = useParams();
  const images = useQuery('articleImages', () => articlesApi.getArticleImages(), {enabled: !!id});
  const createMutation = useMutation('createArticle', () => createArticle());
  const navigate = useNavigate();

  const [article, setArticle] = useState<ILocalization>(defaultState)

  const {subscribeValidator, unsubscribeValidator, validateAll, errors, setErrors} = useValidator<IArticleFormErrors>();
  const {enqueueSuccess, enqueueError, enqueueSnackBar} = useCustomSnackbar('info');
  const articleCreationRef = useRef<CreateArticleFormRef>(null);

  const setArticleValue = (key: string) => (value: any) => {
    setArticle((prev) => {
      return {...prev, [key]: value}
    })
  }

  const setTagsError = (flag: boolean) => {
    setErrors(prev => {
      return {...prev, tags: flag}
    })
  }

  async function validateArticleForm() {
    getArticleValidators(article).forEach(v => subscribeValidator(v))

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

  const createArticle = async () => {

    if (!await validateArticleForm()) return;

    enqueueSnackBar('Стаття зберігається')

    let articleId;

    try {
      articleId = await articleCreationRef
        .current?.getTinyRef()
        .current?.saveImages(article);

      await articlesApi.createLocalization(articleId!, 'ua', article)
      ArticleStorage.clearArticleData();
      setArticle(defaultState);
    } catch (e: any) {
      enqueueError('Помилка збереження статті');
      return;
    }
    enqueueSuccess('Збережено!')

    navigate('/article/' + articleId + '/ua');
  };

  const rightBar = {
    title: <h2>Налаштування</h2>,
    children: <ArticleSettings
      article={article}
      setArticle={setArticle}
      errors={errors}
      setError={setTagsError}
      createArticle={createMutation.mutateAsync}
      images={images.data ?? []}
    />
  }

  return (
    <Layout
      title={<h2>{t('article.create.mainSettings')}</h2>}
      rightBar={rightBar}
    >
      <CreateArticleForm
        article={article}
        setArticleValue={setArticleValue}
        setArticle={setArticle}
        errors={errors}
        ref={articleCreationRef}
      />
    </Layout>
  );
}
export default ArticleCreatingSpace;
