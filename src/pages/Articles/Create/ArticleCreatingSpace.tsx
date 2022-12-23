import React, {useRef} from 'react';
import ArticleSettings from '../../../components/Article/Create/ArticleSettings';
import Layout, {Page} from "../../../components/Layout/Layout";
import CreateArticleForm from "../../../components/Article/Create/CreateArticleForm";
import {IArticleFormErrors} from "../../../types/ILocalization";
import {regexTest} from "../../../utils/validators";
import {urlRegex} from "../../../utils/regex";
import {useTranslation} from "react-i18next";
import useValidator from "../../../hooks/useValidator";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";
import {ArticleStorage} from "../../../utils/localStorageProvider";
import {useNavigate} from "react-router-dom";
import {articlesApi} from "../../../api/api";
import {useMutation} from 'react-query';
import {getArticleValidators} from "./ArticleCreatingSpace.functions";
import ArticleCreatingSpaceProvider, {useArticleCreatingContext} from "./ArticleCreatingSpace.Provider";

type CreateArticleFormRef = React.ElementRef<typeof CreateArticleForm>

const ArticleCreatingSpace: Page = () => {
  const {t} = useTranslation();

  const {article, setArticle, defaultArticleState} = useArticleCreatingContext();

  const createMutation = useMutation('createArticle', () => createArticle());
  const navigate = useNavigate();

  const {subscribeValidator, unsubscribeValidator, validateAll, errors, setErrors} = useValidator<IArticleFormErrors>();
  const {enqueueSuccess, enqueueError, enqueueSnackBar} = useCustomSnackbar('info');
  const articleCreationRef = useRef<CreateArticleFormRef>(null);


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
      setArticle(defaultArticleState);
    } catch (e: any) {
      enqueueError('Помилка збереження статті');
      return;
    }
    enqueueSuccess('Збережено!')

    navigate('/article/' + articleId + '/ua');
  };

  const titles = {
    // Center: <h2>{t('article.create.mainSettings')}</h2>,
    Center: <h2>Створення статті</h2>,
    Right: <h2>Налаштування</h2>
  };

  return (
    <Layout Titles={titles}>
      <CreateArticleForm
        errors={errors}
        ref={articleCreationRef}
      />
      <ArticleSettings
        errors={errors}
        setError={setTagsError}
        createArticle={createMutation.mutateAsync}
      />
    </Layout>
  );
}

ArticleCreatingSpace.Provider = ArticleCreatingSpaceProvider;

export default ArticleCreatingSpace;
